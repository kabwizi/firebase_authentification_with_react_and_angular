import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { firebaseConfig } from '../firebase';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreviewComponent } from './preview/preview.component';
import { ServerRequestService } from './services/server-request.service';
import { FormatJsonPostPipes } from './pipes/format-json-post.pipe';
import { PostPopUpComponent } from './post-pop-up/post-pop-up.component';
import { AuthTokenInterceptor } from './interceptors/auth-token.interseptors';
import { TooltipDirective } from './directives/tooltip.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    SigninComponent,
    PreviewComponent,
    FormatJsonPostPipes,
    PostPopUpComponent,
    TooltipDirective,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    ServerRequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
