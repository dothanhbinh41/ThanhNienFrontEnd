import { CoreModule, ListService } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { QuestionComponent } from './question/question.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { ResultsComponent } from './results/results.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StartComponent } from './starts/start.component';
import {MatTabsModule} from '@angular/material/tabs'
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    NgxsModule.forRoot(),
    ThemeBasicModule.forRoot(),
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule
  ],
  declarations: [AppComponent, QuestionComponent,StartComponent, LoginComponent, ResultsComponent, LeaderboardComponent],
  providers: [APP_ROUTE_PROVIDER,ListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
