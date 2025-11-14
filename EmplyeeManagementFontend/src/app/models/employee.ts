export interface employee {
  employeeId: number;
  name: string;
  departmentId: number;
  joinDate: string;   // DateOnly এর জন্য string ব্যবহার করতে পারেন, বা Date
  salary: number;
  //attendances?: Attendance[];  // optional, যদি API এ আসে
  //department?: Department;     // optional, navigation property
}

//export interface Attendance {
//  attendanceId: number;
//  employeeId: number;
//  attendanceDate: string;
//  status: 'Present' | 'Absent';
//}

//export interface Department {
//  departmentId: number;
//  departmentName: string;
//}

