import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Data } from './data';
import { Admin } from './admin';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private dPath = '/data';
  private aPath = '/admin';

  dataRef: AngularFireList<Data>=null;
  adminRef: AngularFireList<Admin>=null;



  constructor(private afd: AngularFireDatabase) {
    this.dataRef= afd.list(this.dPath);
    this.adminRef= afd.list(this.aPath);


   }
   createData(data: Data): void {
    this.dataRef.push(data);
    console.log('work')
  }
  getData(): AngularFireList<Data>{
    return this.dataRef;
  }
  createAdmin(admin: Admin): void {
    this.adminRef.push(admin);
    console.log('work')
  }
  getAdmin(): AngularFireList<Admin>{
    return this.adminRef;
  }
  
}
