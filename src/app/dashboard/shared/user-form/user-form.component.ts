import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import Swal from 'sweetalert2'
import { DashboardService } from '../../dashboard.service';
import { StudentDetails } from '../models/students';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  studentDetails:StudentDetails;
  flag=false
educationalDetails=['10th','12th','Graduated','Post Graduated']
age:number;
formTitle:string
buttonName:string
  constructor( public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private dashboardService:DashboardService) {
this.studentDetails=new StudentDetails();

     }

  ngOnInit(): void {

    if(this.data)
    {
      this.formTitle="Edit Student Details"
      this.buttonName="Update"
      this.flag=true
      this.studentDetails=this.data
    }
    else{
      this.formTitle="Add Student Details";
      this.buttonName="Submit"
    }


  }
  onClickOfSubmit(){
    if(this.flag){

this.dashboardService.updateStudent(this.studentDetails,this.studentDetails.id).subscribe(res=>{
  console.log("student updated successfully");
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Student Details Updated Successfully',
    showConfirmButton: false,
    timer: 2000
  })
this.dialogRef.close()

})

    }
    else{
      this.dashboardService.createStudent(this.studentDetails).subscribe(res=>{
        console.log("student created successfully");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Student Details Added Successfully',
          showConfirmButton: false,
          timer: 2000
        })
this.dialogRef.close()
      })

    }
    console.log(this.studentDetails);


  }
  calculateAge(){
    const currentDate=new Date()
    console.log(currentDate);

    console.log(this.studentDetails.dob);
    console.log("i can calculate age");

    this.age=currentDate.getFullYear()-this.studentDetails.dob.getFullYear()
    this.studentDetails.age=this.age

    const month=currentDate.getMonth()- this.studentDetails.dob.getMonth()
    if(month<0||(month===0&&currentDate.getDate()<this.studentDetails.dob.getDate())){
      this.age--
    }
    return this.age
}

calculatePercentage(){
  this.studentDetails.percentage= (this.studentDetails.obtainedMarks/this.studentDetails.totalMarks)*100;
  console.log(this.studentDetails.percentage);

}


}
