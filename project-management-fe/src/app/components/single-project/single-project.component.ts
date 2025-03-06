import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule }   from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project }        from '../../models/project.model';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss'],
})
export class SingleProjectComponent implements OnInit {
  project: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      try {
        this.project = await this.projectService.getProjectById(projectId);
      } catch (error) {
        console.error('Errore nel recupero del progetto:', error);
      }
    }
  }
}
