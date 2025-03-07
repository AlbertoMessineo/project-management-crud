import {Component, inject, OnInit} from '@angular/core';
import {CommonModule}              from '@angular/common';
import {ProjectService}            from '../../services/project.service';
import {Project}                   from '../../models/project.model';
import {Router}                    from '@angular/router';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  protected projects: Project[] = [];
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);

  ngOnInit(): void {
    this.initData().then();
  }

  protected onProjectDetailClick(id: string): Promise<boolean> {
    return this.router.navigate(['/project', id]);
  }

  protected async deleteProject(id: string): Promise<void> {
    await this.projectService.deleteProject(id);
    await this.initData();
  }

  protected async updateProject(project: Project): Promise<void> {
    const body = {
      ...project,
      toDo: !project.toDo
    };
    const updatedProject = await this.projectService.updateProject(project.id, body);
    this.projects = this.projects.map(p => p.id === updatedProject.id ? updatedProject : p);
  }

  private async initData(): Promise<void> {
    this.projects = await this.projectService.getProjects();
  }
}

