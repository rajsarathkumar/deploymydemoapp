import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  public loginData : any = {}
  constructor(private _snackBar: MatSnackBar, private route : Router) { }

  ngOnInit() {
  }

  login() {
    if(this.loginForm.invalid){
      this._snackBar.open('Please fill all the fields!', '', {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
      });      
    }else{
      if(this.loginData.userName == 'doctor' && this.loginData.userPassword == 'doctor'){
        this._snackBar.open('Logged in', '', {
          duration: 6000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
          //panelClass: ['green-snackbar'],
        });
        var Role = "Doctor"
        localStorage.setItem('role',Role)
        this.route.navigate(['/dashboard'])
      }else if(this.loginData.userName == 'patient' && this.loginData.userPassword == 'patient'){
        this._snackBar.open('Logged in', '', {
          duration: 6000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
          //panelClass: ['green-snackbar'],
        });
        var Role = "Patient"
        localStorage.setItem('role',Role)
        this.route.navigate(['/dashboard'])
      }else{
        this._snackBar.open('Invalid Credentials', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        });
      }
    }
  }

}
