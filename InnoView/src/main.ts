import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0R3xbf1x0ZFRMZFpbRXRPIiBoS35RckVnWHpfc3BTR2JbWER0");
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
