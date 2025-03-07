import {Component}                                                          from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import axios                                                                from 'axios';
import {NgForOf}                                                            from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
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
      tasks: this.fb.array([])
    });
  }

  get tasks(): FormArray {
    return this.projectForm.get('tasks') as FormArray;
  }

  addTask() {
    this.tasks.push(this.fb.control('', Validators.required));
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  async onSubmit() {
    if (this.projectForm.valid) {
      try {
        const response = await axios.post('http://localhost:3000/projects', this.projectForm.value);
        console.log('Progetto creato:', response.data);
        this.projectForm.reset();
        this.tasks.clear();
      }
      catch (error) {
        console.error('Errore nella creazione del progetto:', error);
      }
    }
  }
}
