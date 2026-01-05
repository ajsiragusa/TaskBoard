import { Routes } from '@angular/router';
import { Project } from './components/project/project';
import { Issue } from './components/issue/issue';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    { path: 'login', component: Login },
    { path: 'issue', component: Issue },
    { path: 'project', component: Project }
];
