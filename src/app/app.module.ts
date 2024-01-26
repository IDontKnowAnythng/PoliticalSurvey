import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import  firebaseConfig from './firebase'
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';







@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),     IonicStorageModule.forRoot(),
    AppRoutingModule,AngularFireDatabaseModule,AngularFireStorageModule,HttpClientModule,
    
    AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,Network,
    SplashScreen,Geolocation,HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
