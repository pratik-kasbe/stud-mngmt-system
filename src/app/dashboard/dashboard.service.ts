import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
url='http://localhost:3000/students/';
  constructor(private httpClient:HttpClient) {}
   getStudents(){
     return this.httpClient.get(this.url)
   }
   removeStudent(studentId){
return this.httpClient.delete(this.url+studentId)
   }
   createStudent(studentInfo){
     return this.httpClient.post(this.url,studentInfo)
   }
   updateStudent(studentDetails,studentId){
     return this.httpClient.put(this.url+studentId,studentDetails)
   }
}
