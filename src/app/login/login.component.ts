import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { NotificationService } from '../services/notification.service';
// import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  @ViewChild('email', { static: true }) email!: ElementRef;;
  @ViewChild('password', { static: true }) password !: ElementRef;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private regServ: RegistrationService, private notiserv: NotificationService, private authservice: AuthGuardService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }
  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }
 
  login(){
    this.regServ.getUser().pipe().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.LoginForm.value.email && a.password === this.LoginForm.value.password 
      });
      if(user){
   
        localStorage.setItem("UserLogin",user);
        console.log(localStorage.setItem("UserLogin",'True'));
        this.notiserv.Sucess("Loggedin Successfully");
        this.LoginForm.reset()
      this.router.navigate(["Home"])
      }else{
        alert("user not found")
      }
    },err=>{
      alert("Something went wrong")
    })
  }

}
