import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import {CommonModule}               from '@angular/common';
import {FormsModule}                from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class TasksComponent implements OnInit {
  @Input() projectId!: string;
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    if (!this.projectId) return;
    this.tasks = await this.taskService.getTasks(this.projectId);
  }

  async addTask(title: string) {
    if (!this.projectId || !title.trim()) return;
    const newTask = await this.taskService.addTask(this.projectId, title);
    this.tasks.push(newTask);
  }

  async updateTask(task: any) {
    if (!this.projectId || !task.id) return;
    await this.taskService.updateTask(this.projectId, task.id, task.title, task.completed);
  }

  async deleteTask(taskId: string) {
    if (!this.projectId || !taskId) return;
    await this.taskService.deleteTask(this.projectId, taskId);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
