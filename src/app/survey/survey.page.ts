import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Data } from '../data';
import { UploadService } from '../upload.service'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'
import { StorageService,Item } from '../storage.service';
import { Network } from '@ionic-native/network/ngx';
import { map } from 'rxjs/operators';
import { Assembly } from '../assembly'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';









declare var google;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  data1:any;
  map: any;
  data: Data = new Data();

  items: Item[]=[];
  newItem: Item =<Item>{};
  public assembly=[]


  constructor( public toast:ToastController,
    public router: Router,
    private geolocation: Geolocation,
    public as:UploadService,
    public storageService: StorageService,
    public platform: Platform,
    private network: Network,
    public http:HttpClient,
    public mc:ModalController


 
    ) { }
    public time1=1
  ngOnInit() {
    this.loadItems();
    this.getData1();
    this.getLoction();
    this.getAssembly()
    .subscribe(data=>this.assembly=data);


  }
  async presentModal(){
    const modal = await this.mc.create({
      component: ModalComponent ,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }
  url:string="/assets/data/assembly.json"
  getAssembly(): Observable<Assembly[]>{
    return this.http.get<Assembly[]>(this.url);
  }
  longitude:number;
  latitude:number;
  datetime: any;
  showsubmit=false
  showSpinner=true
  getData1() {
    this.as.getData().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(data=> {
      this.data1 = data ;
      this.showSpinner=false;
    });
  }
 date:any
  getLoction(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.longitude=resp.coords.longitude;
      this.data.longitude=this.longitude
      this.latitude=resp.coords.latitude;
      this.data.latitude=this.latitude;
      this.date=Date.now();
      this.data.date=this.date;
      console.log(this.data.longitude);
      console.log(this.data.latitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
       //data.coords.latitude
      //data.coords.longitude
     });


  }

  toAdmin(){
    this.router.navigate(['/main'])
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
  public randomId
  public key=[]
  showReset=false
  hideSubmit=true
  onLocal=false
  async onSubmit(){
    this.getLoction();
   
    if(this.data.latitude !=null && this.data.longitude !=null){
      this.submitted = true;
      this.save();
      const toast = await this.toast.create({
        message: 'uploaded',
        duration: 2000,
        cssClass:'toast-bg',
        color:'primary'
      });
   
      toast.present();
      this.showReset=true
      this.hideSubmit=false

 

    
    }
    else{
      this.randomId=  Math.random().toString(36).substr(2, 9);
      this.newItem.name=this.data.Name;
      this.newItem.date= Date.now();
      this.addItem();
  
      this.storageService.setObject(this.randomId,this.data);
      const toast = await this.toast.create({
        message: 'stored in local storage',
        duration: 3000,
        cssClass:'toast-bg',
        color:'danger'
      });
   
      toast.present();
      this.showReset=true
      this.hideSubmit=false

      
    }
   


  
  }
  reset(){
    location.reload();
  }
  toUpload:any;


  getKey(){
    let randomId=  Math.random().toString(36).substr(2, 9);
    console.log(randomId);
  }
  addItem(){
    this.newItem.id =Date.now();
    this.newItem.uid =this.randomId

    this.storageService.addItem(this.newItem).then(item=>{
      this.newItem=<Item>{};
      this.loadItems();
    });
  }
  loadItems(){
    this.storageService.getItems().then(items=>{
      this.items=items;
    })
  }

  public type='upload'
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  showUpload=false

  showbutton(){
    this.getLoction();
    this.showUpload=true; 
  }
  toCloud(){
    this.loadItems();
    for(let i of this.items){
      this.storageService.get(i.uid).then(result => {
        if (result != null) {
          console.log(i);

        this.toUpload=JSON.parse(result);
        this.toUpload.latitude=this.latitude;
        this.toUpload.longitude=this.longitude;
        this.toUpload.date=i.date;
        this.toUpload.uid=i.uid;
        console.log(this.toUpload.longitude)
        console.log(this.toUpload);
        if(this.toUpload.latitude!=null && this.toUpload.longitude!=null){
          this.as.createData(this.toUpload);
          this.showToast('Complete');
          this.deletelocal();
        }
        else{
          console.log('not uploading')
        }
       
      }
        }).catch(e => {
        console.log('error: ', e);
        this.showToast('No Internet or Disabled GPS');
        });
    }
  }


  async showToast(mssg){
    const toast = await this.toast.create({
      message:mssg,
      duration:3000
    });
    toast.present();
  }


  deletelocal(){
    this.loadItems();
    for(let i of this.items){
      for(let d of this.data1){
        if(d.uid==i.uid){
          this.storageService.remove(i.uid);
          this.storageService.deleteItems(i.id);
          this.loadItems();
        }
      }
    }
   
  }
  checkCurrentLesson1=false
  la:any
  lo:any
  enableSubmit(){
    this.getLoction();
     this.la =this.latitude; this.lo=this.longitude;
    this.checkCurrentLesson1=true;
  }
  showAssembly(){
   console.log(this.data.District,this.data.Assembly)

  }
  


}
