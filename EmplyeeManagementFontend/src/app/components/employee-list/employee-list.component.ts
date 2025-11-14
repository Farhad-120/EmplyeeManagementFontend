//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-employee-list',
//  templateUrl: './employee-list.component.html',
//  styleUrls: ['./employee-list.component.css']
//})
//export class EmployeeListComponent {

//}
//import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

//@Component({
//  selector: 'app-employee-list',
//  templateUrl: './employee-list.component.html',
//  styleUrls: ['./employee-list.component.css']
//})
//export class EmployeeListComponent implements OnInit {

//  employees: any[] = [];   // Employee list data
//  loading: boolean = false; // Loader
//  errorMessage: string = ''; // Error message

//  constructor(private http: HttpClient) { }

//  ngOnInit(): void {
//    this.loadEmployees();
//  }

//  // Load Employees from API
//  loadEmployees() {
//    this.loading = true;
//    this.http.get<any[]>('http://localhost:5084/api/Employees')
//      .subscribe({
//        next: (res) => {
//          this.employees = res;
//          this.loading = false;
//        },
//        error: (err) => {
//          this.errorMessage = 'Failed to load employees!';
//          console.error('Error:', err);
//          this.loading = false;
//        }
//      });
//  }
//}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];           // সব employee list
  filteredEmployees: any[] = [];   // filter হওয়ার পর list
  pagedEmployees: any[] = [];      // current page এর data

  loading: boolean = false;        // loader state
  errorMessage: string = '';       // error message

  pageIndex: number = 0;           // current page
  pageSize: number = 5;            // প্রতি পেজে ৫টা রেকর্ড

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // API থেকে employees load করা
  loadEmployees() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:5084/api/Employees')
      .subscribe({
        next: (res) => {
          this.employees = res;
          this.filteredEmployees = res;
          this.updatePagedEmployees();
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load employees!';
          console.error('Error:', err);
          this.loading = false;
        }
      });
  }

  // Search filter apply করা
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredEmployees = this.employees.filter(e =>
      e.name.toLowerCase().includes(filterValue) ||
      e.departmentName.toLowerCase().includes(filterValue)
    );

    this.pageIndex = 0; // search করলে প্রথম পেজে যাবে
    this.updatePagedEmployees();
  }

  // Pagination data update করা
  updatePagedEmployees() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEmployees = this.filteredEmployees.slice(start, end);
  }

  // Next page এ যাওয়া
  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.filteredEmployees.length) {
      this.pageIndex++;
      this.updatePagedEmployees();
    }
  }

  // Previous page এ যাওয়া
  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePagedEmployees();
    }
  }

  // Helper getter for end count
  get endCount(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.filteredEmployees.length);
  }
}

