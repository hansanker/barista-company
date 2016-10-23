import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Checklist} from'../checklist.interface';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      hours: this._fb.array([
        this.initAddress(),
      ])
    });
  }

  initAddress() {
    // initialize our address
    return this._fb.group({
      van: ['', Validators.required],
      tot: ['']
    });
  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['hours'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['hours'];
    control.removeAt(i);
  }

  save(model: Checklist) {
    // call API to save customer
    console.log(model);
  }

}
