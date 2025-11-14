import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AttendanceAddComponent } from './components/attendance-add/attendance-add.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'nav', component: NavComponent },
  { path: 'EmployeeAddComponent', component: EmployeeAddComponent },
  { path: 'EmployeeListComponent', component: EmployeeListComponent },
  { path: 'AttendanceReportComponent', component: AttendanceReportComponent },
  { path: 'AttendanceAddComponent', component: AttendanceAddComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
