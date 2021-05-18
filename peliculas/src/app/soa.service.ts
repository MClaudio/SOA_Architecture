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
}
