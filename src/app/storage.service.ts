import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id:number,
  uid:string,
  name:string,
  date:number
}
const ITEM_KEY ='item-key'


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) { console.log('Your storage provider is working here !');}
  async set(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    console.log(reason);
    return false;
    }
    }
    // to get a key/value pair
    async get(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key);
    if (result != null) {
    return result;
    }
    return null;
    } catch (reason) {
    console.log(reason);
    return null;
    }
    }
    // set a key/value object
    async setObject(key: string, object: Object) {
    try {
    const result = await this.storage.set(key, JSON.stringify(object));
    console.log('set Object in storage: ' + result);
    return true;
    } catch (reason) {
    console.log(reason);
    return false;
    }
    }
    // get a key/value object
    async getObject(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key);
    if (result != null) {
    return JSON.parse(result);
    }
    return null;
    } catch (reason) {
    console.log(reason);
    return null;
    }
    }
    // remove a single key value:
    remove(key: string) {
    this.storage.remove(key);
    }
    //  delete all data from your application:
    clear() 
    {
    this.storage.clear();
    }


    addItem(item:Item): Promise<any>{
      return this.storage.get(ITEM_KEY).then((items:Item[])=>{
        if(items){
          items.push(item);
          return this.storage.set(ITEM_KEY,items);

        }
        else{
          return this.storage.set(ITEM_KEY,[item]);
        }
      });
    }
    getItems(): Promise<Item[]>{
      return this.storage.get(ITEM_KEY)
    }
    deleteItems(id: number): Promise<Item>{
      return this.storage.get(ITEM_KEY).then((items: Item[])=>{
        if(!items || items.length===0){
          return null;
        }
        let toKeep: Item[]=[];
        for(let i of items){
          if(i.id!==id){
            toKeep.push(i);
          }
        }
        return this.storage.set(ITEM_KEY,toKeep)
      })
    }
}
