import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

      afs : AngularFirestore
      isiDataColl : AngularFirestoreCollection<data>;
      isiData : Observable<data[]>;
      Judul : string;
      Isi : string;
      tanggal : string;
      nilai : string;
      date : string     
      code = 0
      constructor(
        afs : AngularFirestore,
        private router : Router,
        private afStorage : AngularFireStorage,
        public dataService : DataService
      ) {
        this.isiDataColl = afs.collection('dataCoba')
        this.isiData = this.isiDataColl.valueChanges();
    
      }
      simpan(){
        this.isiDataColl.doc(this.Judul).set({
          judul:this.Judul,
          isi : this.Isi,
          tanggal : this.tanggal,
          nilai : this.nilai
        })
        this.clear()
      }
      clear(){
        this.Judul =""
        this.Isi = ""
        this.tanggal=""
        this.nilai=""
        this.code=0
      }

      updated(judul,isi,tanggal,nilai){
        this.code = 1
        this.Judul = judul
        this.Isi = isi
        this.tanggal=tanggal
        this.nilai=nilai
        this.clear
      }

      delete(a){
        this.isiDataColl.doc(a).delete().then(()=>{
          console.log("Document successfully deleted!");
        }).catch((error)=>{
          console.error("Error removing document : ",error);
        })

        var refImage = this.afStorage.storage.ref('imgStorage/'+a);
        refImage.listAll()
        .then((res) => {
        res.items.forEach((itemRef)=>{
          itemRef.delete().then(()=>{
            console.log("deleted")
         });
        });
      }).catch((error)=>{
        console.log(error)
      })
      }

      ngOnInit(){
        this.clear
        this.isiDataColl = this.afs.collection('dataCoba')
        this.isiData = this.isiDataColl.valueChanges();
      }

      goToDetail(judul,isi,tanggal,nilai){
        this.router.navigate(['/tab3',judul,isi,tanggal,nilai])
      }
}
interface data {
    judul : string,
    isi : string,
    tanggal : string,
    nilai : string
}