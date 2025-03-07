import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  template: `
<!--    <div *ngIf="tasks?.length">-->
<!--      <h3>Tasks:</h3>-->
<!--      <ul>-->
<!--        <li *ngFor="let task of tasks">-->
<!--          {{ task }}-->
<!--          <button (click)="markAsFinished(task)">Mark as finished</button>-->
<!--          <button (click)="deleteTask(task.id)">Delete Task</button>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--    <p *ngIf="!tasks?.length">Nessuna task disponibile.</p>-->
  `,
  imports: [
    NgIf,
    NgForOf
  ],
  providers: [TaskService],
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input() tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  markAsFinished(task: any) {
    task.completed = true;
    this.taskService.updateTask(task).then(updatedTask => {
      this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).then(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }
}
