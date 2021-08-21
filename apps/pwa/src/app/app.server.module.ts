import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// Tell Ionic components how to render on the server
import { IonicServerModule } from '@ionic/angular-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStoragePolyfill } from './+utils/local-storage.polyfill';
const LOCAL_STORAGE = 'LOCAL_STORAGE';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'mbat' }),
    AppModule,
    NoopAnimationsModule,
    ServerModule,
    IonicServerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    // replaces NGXS storage engine on server
    // { provide: STORAGE_ENGINE, useClass: LocalStoragePolyfill },

    // you can also create a token for yourself
    { provide: LOCAL_STORAGE, useClass: LocalStoragePolyfill },
  ],
})
export class AppServerModule {
  constructor() {
    import('parse/node').then(parse => {
      global.Parse = (parse as any).default;
      (Parse as unknown & { serverURL: string }).serverURL = environment.parse.serverUrl;
      (Parse as unknown & { liveQueryServerURL: string }).liveQueryServerURL = environment.parse.liveQueryUrl;
      Parse.initialize(environment.parse.appId);
    });
  }
}
