import { Component, OnInit } from '@angular/core';
import { SoaService } from '../../soa.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private soa:SoaService) { 
    this.loadData();
  }

  ngOnInit(): void {

  }
  loadData(){
    this.soa.getMovieById(615457).subscribe(res=>{
      console.log("movies", res)
    })
  }

}
