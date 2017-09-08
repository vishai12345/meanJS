import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ValidatorService } from './Service/validator.service';
import { LoginService } from './Service/login.service';
import { LogoutService } from './Service/logout.service';
import { RegisterService } from './Service/register.service';
import { GetAllUserService } from './Service/get-all-user.service';
import { VerifyUserService } from './Service/verify-user.service';
import { ChatRoomService } from './Service/chat-room.service';
import { BookingService } from './Service/booking.service';
import { EditProfileServiceService } from './Service/edit-profile-service.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { GetUserComponent } from './get-user/get-user.component';
import { VerifyComponent } from './verify/verify.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGaurd } from './guard/route.guard';
import { VerifyGaurd } from './guard/verify.gaurd';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import {  MaterialModule  } from '@angular/material';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdIconModule} from '@angular/material';
import {MdTableModule} from '@angular/material';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { FotterComponentComponent } from './fotter-component/fotter-component.component';
import { ViewBookingDialogComponent } from './view-booking-dialog/view-booking-dialog.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { EditUserComponentComponent } from './edit-user-component/edit-user-component.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {PushNotificationsModule} from 'angular2-notifications';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBkp0DzK0k9nV0FKsHaGi4Cq456SZ11UXo",
  authDomain: "uncle-fitter-451a9.firebaseapp.com",
  databaseURL: "https://uncle-fitter-451a9.firebaseio.com",
  projectId: "uncle-fitter-451a9",
  storageBucket: "uncle-fitter-451a9.appspot.com",
  messagingSenderId: "642122332659"
};
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [RouteGaurd]},
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'getAll', component: GetUserComponent,canActivate: [RouteGaurd] },
  { path: 'verify', component: VerifyComponent ,canActivate: [VerifyGaurd]},
  { path: 'edit-profile', component: EditProfileComponent ,canActivate: [RouteGaurd] },
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [RouteGaurd]  },
  { path: 'dashboard', component: DashboardComponent,canActivate: [RouteGaurd]  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    GetUserComponent,
    VerifyComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ModalDialogComponent,
    FotterComponentComponent,
    ViewBookingDialogComponent,
    FileSelectDirective,
    EditUserComponentComponent
  ],
  entryComponents: [
    ModalDialogComponent,
    ViewBookingDialogComponent,
    EditUserComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdIconModule,
    MdTableModule,
    ToasterModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    PushNotificationsModule
  ],
  providers: [
    ValidatorService,
    LoginService,
    LogoutService,
    RegisterService,
    GetAllUserService,
    VerifyUserService,
    EditProfileServiceService,
    BookingService,
    RouteGaurd,
    VerifyGaurd,
    ChatRoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
