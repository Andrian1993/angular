import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent, PostModalComponent } from './posts/posts.component';
import { EmployeeComponent } from './employee/employee.component';


const Routes = [

  {
      path: '',
      redirectTo: 'posts',
      pathMatch: 'full'
  },
  {
      path: 'posts', component: PostsComponent
  },
  {
      path: 'posts/employee', component: EmployeeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    EmployeeComponent,
    PostModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PostModalComponent]
})
export class AppModule { }
