import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent  } from "./login/login.component";
import {DashboardComponent  } from "./dashboard/dashboard.component";
import { AttendanceRegisterComponent } from './attendance-register/attendance-register.component';
import { TabularViewComponent } from './tabular-view/tabular-view.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'attendance',
    component: AttendanceRegisterComponent,
  },
  {
    path: 'tabular',
    component: TabularViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
