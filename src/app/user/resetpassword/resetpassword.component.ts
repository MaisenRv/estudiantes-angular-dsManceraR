import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  resetPassForm:FormGroup;

  constructor(private fb:FormBuilder){
    this.resetPassForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]]
    })
  }

  onSubmit(){
    if (this.resetPassForm.valid) {
      console.log(this.resetPassForm.value);
    }
  }
}
