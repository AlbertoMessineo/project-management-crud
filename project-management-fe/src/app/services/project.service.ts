import {inject, Injectable} from '@angular/core';
import {Project}            from '../models/project.model';
import {HttpClient}         from '@angular/common/http';
import {firstValueFrom}     from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';
  private readonly httpClient = inject(HttpClient);

  async getProjects() {
    const get$ = this.httpClient.get<Project[]>(this.apiUrl);
    return await firstValueFrom(get$);
  }

  async updateProject(id: string, updatedData: any) {
    const put$ = this.httpClient.put<Project>(`${this.apiUrl}/${id}`, updatedData);
    return await firstValueFrom(put$);
  }

  async deleteProject(id: string) {
    const delete$ = this.httpClient.delete<Project>(`${this.apiUrl}/${id}`);
    return await firstValueFrom(delete$);
  }

  async getProjectById(id: string): Promise<Project> {
    const get$ = this.httpClient.get<Project>(`${this.apiUrl}/${id}`);
    return await firstValueFrom(get$);
  }
}
