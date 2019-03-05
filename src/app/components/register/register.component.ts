import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  forma:FormGroup;
  complete=false;
  constructor(private auth: AuthService,private router: Router) {
    this.forma = new FormGroup({

      'nombre': new FormControl('' ,  [
        Validators.required,
        Validators.minLength(3)
      ]),
      'correo': new FormControl('',   [
                                        Validators.required,
                                        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                      ]),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    })
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

   }
   noIgual( control: FormControl ): { [s:string]:boolean }  {
    let forma:any = this;

    if( control.value !== forma.controls['password1'].value ){
      return {
        noiguales:true
      }
    }

    return null;
  }
  register(){
    let data ={
      "name": this.forma.value['nombre'],
      "password": this.forma.value['password1'],
      "email": this.forma.value['correo'],
      "rol": "user"
    };
    console.log(data);
    this.auth.register(data).subscribe(resp => {
      this.complete=true;
      this.router.navigate(['login']);
    },error=>{
      this.complete=false;
      console.log(error);
    });
  }


}
