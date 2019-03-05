import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// const headers = new HttpHeaders({
//   Authorization:
//     "Bearer QDhDHn5DTF6q_42itQic5NXq2b39iG1pX2YJXD8CkqEpAL3zLyw30tV6j10smJ1CUmTb1rngkjtEZAifq4"
// });
export class MoviesService {
  url:string = "http://localhost:3000/";

  constructor(private http: HttpClient, private auth: AuthService) {
   
   }

  public getmovies() {
    let headers= new HttpHeaders({
      // Authorization:
      //   "Bearer "+this.auth.getUser().access_token
    });
    return this.http.get(`${this.url}peliculas`,{headers});
  }
  public getonemovie(id) {
    let headers= new HttpHeaders({
      Authorization:
        "Bearer "+this.auth.getUser().access_token
    });
    return this.http.get(`${this.url}peliculas/${id}`,{headers});
  }
  public getreservas() {
    let headers= new HttpHeaders({
      Authorization:
        "Bearer "+this.auth.getUser().access_token
    });
    let id_user=this.auth.getUser().data_user[0].id;
    return this.http.get(`${this.url}reservas?id_user=${id_user}`,{headers});
  }
  public postmovies(data) {
    let headers= new HttpHeaders({
      Authorization:
        "Bearer "+this.auth.getUser().access_token
    });
    return this.http.post(`${this.url}peliculas`,data,{headers});
  }
  public putmovies(data,id) {
    let headers= new HttpHeaders({
      Authorization:
        "Bearer "+this.auth.getUser().access_token
    });
    return this.http.put(`${this.url}peliculas/${id}`,data,{headers});
  }
  public deletemovies(id) {
    let headers= new HttpHeaders({
      Authorization:
        "Bearer "+this.auth.getUser().access_token
    });
    return this.http.delete(`${this.url}peliculas/${id}`,{headers});
  }
  public reservarmovie(id) {
    let headers= new HttpHeaders({
      Authorization:
        "Bearer "+this.auth.getUser().access_token
    });
    let data={
      id_movie:id,
      id_user:this.auth.getUser().data_user[0].id
    };

    return this.http.post(`${this.url}reservas`,data,{headers});
  }

}
