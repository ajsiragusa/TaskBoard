import { Component, signal, WritableSignal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { FormsModule } from '@angular/forms';
import { ProjectSubscriber } from '../../classes/project-subscriber';
import { CommonModule } from '@angular/common';
import { ProjectData } from '../../interfaces/project-data';

@Component({
  selector: 'app-project',
  imports: [FormsModule, CommonModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project extends ProjectSubscriber {
  constructor(private projectService: ProjectService) {
    super();
  }

  allProjects: WritableSignal<ProjectData[]> = signal([]);
  projectData: WritableSignal<ProjectData | null> = signal(null);
  deletedProjectData: WritableSignal<ProjectData | null> = signal(null);
  projectsByOwnerEmail: WritableSignal<ProjectData[]> = signal([]);

  nameText: string = '';
  descriptionText: string = '';
  ownerEmailText: string = '';
  idValue: string = '';
  errorMessage: WritableSignal<string> = signal('');
  successMessageAddProject: WritableSignal<string> = signal('');
  successMessageUpdateProject: WritableSignal<string> = signal('');
  successMessageDeleteProject: WritableSignal<string> = signal('');

  updateNameText: string = '';
  updateDescriptionText: string = '';
  updateOwnerEmailText: string = '';
  updateIdText: string = '';

  ownerEmailSearch: string = '';

  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (responseData) => {
        this.allProjects.set(responseData);
        console.log(responseData);
      },
    });
  }

  getProjectById() {
    this.projectService.getProjectById(this.idValue).subscribe({
      next: (responseData) => {
        this.projectData.set(responseData);
        console.log(responseData);
      },
    });
  }

  getProjectsByOwnerEmail() {
    this.projectService.getProjectsByOwnerEmail(this.ownerEmailSearch).subscribe({
      next: (responseData) => {
        this.projectsByOwnerEmail.set(responseData);
        console.log(responseData);
      },
    });
  }

  postProject() {
    this.projectService
      .postProject(this.nameText, this.descriptionText, this.ownerEmailText)
      .subscribe({
        next: (responseData) => {
          this.projectData.set(responseData);
          this.successMessageAddProject.set(`Project ${responseData.projectId} Created`);
          console.log(responseData);
        },
      });
  }

  updateProjectById() {
    this.projectService
      .updateProjectById(
        this.updateIdText,
        this.updateNameText,
        this.updateDescriptionText,
        this.updateOwnerEmailText
      )
      .subscribe({
        next: (responseData) => {
          this.projectData.set(responseData);
          this.successMessageUpdateProject.set(`Project ${responseData.projectId} Updated`);
          console.log(responseData);
        },
      });
  }

  deleteProjectById() {
    if (this.idValue.trim() === '') {
      this.errorMessage.set('Project ID is required');
      console.error(this.errorMessage);
      return;
    }
    this.projectService.deleteProjectById(this.idValue).subscribe({
      next: (responseData) => {
        this.deletedProjectData.set(responseData);
        this.getProjects();
        this.successMessageDeleteProject.set(`Project ${this.idValue} Deleted`);
        console.log(responseData);
      },
    });
  }
}
