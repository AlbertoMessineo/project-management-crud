import { Injectable } from '@angular/core';
import axios from 'axios';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/projects'; // 🔥 Cambiato a /projects

  async getTasks(projectId: string): Promise<Task[]> {
    const response = await axios.get(`${this.apiUrl}/${projectId}/tasks`);
    return response.data;
  }

  async createTask(projectId: string, task: Task): Promise<Task> {
    const response = await axios.post(`${this.apiUrl}/${projectId}/tasks`, task);
    return response.data;
  }

  async updateTask(projectId: string, task: Task): Promise<Task> {
    if (!task.id) throw new Error('Task ID is required for update');
    const response = await axios.put(`${this.apiUrl}/${projectId}/tasks/${task.id}`, task);
    return response.data;
  }

  async deleteTask(projectId: string, taskId: string): Promise<void> {
    if (!taskId) throw new Error('Task ID is required for delete');
    await axios.delete(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
  }
}
