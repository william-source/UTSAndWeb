import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dataFoto=[{}]
  urlImageStorage : string[] = [];
  constructor(
		    private afStorage   : AngularFireStorage,
		    public dataService  : DataService,
        private route : ActivatedRoute,
        private router : Router
  ) {}

  judul
  isi
  tanggal
  nilai
 async ngOnInit(){
    let judul = this.route.snapshot.paramMap.get('judul')
    let isi = this.route.snapshot.paramMap.get('isi')
    let tanggal = this.route.snapshot.paramMap.get('tanggal')
    let nilai = this.route.snapshot.paramMap.get('nilai')
    
    this.judul=judul
    this.isi=isi
    this.tanggal=tanggal
    this.nilai=nilai
    await this.dataService.loadFoto();
    await this.updateCheckbox()
  }

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
async uploadSelectedPhoto(){
  let cek=false
  console.log(this.checkBox)
  for(var i=0;i<this.checkBox.length;i++){
    if(this.checkBox[i].isChecked == true){
      const imgFilePath=`imgStorage/${this.judul}/${this.dataService.dataFoto[i].filePath}`
      cek=true
      await this.afStorage.upload(imgFilePath,this.dataService.dataFoto[i].dataImage).then(()=>{
        this.checkBox[i].isChecked=false
      })
    }
  }
  console.log("done")
  this.router.navigate(['tab3',this.judul,this.isi,this.tanggal,this.nilai])
}

}
