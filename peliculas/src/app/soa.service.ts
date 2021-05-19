import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoaService {

  private uri = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${this.uri}/movies`);
  }

  getMovieById(id:number){
    return this.http.get(`${this.uri}/movies/${id}`);
  }
  getAccount(acc:any){
    return this.http.get(`${this.uri}/shop/get-account`);
  }
  postSearchAccount(acc:any){
    return this.http.post(`${this.uri}/search-account`,JSON.parse(acc));
  }
  postTransfer(obj: any){
    return this.http.post(`${this.uri}/transfer`,obj);
  }
  postChangeAccount(acc:Account){
    return this.http.post(`${this.uri}/shop/change-account`,acc); 
  }
}
