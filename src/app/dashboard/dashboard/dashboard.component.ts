import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserFormComponent } from '../shared/user-form/user-form.component';
import * as XLSX from 'xlsx';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentDetails = {
    firstName: null

  }
  displayedColumns: string[] = ['srNo', 'firstName', 'lastName', 'gender', 'dob', 'mobileNo', 'hobbies', 'address', 'age', 'education', 'totalMarks', 'obtainedMarks', 'percentage', 'action'];
  dataSource = new MatTableDataSource();
  fileName = 'ExcelSheet.xlsx';


  constructor(private dashboardService: DashboardService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getStudents();


  }

  exportexcel(): void {

    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);


  }
  getStudents() {
    this.dashboardService.getStudents().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  userInfo(studentDetails) {
    if (studentDetails) {
      const editStudent = this.dialog.open(UserFormComponent, {
        data: studentDetails
      });
      editStudent.afterClosed().subscribe(result => {

        this.getStudents()
      });

      console.log("i can edit student");

    }
    else {
      const createStudent = this.dialog.open(UserFormComponent, {

      });
      createStudent.afterClosed().subscribe(result => {

        this.getStudents()
      });
      console.log("i can add new student");

    }
  }
  onClickOfRemoveStudent(studentId) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashboardService.removeStudent(studentId).subscribe(res => {

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getStudents();
        })

      }
    })



  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
