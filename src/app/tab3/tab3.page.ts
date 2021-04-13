import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  dataFoto=[{}]

  urlImageStorage : string[] = [];
  constructor(
    public dataService : DataService,
    private route : ActivatedRoute,
    private afStorage : AngularFireStorage,
    private router : Router  
  ) {}
  
  Judul
  Isi
  Tanggal
  Nilai
  
  tampilkanData(){
    this.dataFoto=[]
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage/'+this.Judul);
    if(refImage){
      refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) =>
        itemRef.getDownloadURL().then(url =>{
          this.urlImageStorage.unshift(url)
          console.log(itemRef.name)
          this.dataFoto.unshift(
            {
              link : url,
              nama : itemRef.name
            }
            )
        })
        )
      }).catch((error) =>{
        console.log(error)
      })
    }
  }

  detail(a){
    this.router.navigate(['/tab5',a])
  }
  tab4(){
    this.router.navigate(['/tab4'])
  }
  tambahImage(){
    this.router.navigate(['/tab2',this.Judul,this.Isi,this.Tanggal,this.Nilai])
  }

  ngOnInit(){
    let judul = this.route.snapshot.paramMap.get('judul')
    let isi = this.route.snapshot.paramMap.get('isi')
    let tanggal = this.route.snapshot.paramMap.get('tanggal')
    let nilai = this.route.snapshot.paramMap.get('nilai')

    this.Judul=judul
    this.Isi=isi
    this.Tanggal = tanggal
    this.Nilai = nilai

    this.tampilkanData()
  }
}
