import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import { PostsService } from '../posts.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: any = [];
  sub1: Subscription;
  sub2: Subscription;
  name;
  animal;


  constructor(private postsService: PostsService,
              private http: HttpClient,
              private dialog: MatDialog) { }
  id:number;
  private headers = new Headers({'Content-Type': 'application/json'});
  empArray:Array<number> = [];

  ngOnInit() {
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  pushToObj = function(obj) {
      this.postsService.objToChange.EmpID = obj.EmpID;
      this.postsService.objToChange.Name = obj.Name;
      this.postsService.objToChange.Address = obj.Address;
      this.postsService.objToChange.PhoneNumber = obj.PhoneNumber;
      this.postsService.objToChange.Email = obj.Email;
  }

  refreshObj = function() {
    this.postsService.objToChange.EmpID = 0;
    this.postsService.objToChange.Name = '';
    this.postsService.objToChange.Address = '';
    this.postsService.objToChange.PhoneNumber = '';
    this.postsService.objToChange.Email = '';
  }

  toggleBg = function() {
    document.getElementById('check').classList.toggle('fa-check');
    // this.childNodes[0].classList.toggle('fas fa-check');
  }

  checkEmployee = function(id, event) {
    if(event.target.checked){
      this.empArray.push(id);
      console.log(this.empArray);
    } else {
      this.empArray.splice(this.empArray.indexOf(id), 1);
      console.log(this.empArray);
    }
    // console.log(this.empArray);
    // console.log(id, event.target.checked);
  }

  deleteEmployeeGroup = function(){
    if(confirm("Are you sure?")){
      for(let i=0; i<this.empArray.length; i++) {
        // const url = `${"http://localhost:4600/routes/employees"}/${this.empArray[i]}`;
        this.sub1 = this.http.delete(`${"http://localhost:4600/routes/employees"}/${this.empArray[i]}`, {responseType: 'text'}, {headers: this.headers}).toPromise()
        .then(() => {
          this.postsService.getAllPosts().subscribe(posts => {
            this.posts = posts;
          });
        });
      }
    }
    this.empArray = [];
  }


  deleteEmployee = function(id){
    if(confirm("Are you sure?")){
      const url = `${"http://localhost:4600/routes/employees"}/${id}`;
      return this.http.delete(url, {responseType: 'text'}, {headers: this.headers}).toPromise()
      .then(() => {
        this.sub2 = this.postsService.getAllPosts().subscribe(posts => {
          this.posts = posts;
        });
      }).catch(e => console.log(e));
    }
  }

  findEmployees = function(obj, posts){
    var count;

    do {
      count = 1;
      for(let i=0; i<posts.length; i++){
        if(posts[i].Name !== obj.name || posts[i].PhoneNumber !== obj.phoneNumber){
          console.log(posts[i]);
          posts.splice(i, 1);
          count++;
        }
      }
    }while(count > 1)

    console.log(posts);
    return posts;
  }


  ngOnDestroy(): void {

  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'post-modal.components.html',
})
export class PostModalComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    // this.dialogRef.close();
  }
}
