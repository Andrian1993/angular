import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: HttpClient,
              private postsService: PostsService,) { }
  employeeObj:object = {};
  showMessage:boolean = false;
  showSuccess:boolean = false;
  allertMessage:string = '';
  successMessage:string = '';

  addNewEmployee = function(employee) {
    let valid = employee.name !== '' && employee.address !== '';
    if(valid){
      this.employeeObj = {
        "EmpID": this.postsService.objToChange.EmpID,
        "Name": employee.name,
        "Address": employee.address,
        "PhoneNumber": employee.phoneNumber,
        "Email": employee.email
      }
      if(this.postsService.objToChange.EmpID) {
        return this.http.put("http://localhost:4600/routes/employees", this.employeeObj, {responseType: 'text'}).subscribe((res:Response) => {
          if(this.showMessage)
              this.showMessage = false;
          this.successMessage = 'Employee updated';
          this.showSuccess = true;
        })
      } else {
        return this.http.post("http://localhost:4600/routes/employees", this.employeeObj, {responseType: 'text'}).subscribe((res:Response) => {
          if(this.showMessage)
              this.showMessage = false;
          this.successMessage = 'Employee created';
          this.showSuccess = true;
        })
      }
    } else {
      if(this.showSuccess)
        this.showSuccess = false;
      this.allertMessage = 'Name and Address should be filled';
      this.showMessage = true;
    }


  }

  ngOnInit() {
  }

}
