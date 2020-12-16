import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserFormComponent } from '../shared/user-form/user-form.component';


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
  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();

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
