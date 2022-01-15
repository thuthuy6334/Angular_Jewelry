import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }
  submitted: boolean = false;
  signinForm: any; 

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      "name":new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      "phone":new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
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

  get name(){return this.signinForm.get('name');}
  get phone(){return this.signinForm.get('phone');}
  get email(){return this.signinForm.get('email');}
  get password(){return this.signinForm.get('password');}
}
