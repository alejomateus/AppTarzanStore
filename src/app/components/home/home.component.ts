import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  movies:any;
  constructor(private _movie: MoviesService) {
    this.getmovies();
   }

   getmovies(){
    this._movie.getmovies().subscribe(resp => {
      this.movies=resp;
      console.log(this.movies);
    },error=>{
      console.log(error);
    });
   }

}
