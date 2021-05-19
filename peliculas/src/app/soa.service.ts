import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SoaService {
  private uri = 'http://localhost:8081';
  private headers = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'
  } );
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${this.uri}/movies`);
  }

  getMovieById(id: number) {
    return this.http.get(`${this.uri}/movies/${id}`);
  }
  getAccount(acc: any) {
    return this.http.get(`${this.uri}/shop/get-account`);
  }
  postSearchAccount(acc: any) {
    console.log('transfer', acc);
    return this.http.post(`${this.uri}/search-account`, acc, {
      headers: this.headers,
    });
  }
  postTransfer(obj: any) {
    //let data = JSON.parse(obj)
    console.log('transfer', obj);
    return this.http.post(`${this.uri}/transfer/`, obj, {
      headers: this.headers,
    });
  }
  postChangeAccount(acc: Account) {
    return this.http.post(`${this.uri}/shop/change-account`, acc, {
      headers: this.headers,
    });
  }
}
