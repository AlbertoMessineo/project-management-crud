import { Injectable } from '@angular/core';
import axios from 'axios';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  async getTasks(projectId: string): Promise<Task[]> {
    const response = await axios.get(`${this.apiUrl}/${projectId}`);
    return response.data;
  }

  async createTask(task: Task): Promise<Task> {
    const response = await axios.post(this.apiUrl, task);
    return response.data;
  }

  async updateTask(projectId: string, task: Task): Promise<Task> {
    const response = await axios.put(`${this.apiUrl}/${task.id}`, task);
    return response.data;
  }

  async deleteTask(projectId: string, taskId: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${taskId}`);
  }
}
