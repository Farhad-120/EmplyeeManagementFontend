
//import { Component } from '@angular/core';
//import { DataServicesService } from '../../services/data-services.service';
//import { AttendanceSummary } from '../../models/attendance-summary';


//@Component({
//  selector: 'app-attendance-report',
//  templateUrl: './attendance-report.component.html',
//  styleUrls: ['./attendance-report.component.css']
//})
//export class AttendanceReportComponent {

//  // Start and End date for report
//  start: string = '';
//  end: string = '';

//  // Attendance summary list
//  summaries: AttendanceSummary[] = [];

//  constructor(private dataService: DataServicesService) { }

//  // Fetch attendance summary report
//  fetchReport() {
//    if (!this.start || !this.end) {
//      alert('Please select both start and end dates!');
//      return;
//    }

//    this.dataService.getAttendance(this.start, this.end)
//      .subscribe({
//        next: (res: AttendanceSummary[]) => {
//          this.summaries = res;
//        },
//        error: (err) => {
//          console.error('Error fetching attendance report', err);
//          alert('Error fetching report: ' + err.message);
//        }
//      });
//  }

//  // Optional: Add attendance records in bulk
//  addAttendance(records: any[]) {
//    if (!records || !records.length) {
//      alert('No attendance records to add');
//      return;
//    }

//    this.dataService.addAttendanceBulk(records)
//      .subscribe({
//        next: () => alert('Attendance records added successfully!'),
//        error: (err) => {
//          console.error('Error adding attendance', err);
//          alert('Error adding attendance: ' + err.message);
//        }
//      });
//  }
//}


import { Component } from '@angular/core';
import { DataServicesService } from '../../services/data-services.service';
import { AttendanceSummary } from '../../models/attendance-summary';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent {


  start: string = '';
  end: string = '';


  summaries: AttendanceSummary[] = [];

  constructor(private dataService: DataServicesService) { }


  fetchReport() {
    if (!this.start || !this.end) {
      alert('Please select both start and end dates!');
      return;
    }

    this.dataService.getAttendance(this.start, this.end)
      .subscribe({
        next: (res: AttendanceSummary[]) => {
          this.summaries = res;
        },
        error: (err) => {
          console.error('Error fetching attendance report', err);
          alert('Error fetching report: ' + err.message);
        }
      });
  }

  // Download attendance report as PDF
  downloadPDF() {
    // Check if data is available
    if (!this.summaries || this.summaries.length === 0) {
      alert('No data available to generate PDF');
      return;
    }


    const doc = new jsPDF();


    doc.setFontSize(18);
    doc.text('Employee Attendance Report', 14, 22);


    doc.setFontSize(12);
    doc.text(`From: ${this.start}  To: ${this.end}`, 14, 30);

    const columns = ["Employee", "Department", "Present", "Absent"];
    const rows = this.summaries.map(s => [
      s.employeeName,
      s.departmentName,
      s.presentCount,
      s.absentCount
    ]);

    
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      styles: { fontSize: 11, cellPadding: 5 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: 'center' },
      bodyStyles: { halign: 'center' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 }
    });


    doc.save('attendance-report.pdf');
  }



  addAttendance(records: any[]) {
    if (!records || !records.length) {
      alert('No attendance records to add');
      return;
    }

    this.dataService.addAttendanceBulk(records)
      .subscribe({
        next: () => alert('Attendance records added successfully!'),
        error: (err) => {
          console.error('Error adding attendance', err);
          alert('Error adding attendance: ' + err.message);
        }
      });
  }
}

