import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  signinForm: any; 

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      "email":new FormControl(null,  [Validators.required, Validators.email]),
      "password":new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z]*')]),
    });
  }
  //submitfunction
  submitData(){
    // this.submitted = true;
    console.log(this.signinForm.value);
    // alert(this.signinForm.name)
  }
  
  get email(){return this.signinForm.get('email');}
  get password(){return this.signinForm.get('password');}

}
