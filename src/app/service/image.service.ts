import { Injectable } from '@angular/core';
import {Storage, ref,uploadBytes, listAll ,getDownloadURL} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images : string [];
  constructor(
    private storage:Storage,
    ) {
      this.images = [];
     }

  public uploadImage($event:any, name:string){
    const file = $event.target.files[0]
    const imgRef = ref(this.storage,`imagen/`+ name)
    uploadBytes(imgRef,file)
    .then(response => {this.getImages()})
    .catch(error => console.log(error)
    )
  }
  getImages(){
    const imagesRef = ref(this.storage,'imagen')
    
    listAll(imagesRef)
    .then( async response =>{
      this.images = [];
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })
    .catch(error => console.error(error));
  }
}
