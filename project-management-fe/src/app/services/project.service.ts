import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:3000/projects'; 
=======
  private apiUrl = 'http://localhost:3000/projects';
>>>>>>> 2cd39a75cdd8430dfe10f726513d20c34778413e

  async getProjects() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Errore nel recupero dei progetti', error);
      throw error;
    }
  }
<<<<<<< HEAD
=======

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
>>>>>>> 2cd39a75cdd8430dfe10f726513d20c34778413e
}
