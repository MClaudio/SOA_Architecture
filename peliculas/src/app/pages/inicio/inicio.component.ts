import { Component, OnInit } from '@angular/core';
import { SoaService } from '../../soa.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public movies:any=[];
  public movie: any;
  public numAccount:any;
  public bougth:boolean=false;
  
  public tranfer:any={
    amount:0,
    accountOrigin:{
      account:"",
      organisation:""
    },
    accountDestination:{
      account:"",
      organisation:""
    }
  };
  constructor(private soa:SoaService) { 
    this.loadData();
  }

  ngOnInit(): void {

  }
  loadData(){
    this.soa.getMovies().subscribe(res=>{
      console.log("movies", res)
      this.movies = res;
    })
  }
  loadMovie(m: any){
    console.log(m)
    this.movie=m;
    this.tranfer.accountDestination={
      "account":this.movie.pay_detail.account,
    "organisation":this.movie.pay_detail.corporation}
    this.bougth=false;
  }
  buy(){
    if(this.tranfer.accountOrigin.account && this.tranfer.accountOrigin.organisation){
      this.tranfer.amount = this.movie.price;
      this.soa.postTransfer(this.tranfer).subscribe(res=>{
        console.log(res)
        this.tranfer.accountOrigin.account = null;
        this.tranfer.accountOrigin.organisation = null;
        this.bougth = true;
      },
      err=>{
        console.log("err", err)
      });
    }
 
    
  }

}
