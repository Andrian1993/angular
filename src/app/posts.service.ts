import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  objToChange:object = {
    "EmpID": 0,
    "Name": "",
    "Address": "",
    "PhoneNumber": "",
    "Email": ""
  };
  constructor(private http: HttpClient) { }
  getAllPosts(){
    return this.http.get('/routes').pipe(map((posts) => {
      return posts;
    })
  )
  }
}
