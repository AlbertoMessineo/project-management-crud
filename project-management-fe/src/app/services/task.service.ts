import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/projects'; // Cambiato per riflettere la nuova struttura

  constructor() {}

  // Ottenere tutte le task di un progetto
  async getTasks(projectId: string) {
    const response = await axios.get(`${this.baseUrl}/${projectId}/tasks`);
    return response.data;
  }

  // Creare una nuova task in un progetto
  async addTask(projectId: string, title: string) {
    const response = await axios.post(`${this.baseUrl}/${projectId}/tasks`, {
      title,
      completed: false
    });
    return response.data;
  }

  // Aggiornare una task
  async updateTask(projectId: string, taskId: string, title: string, completed: boolean) {
    const response = await axios.put(`${this.baseUrl}/${projectId}/tasks/${taskId}`, {
      title,
      completed
    });
    return response.data;
  }

  // Eliminare una task
  async deleteTask(projectId: string, taskId: string) {
    const response = await axios.delete(`${this.baseUrl}/${projectId}/tasks/${taskId}`);
    return response.data;
  }
}
