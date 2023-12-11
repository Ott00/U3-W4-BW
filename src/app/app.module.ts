import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DetailsComponent,
    ProfileComponent,
    BackOfficeComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
