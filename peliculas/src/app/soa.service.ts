import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SoaService {
  private uri = 'http://localhost:8081';
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST',
  });
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${this.uri}/movies`);
  }

  getMovieById(id: number) {
    return this.http.get(`${this.uri}/movies/${id}`);
  }
  getShopAccount() {
    return this.http.get(`${this.uri}/shop/get-account`);
  }
  searchAccount(acc: any) {
    console.log('transfer', acc);
    let params = new HttpParams();
    params = params.append('account', acc.account);
    params = params.append('corporation', acc.corporation);

    return this.http.get(`${this.uri}/search-account`, { params: params });
  }
  postTransfer(obj: any) {
    console.log("transfer data", obj)

    let params = new HttpParams();
    params = params.append('amount', obj.amount);
    params = params.append('accountO', obj.accountOrigin.account);
    params = params.append('organisationO', obj.accountOrigin.organisation);
    params = params.append('accountD',  obj.accountDestination.account);
    params = params.append('organisationD', obj.accountDestination.organisation);

    console.log('params', params)

    return this.http.get(`${this.uri}/transfer`, { params: params });
  }
  postChangeAccount(acc: any) {
    let params = new HttpParams();
    params = params.append('account', acc.account);
    params = params.append('corporation', acc.corporation);
    return this.http.get(`${this.uri}/shop/change-account`,{ params: params });
  }
}
