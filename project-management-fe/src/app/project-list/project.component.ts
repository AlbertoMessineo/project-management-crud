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
}
