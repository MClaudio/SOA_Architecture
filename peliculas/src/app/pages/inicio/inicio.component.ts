import { Component, OnInit } from '@angular/core';
import { SoaService } from '../../soa.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  public movies: any = [];
  public movie: any;
  public numAccount: any;
  public bougth: boolean = false;
  public error:boolean = false;
  public urlImg = 'https://image.tmdb.org/t/p/w500';

  public tranfer: any = {
    amount: 0,
    accountOrigin: {
      account: '',
      organisation: '',
    },
    accountDestination: {
      account: '',
      organisation: '',
    },
  };
  constructor(private soa: SoaService) {
    this.loadData();
  }

  ngOnInit(): void {}
  loadData() {
    this.soa.getMovies().subscribe((res) => {
      console.log('movies', res);
      this.movies = res;
    });
  }
  loadMovie(m: any) {

    this.tranfer.accountOrigin.account = '';
    this.tranfer.accountOrigin.organisation = '';

    //console.log(m);
    this.movie = m;
    this.tranfer.accountDestination = {
      account: this.movie.pay_detail.account,
      organisation: this.movie.pay_detail.corporation,
    };
    this.bougth = false;
    this.error = false;
  }
  async buy() {
    if (
      (this.tranfer.accountOrigin.account || this.tranfer.accountOrigin.account !=="") &&
      (this.tranfer.accountOrigin.organisation || this.tranfer.accountOrigin.organisation !=="")
    ) {
      
      this.tranfer.amount = this.movie.price;
      console.log("this.tranfer", this.tranfer)

      await this.soa.postTransfer(this.tranfer).subscribe(
        (res:any) => {
          console.log("res transfer", res)
          if(res.status === 'ok'){
            this.bougth = true;
          }else{
            this.error = true;
          }
          
        },
        (err) => {
          console.log('err', err);
          this.error = true;
        }
      );
    }
  }
}
