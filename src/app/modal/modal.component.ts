import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Admin } from '../admin';
import { UploadService } from '../upload.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'





@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(
    public modalCtrl:ModalController,
    public as:UploadService,
    public ac: AlertController,
    public rout: Router


  ) { }

  ngOnInit() {}
  admin: Admin = new Admin();
  submitted = false;
  newAdmin(): void {
    this.submitted = false;
    this.admin = new Admin();
  }

  save(){
    this.as.createAdmin(this.admin);
    this.admin = new Admin();
  }
  public disable:boolean;
  onSubmit(){
    if(this.admin.username && this.admin.password)
    {
      console.log("fine")
      this.submitted = true;
      this.save();
      this.ShowAlert("Done","succesfully uploaded your news!!!")
    }
  
  }
  async ShowAlert(header: string,message: string){
    const alert = await this.ac.create({
      header,
      message,
      buttons: ["OK"] 
  })
  await alert.present()
  }
  toLoading(){
    this.rout.navigate(['/loading'])
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    
  }
}
