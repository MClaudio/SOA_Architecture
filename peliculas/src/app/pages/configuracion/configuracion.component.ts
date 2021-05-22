import { Component, OnInit } from '@angular/core';
import { SoaService } from '../../soa.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private soa:SoaService) { }

  public bank:any={
    account: "",
    corporation: ""
  }

  public accout:any; 
  public accNew:any;
  public corpNew:any;

  ngOnInit(): void {
    this.loadData();
  }
  async loadData(){
    await this.soa.getShopAccount().subscribe(async (res)=>{
      console.log(res)
      await this.soa.searchAccount(res).subscribe(res=>{
        console.log(res)
        this.accout = res;
      })
    });
  }
  async changeAccount(){

    console.log(this.bank)
    await this.soa.postChangeAccount(this.bank).subscribe(res=>{
      this.loadData();
    })
  }

}
