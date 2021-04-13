import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    private route : ActivatedRoute
  ) { }

  fileImage 
  ngOnInit() {
    let data = this.route.snapshot.paramMap.get('foto')
    this.fileImage = data
  }

}
