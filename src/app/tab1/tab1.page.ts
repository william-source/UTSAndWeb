import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';

@Component({
  selector                : 'app-tab1',
  templateUrl             : 'tab1.page.html',
  styleUrls               : ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
		    private afStorage   : AngularFireStorage,
		    public dataService  : DataService,
        private route : ActivatedRoute
  ) {}

  async ngOnInit(){
    let judul = this.route.snapshot.paramMap.get('judul')
    await this.dataService.loadFoto();
    await this.updateCheckbox()
  }

urlImageStorage : string[] = [];
checkBox = []

  async tambahFoto(){
	  await this.dataService.tambahFoto()
		this.updateCheckbox()
  }
  TambahFoto(){
    this.dataService.tambahFoto();
  }
  async updateCheckbox(){
		console.log("pressed")
		this.checkBox       = []
		for(var i=0;i<this.dataService.dataFoto.length;i++){
		  this.checkBox.push({
		  webViewPath     : this.dataService.dataFoto[i].webviewPath,
		  isChecked       : false
		  })
		}
  }

uploadFoto(){
  this.urlImageStorage=[];
  for(var index in this.dataService.dataFoto){
    if(this.dataService.dataFoto[index].filePath!="Load")
    {
    console.log(index, this.dataService.dataFoto[index].filePath)
    
    const imgFilePath = `imgStorage/${this.dataService.dataFoto[index].filePath}`
    this.afStorage.upload(imgFilePath,this.dataService.dataFoto[index].dataImage).then(() => {
      this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url)=>{
        this.urlImageStorage.unshift(url)
        console.log(url);
      });
    });
  }
  }
}

async uploadSelectedPhoto(){
  let cek=false
  console.log(this.checkBox)
  for(var i=0;i<this.checkBox.length;i++){
    if(this.checkBox[i].isChecked == true){
      const imgFilePath=`imgStorage/${this.dataService.dataFoto[i].filePath}`
      cek=true
      await this.afStorage.upload(imgFilePath,this.dataService.dataFoto[i].dataImage).then(()=>{
        this.checkBox[i].isChecked=false
      })
    }
  }
  console.log("done")
}

}
