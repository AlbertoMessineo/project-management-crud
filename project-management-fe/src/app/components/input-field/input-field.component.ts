import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      toDo: [true],
    });
  }

  async onSubmit() {
    if (this.projectForm.valid) {
      try {
        const response = await axios.post('http://localhost:3000/projects', this.projectForm.value);
        console.log('Progetto creato:', response.data);
        this.projectForm.reset();
      } catch (error) {
        console.error('Errore nella creazione del progetto:', error);
      }
    }
  }
}