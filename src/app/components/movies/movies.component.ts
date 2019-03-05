import { Component,  } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms'
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent  {
  movies:any;
  reservas:any;
  forma:FormGroup;
  action:string="crear";
  id_edit:any;
  constructor(private _movie: MoviesService,private auth :AuthService) {
    this.getmovies();
    this.forma = new FormGroup({
      "title": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "list": new FormControl('', Validators.required),
      "director": new FormControl('', Validators.required),
      "cost": new FormControl('', Validators.required),
      "quantity": new FormControl('', Validators.required),
    })
   }
   deletemovie(id){
    this._movie.deletemovies(id).subscribe(resp => {
      console.log(resp);
      this.getmovies();
    },error=>{
      console.log(error);
    });
   }
   getmovies(){
    this._movie.getmovies().subscribe(resp => {
      this.movies=resp;
      
      this.getreservas();
      console.log(this.movies);
    },error=>{
      console.log(error);
    });
   }
   getreservas(){
    this._movie.getreservas().subscribe(resp => {
      this.reservas = resp;
      this.movies.forEach(movie => {
        movie.reserva = false;
        this.reservas.forEach(reserva => {
          if(movie.id == reserva.id_movie){
            movie.reserva = true;
          }
        });
        
      });
    },error=>{
      console.log(error);
    });
   }
   reservarmovie(id){
    this._movie.reservarmovie(id).subscribe(resp => {
      this.getmovies();
    },error=>{
      console.log(error);
    });
   }
   cargardata(id){
    this._movie.getonemovie(id).subscribe((resp:any) => {
      this.forma.controls["title"].setValue(resp.title);
      this.forma.controls["description"].setValue(resp.description);
      this.forma.controls["list"].setValue(resp.list);
      this.forma.controls["director"].setValue(resp.director);
      this.forma.controls["cost"].setValue(resp.cost);
      this.forma.controls["quantity"].setValue(resp.quantity);
      this.id_edit= id;
      this.action="editar";
    },error=>{
      console.log(error);
    });
   }
   actionmovie(){
     let data={
      "title": this.forma.value["title"],
      "description": this.forma.value["description"],
      "list": this.forma.value["list"],
      "director": this.forma.value["director"],
      "cost": this.forma.value["cost"],
      "quantity": this.forma.value["quantity"]
     }
     console.log(this.action);
    if(this.action=="crear"){
      this._movie.postmovies(data).subscribe(resp => {
        this.movies.push(resp);
        this.clearform();
        

      },error=>{
        console.log(error);
      });
    }
    else if(this.action=="editar"){
      this._movie.putmovies(data,this.id_edit).subscribe(resp => {
        this.getmovies();
        this.clearform();
      },error=>{
        console.log(error);
      });
    }
   }
   clearform(){
    this.forma.controls["title"].setValue("");
    this.forma.controls["description"].setValue("");
    this.forma.controls["list"].setValue("");
    this.forma.controls["director"].setValue("");
    this.forma.controls["cost"].setValue("");
    this.forma.controls["quantity"].setValue("");
   }
  

}
