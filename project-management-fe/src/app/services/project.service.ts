import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  async getProjects() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Errore nel recupero dei progetti', error);
      throw error;
    }
  }

  async updateProject(id: string, updatedData: any) {
    try {
      const response = await axios.put(`${this.apiUrl}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Errore nell\'aggiornamento del progetto', error);
      throw error;
    }
  }

  async deleteProject(id: string) {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Errore nell\'eliminazione del progetto', error);
      throw error;
    }
  }
}
