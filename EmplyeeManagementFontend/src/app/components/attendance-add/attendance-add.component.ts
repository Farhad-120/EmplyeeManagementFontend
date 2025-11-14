
//import { Component, OnInit } from '@angular/core';
//import { DataServicesService } from '../../services/data-services.service';
//import { AttendanceRecord } from '../../models/attendance-record';
//import { employee } from '../../models/employee';

//@Component({
//  selector: 'app-attendance-add',
//  templateUrl: './attendance-add.component.html',
//  styleUrls: ['./attendance-add.component.css']
//})
//export class AttendanceAddComponent implements OnInit {
//  date: string = '';
//  employees: employee[] = [];
//  attendanceStatus: { [empId: number]: 'Present' | 'Absent' | null } = {};

//  constructor(private dataService: DataServicesService) { }

//  ngOnInit(): void {
//    this.loadEmployees();
//  }

//  loadEmployees() {
//    this.dataService.getEmployees().subscribe({
//      next: (res) => {
//        this.employees = res;
//        this.employees.forEach(emp => {
//          this.attendanceStatus[emp.employeeId] = null;
//        });
//      },
//      error: (err) => console.error('Error loading employees:', err)
//    });
//  }

//  setStatus(empId: number, status: 'Present' | 'Absent') {
//    this.attendanceStatus[empId] = status;
//  }

//  getStatus(empId: number) {
//    return this.attendanceStatus[empId];
//  }

//  submit() {
//    if (!this.date) {
//      alert('Please select a date!');
//      return;
//    }

//    //const attendanceArray: AttendanceRecord[] = this.employees.map(emp => ({
//    //  employeeID: emp.employeeId,
//    //  attendanceDate: this.date,
//    //  status: this.attendanceStatus[emp.employeeId] || 'Absent'
//    //}));
//    const attendanceArray: AttendanceRecord[] = this.employees.map(emp => ({
//      EmployeeID: emp.employeeId,       // match DTO
//      AttendanceDate: this.date,        // yyyy-MM-dd string
//      Status: this.attendanceStatus[emp.employeeId] || 'Absent'
//    }));


//    console.log('Payload sending:', attendanceArray);

//    this.dataService.addAttendanceBulk(attendanceArray).subscribe({
//      next: () => {
//        alert('Attendance saved successfully!');
//        this.employees.forEach(emp => {
//          this.attendanceStatus[emp.employeeId] = null;
//        });
//        this.date = '';
//      },
//      error: (err) => {
//        console.error('Error saving attendance:', err);
//        console.error('Payload sending:', attendanceArray);
//        alert('Error saving attendance: ' + (err.message || err));
//      }
//    });
//  }
//}


import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../../services/data-services.service';
import { AttendanceRecord } from '../../models/attendance-record';
import { employee } from '../../models/employee';


@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.css']
})
export class AttendanceAddComponent implements OnInit {
  date: string = '';
  employees: employee[] = [];
  attendanceStatus: { [empId: number]: 'Present' | 'Absent' | null } = {};

  constructor(private dataService: DataServicesService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Load all employees
  loadEmployees() {
    this.dataService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        // Initialize attendanceStatus for each employee
        this.employees.forEach(emp => {
          this.attendanceStatus[emp.employeeId] = null;
        });
      },
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  // Set attendance status
  setStatus(empId: number, status: 'Present' | 'Absent') {
    this.attendanceStatus[empId] = status;
  }

  // Get attendance status
  getStatus(empId: number) {
    return this.attendanceStatus[empId];
  }


  submit() {
    if (!this.date) {
      alert('Please select a date!');
      return;
    }

    const attendanceArray: AttendanceRecord[] = this.employees.map(emp => ({
      EmployeeId: emp.employeeId,
      AttendanceDate: this.date,
       Status: this.attendanceStatus[emp.employeeId] || 'Absent'
    }));


    console.log('Payload sending:', attendanceArray);


    this.dataService.addAttendanceBulk(attendanceArray).subscribe({
      next: () => {
        alert('Attendance saved successfully!');

        this.employees.forEach(emp => {
          this.attendanceStatus[emp.employeeId] = null;
        });
        this.date = '';
      },
      error: (err) => {
        console.error('Error saving attendance:', err);
        console.error('Payload sending:', attendanceArray);
        alert('Error saving attendance: ' + (err.message || err));
      }
    });
  }
}





