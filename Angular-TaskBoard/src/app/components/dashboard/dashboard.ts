import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project-service';
import { ProjectData } from '../../interfaces/project-data';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, FormsModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard {
    projects: WritableSignal<ProjectData[]> = signal([]);
    successMessage: WritableSignal<string> = signal('');
    errorMessage: WritableSignal<string> = signal('');

    constructor(private projectService: ProjectService) {}

    loadProjects(): void {
        this.projectService.getProjects().subscribe({
            next: (data) => {
                this.projects.set(data);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load projects');
                console.error(err);
            }
        });
    }
}
