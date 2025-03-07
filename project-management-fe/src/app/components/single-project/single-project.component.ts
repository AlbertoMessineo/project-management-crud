import {Component, inject, Input, OnInit} from '@angular/core';
import {Router}                           from '@angular/router';
import {CommonModule}                     from '@angular/common';
import {ProjectService}                   from '../../services/project.service';
import {Project}                          from '../../models/project.model';
import {TasksComponent}                   from '../tasks/tasks.component';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss']
})
export class SingleProjectComponent implements OnInit {
  @Input({required: true}) id!: string;
  protected project: Project | null = null;
  private router = inject(Router);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.initData().then();
  }

  protected async updateProject(): Promise<void> {
    if (!this.project) {
      return;
    }
    const body = {
      ...this.project,
      toDo: !this.project.toDo
    };
    this.project = await this.projectService.updateProject(this.project.id, body);
  }

  protected async deleteProject(): Promise<boolean| void > {
    if (!this.project) {
      return;
    }
    await this.projectService.deleteProject(this.project.id);
    return this.router.navigate(['/']);
  }

  private async initData(): Promise<void> {
    if (!this.id) {
      return;
    }
    this.project = await this.projectService.getProjectById(this.id);
  }
}
