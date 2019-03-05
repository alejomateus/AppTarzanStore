import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  forma:FormGroup;
  complete=false;
  constructor(private auth: AuthService,private router: Router) {
    this.forma = new FormGroup({
      'correo': new FormControl('',   [
                                        Validators.required,
                                        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                      ]),
      'password1': new FormControl('', Validators.required),
    })
  }
  login(){
    let data ={
      "password": this.forma.value['password1'],
      "email": this.forma.value['correo'],
    };
    this.auth.login(data).subscribe(resp => {
      this.router.navigate(['protected']);
      this.auth.changeAutenticated(resp);
    },error=>{
      console.log(error);
    });
  }


}
