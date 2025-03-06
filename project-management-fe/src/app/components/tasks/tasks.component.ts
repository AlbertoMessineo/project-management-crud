import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import {CommonModule}               from '@angular/common';

interface Task {
  id?: string;
  projectId: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() projectId!: string;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this.taskService.getTasks(this.projectId);
  }

  async addTask(title: string): Promise<void> {
    const newTask: Task = { projectId: this.projectId, title, completed: false };
    const task = await this.taskService.createTask(newTask);
    this.tasks.push(task);
  }

  async updateTask(task: Task): Promise<void> {
    await this.taskService.updateTask(task);
    await this.loadTasks();
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
