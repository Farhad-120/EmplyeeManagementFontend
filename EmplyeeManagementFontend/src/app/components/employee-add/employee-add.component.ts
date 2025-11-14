
//import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

//@Component({
//  selector: 'app-employee-add',
//  templateUrl: './employee-add.component.html',
//  styleUrls: ['./employee-add.component.css']
//})
//export class EmployeeAddComponent implements OnInit {

//  model = {
//    name: '',
//    departmentID: null,
//    joinDate: '',
//    salary: null
//  };

  
//  departments: any[] = [];

//  constructor(private http: HttpClient) { }

//  ngOnInit(): void {
//    this.loadDepartments();
//  }


//  loadDepartments() {
//    this.http.get<any[]>('http://localhost:5084/api/Departments')
//      .subscribe({
//        next: (res) => {
//          this.departments = res;
//        },
//        error: (err) => {
//          console.error('Error loading departments', err);
//        }
//      });
//  }


//  Post() {
//    this.http.post('http://localhost:5084/api/Employees', this.model)
//      .subscribe({
//        next: (res) => {
//          alert(' Employee Added Successfully!');
//          this.model = { name: '', departmentID: null, joinDate: '', salary: null }; // reset form
//        },
//        error: (err) => {
//          console.error(' Error adding employee', err);
//          alert('Something went wrong while adding employee!');
//        }
//      });
//  }
//}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  // Employee Model
  model = {
    name: '',
    departmentId: null, // backend DTO এর সাথে match
    joinDate: '',
    salary: null
  };

  // Department list
  departments: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  // Load Department list from API
  loadDepartments() {
    this.http.get<any[]>('http://localhost:5084/api/Departments')
      .subscribe({
        next: (res) => {
          this.departments = res;
        },
        error: (err) => {
          console.error('Error loading departments', err);
        }
      });
  }

  // Add Employee
  add() {
    if (!this.model.name || !this.model.departmentId || !this.model.joinDate || !this.model.salary) {
      alert('Please fill all required fields!');
      return;
    }

    this.http.post('http://localhost:5084/api/Employees', this.model)
      .subscribe({
        next: () => {
          alert('Employee Added Successfully!');
          // reset form
          this.model = { name: '', departmentId: null, joinDate: '', salary: null };
        },
        error: (err) => {
          console.error('Error adding employee', err);
          alert('Something went wrong!');
        }
      });
  }

}
