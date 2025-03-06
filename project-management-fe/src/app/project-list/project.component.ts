import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule],
  providers: [ProjectService],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  async ngOnInit() {
    try {
      this.projects = await this.projectService.getProjects();
    } catch (error) {
      console.error('Errore nel caricamento dei progetti:', error);
    }
  }
  async deleteProject(id: string) {
    try {
      await this.projectService.deleteProject(id);
      this.projects = this.projects.filter(project => project.id !== id);
    } catch (error) {
      console.error('Errore nella cancellazione del progetto:', error);
    }
  }

  async updateProject(project: Project) {
    const updatedProject = { ...project, toDo: !project.toDo };
    try {
      await this.projectService.updateProject(project.id, updatedProject);
      this.projects = this.projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    } catch (error) {
      console.error('Errore nell’aggiornamento del progetto:', error);
    }
  }

}
