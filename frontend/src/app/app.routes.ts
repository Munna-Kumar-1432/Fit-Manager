import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { MembersComponent } from './pages/members/members';
import { TrainersComponent } from './pages/trainers/trainers';
import { MembershipComponent } from './pages/membership/membership';
import { AnalyticsComponent } from './pages/analytics/analytics';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'members', component: MembersComponent },
    { path: 'trainers', component: TrainersComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: '**', redirectTo: 'home' }
];
