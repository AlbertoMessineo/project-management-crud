import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-tasks',
  standalone: true,
  template: `
    <div *ngIf="tasks?.length">
      <h3>Tasks:</h3>
      <ul>
        <li *ngFor="let task of tasks">
          {{ task.title }}
          <input type="checkbox" [checked]="task.completed" (change)="markAsFinished(task)">
          <button (click)="deleteTask(task.id)">Delete Task</button>
        </li>
      </ul>
    </div>
    <p *ngIf="!tasks?.length">Nessuna task disponibile.</p>
  `,
  imports: [NgIf, NgForOf],
  providers: [TaskService],
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input() tasks: Task[] = [];
  @Input() projectId!: string; // Aggiungi l'ID del progetto

  constructor(private taskService: TaskService) {}

  async markAsFinished(task: Task) {
    try {
      const updatedTask = await this.taskService.updateTask(this.projectId, task);
      this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t); // ✅ Aggiorna solo la task modificata
    } catch (error) {
      console.error("Errore nell'aggiornamento della task:", error);
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this.taskService.deleteTask(this.projectId, taskId);
      this.tasks = this.tasks.filter(task => task.id !== taskId); // ✅ Rimuove solo la task eliminata
    } catch (error) {
      console.error("Errore nella cancellazione della task:", error);
    }
  }
