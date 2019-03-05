import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'protected', component: ProtectedComponent, canActivate:[AuthGuardService]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**',pathMatch:'full', redirectTo:'home' },
    { path: '',pathMatch:'full', redirectTo:'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class APPROUTING {}
