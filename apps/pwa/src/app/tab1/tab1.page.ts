import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import * as Parse from 'parse';
import { DbService } from '../common/services/db.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import neo4j, { Driver, Session } from 'neo4j-driver';
import { Track } from 'spotify-api.js';

type MbatTrack = Pick<Track, 'id' | 'uri' | 'name' | 'duration' | 'popularity' | 'previewURL' | 'explicit'> & {
  image: string;
  artists: string;
  genres: string;
} & { low: string; high: string };

@UntilDestroy({
  arrayName: 'subcriptions',
})
@Component({
  selector: 'mbat-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnDestroy {
  #accessToken: string;
  isImportRunning: boolean;
  loading: boolean;
  isLibraryImported = false;

  tracks: Array<MbatTrack> = [];

  session: Session;
  driver: Driver;

  get username(): string {
    return Parse.User.current().getUsername();
  }

  constructor(public db: DbService, private cdr: ChangeDetectorRef) {
    this.loading = true;
    const user = Parse.User.current();

    user
      .fetch()
      .then(async (user) => {
        this.loading = false;
        this.#accessToken = user.get('spotifyToken');
        this.isLibraryImported = !!user.get('lastLibraryImport');
        console.log(user.get('lastLibraryImport'));
        this.cdr.markForCheck();

        const job = await this.db.importQuery.first();
        if (job) {
          console.log('job', job);
          this.isImportRunning = true;
        }

        const group = await user.relation('groups').query().first();
        if (!this.isImportRunning) {
          this.startNeo4jSubscription(group.id);
        }
        // this.db.importQuery.subscribe().then((subscription) => {
        //   console.log(this['subcriptions']);
        //   this['subcriptions'].push(subscription);
        //
        //   subscription.on('delete', () => {
        //     this.isImportRunning = false;
        //     this.cdr.markForCheck();
        //   });
        // });
      })
      .catch(() => {
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  startNeo4jSubscription(groupId) {
    console.log('fetch tracks for groupId', groupId);
    this.driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('', ''));
    this.session = this.driver.session();
    this.session
      .run(
        `
MATCH (g:Group {id: '${groupId}'})-[:LikesTrack]-(t)
RETURN COUNT(t) as c, t
ORDER BY c DESC
LIMIT 20
      `,
        {}
      )
      .subscribe({
        onKeys: (keys) => {
          console.log(keys);
        },
        onNext: (record) => {
          this.tracks = [...this.tracks, { ...record.get('t').properties, ...record.get('c') }];
          this.cdr.markForCheck();
        },
        onCompleted: () => {
          console.log('completed', this.tracks);
          this.session.close(); // returns a Promise
        },
        onError: (error) => {
          console.log(error);
        },
      });
  }

  async startLibraryImport() {
    this.isImportRunning = true;
    const authData = Parse.User.current().get('authData');
    const accessToken = authData.spotify.access_token;
    if (!accessToken) {
      return;
    }
    try {
      await this.db.importLib(accessToken);
    } catch (err) {
      await Parse.User.logOut();
    }
  }

  fetchNewPage(e) {
    console.log('fetch new page', e);
  }

  trackById(index: number, track: MbatTrack) {
    return track.id;
  }

  async ngOnDestroy() {
    await this.driver.close();
  }
}
