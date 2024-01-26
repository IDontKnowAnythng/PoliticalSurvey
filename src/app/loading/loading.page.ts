import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { UploadService } from '../upload.service';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(public router:Router, public as:UploadService,
    public ac: AlertController) { }

  ngOnInit() {
    this.getAdmin1();
  }
  toSurvey(){
    this.router.navigate(['/main'])
  }
  admin: Admin = new Admin();
  submitted = false;
  admin1:any;
  map: any;
  title:string="Login";

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
    }
  
  }
  showForm=false
  post(){
    if(this.admin.username && this.admin.password){
      for(let admin of this.admin1){
        if(this.admin.username==admin.username && this.admin.password==admin.password){
          this.showForm=true;
          console.log(this.admin.username)
          console.log('true')
          this.title="Admin";

        }
      }
    }
   
  }
  getAdmin1() {
    this.as.getAdmin().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(admin=> {
      this.admin1 = admin ;
    });
  }
  create(){
    this.title="Create"
  }
  modify(){
    this.title="Modify"
  }
  delet(){
    this.title="Delete"
  }

}
