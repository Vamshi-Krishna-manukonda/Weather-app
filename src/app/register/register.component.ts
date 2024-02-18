import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { DialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  empForm!: FormGroup;
  ActionBtn: string = 'Save';
  public genderlist = ['Female', 'Male', 'Others'];
  constructor(public empfb: FormBuilder,private regServ:RegistrationService,public notificationService:NotificationService,private routr:Router) { }

  ngOnInit(): void {
    this.empForm = this.empfb.group({
      empName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,16})$")]],
      mobileNO: ['', [Validators.required, Validators.minLength(10)]],
      gender: [''],
      date:[''],
      Address: ['']
    })
}
addEmp(){
  // console.log(this.empForm.value);
  if(!this.empForm.valid){
    this.notificationService.warn('Please Enter Valid Details')
  }
  if (this.empForm.valid) {
    this.regServ.postUser(this.empForm.value).subscribe(
      {
        next: (res: any) => {
          // alert('postdata Success');c
          this.empForm.reset();
          // this.dialogRef.close('Save');
          if(res){
            this.notificationService.Sucess('Record success fully Posted');
            this.routr.navigate(["login"]);
          }
            else {
              this.notificationService.warn('Please Enter Valid Details')
            }
          
        }, error: (err: any) => {
          this.notificationService.warn('Something Went Wrong');
        }
      }
    )
  }
  
}

get f():{[key:string]:AbstractControl}{
  return this.empForm.controls;
}
login(){
  debugger
  this.routr.navigate(["login"]);
}

}
