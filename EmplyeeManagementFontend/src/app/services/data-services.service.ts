import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataServicesService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/employees`);
  }


  Post(emp: any) {
    return this.http.post(`${this.base}/employees`, emp);
  }

  getAttendance(start: string, end: string) {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<any[]>(`${this.base}/attendance`, { params });
  }

  addAttendanceBulk(payload: any) {
    return this.http.post(`${this.base}/attendance`, payload);
  }
}

//import { HttpClient, HttpParams } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs';

//// Employee interface
//export interface Employee {
//  employeeId: number;
//  name: string;
//}

//// Attendance record interface
//export interface AttendanceRecord {
//  employeeID: number;
//  attendanceDate: string;
//  status: 'Present' | 'Absent';
//}

//@Injectable({
//  providedIn: 'root'
//})
//export class DataServicesService {
//  private baseUrl = environment.apiUrl; // API base URL

//  constructor(private http: HttpClient) { }

//  // ================= Employees =================

//  getEmployees(): Observable<Employee[]> {
//    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
//  }

//  addEmployee(emp: { name: string, departmentId?: number, joinDate?: string, salary?: number }): Observable<any> {
//    return this.http.post(`${this.baseUrl}/employees`, emp);
//  }

//  // ================= Attendance =================

//  // Get attendance summary by date range
//  getAttendance(start: string, end: string): Observable<AttendanceRecord[]> {
//    const params = new HttpParams()
//      .set('start', start)
//      .set('end', end);
//    return this.http.get<AttendanceRecord[]>(`${this.baseUrl}/attendance`, { params });
//  }

//  // Add attendance for multiple employees
//  addAttendanceBulk(payload: AttendanceRecord[]): Observable<any> {
//    return this.http.post(`${this.baseUrl}/attendance`, payload);
//  }
//}


