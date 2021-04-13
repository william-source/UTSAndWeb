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
        this.isiDataColl = this.afs.collection('dataCoba')
        this.isiData = this.isiDataColl.valueChanges();
      }

      goToDetail(judul,isi,tanggal,nilai){
        this.router.navigate(['/tab3',judul,isi,tanggal,nilai])
      }

      // tambahImage(){
      //   this.date = this.Isi,this.tanggal+"/"+this.bulan+"/"+this.tahun
      //   this.router.navigate(['/tab2',this.Judul,this.Isi,this.date,this.nilai])
      // }
}
interface data {
    judul : string,
    isi : string,
    tanggal : string,
    nilai : string
}