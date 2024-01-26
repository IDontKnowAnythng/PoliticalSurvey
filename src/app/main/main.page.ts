import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Data } from '../data';
import { UploadService } from '../upload.service'
import { ToastController } from '@ionic/angular';
import { NavController,Platform } from '@ionic/angular';





@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  data: Data = new Data();
  constructor( public toast:ToastController,    public router: Router,
    private geolocation: Geolocation,public as:UploadService,public navCtrl: NavController) { }

  ngOnInit() {
  }
  longitude:any;
  latitude:any;
  datetime: any;
  showsubmit=false

  getLoction(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.data.latitude=resp.coords.latitude
      this.data.longitude=resp.coords.longitude
  
      console.log(this.longitude);
      console.log(this.latitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
       //data.coords.latitude
      //data.coords.longitude
     });
     this.showsubmit=true

  }

  submitted = false;
  newNews(): void {
    this.submitted = false;
    this.data = new Data();

  }
  save(){
    this.as.createData(this.data);
    this.data = new Data();
  }
  async onSubmit(){

   
    console.log(this.data.latitude,this.data.longitude);
    if(this.data.latitude!=null && this.data.longitude!=null){
      this.submitted = true;
      this.save();
      const toast = await this.toast.create({
        message: 'uploaded',
        duration: 2000,
        cssClass:'toast-bg',
        color:'primary'
      });
   
      toast.present();
    
    }
   

    this.showsubmit=false

  
  }

  toLoading(){
    console.log('cannot')
    location.reload();
    
  }

}
