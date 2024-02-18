import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { angularMaterialModule } from 'src/angular-material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './services/registration.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    angularMaterialModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  exports: [
    LoginComponent,TranslateModule
  ],
  providers: [RegistrationService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
