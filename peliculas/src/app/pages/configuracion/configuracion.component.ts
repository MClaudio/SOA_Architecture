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
  public accNew:any;
  public corpNew:any;

  ngOnInit(): void {
    this.soa.getAccount(this.bank).subscribe(res=>{
      console.log(res)
    });
  }
  changeAccount(){
    this.bank.account = this.accNew;
    this.bank.corporation  = this.corpNew;
    console.log(this.bank)
    this.soa.postChangeAccount(this.bank).subscribe(res=>{
    })
  }

}
