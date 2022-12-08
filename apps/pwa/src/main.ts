import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  import('parse').then(parse => {
    window.Parse = (parse as any).default;
    (Parse as unknown & { serverURL: string }).serverURL = environment.parse.serverUrl;
    (Parse as unknown & { liveQueryServerURL: string }).liveQueryServerURL = environment.parse.liveQueryUrl;
    Parse.initialize(environment.parse.appId, environment.parse.javascriptKey);
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
});
