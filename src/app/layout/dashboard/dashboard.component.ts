import { Post } from '../../model/Post';
import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';

import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  displayedColumns = ['date_posted', 'title', 'body', 'category', 'delete'];
  // NOTE: Get all datas from Post array by connect() through PostDataSource
  dataSource = new PostDataSource(this.dataService);

  ngOnInit() {
  }

  deletePost(id) {
    // NOTE: Check authenticate
    if (this.authService.isAuthenticated()) {
      // NOTE: Delete Post from Post array through id
      this.dataService.deletePost(id);
      // NOTE: Remove Post after delete it (Update talbe)
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert('Login in Before');
    }
  }

  openDialog(): void {
    // NOTE: Call Post Dialog Component
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '800px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe(result => {
      // NOTE: Get value from dialog and add data into array
      this.dataService.addPost(result.data);
      // NOTE: Show value on table after add new Post (Update table)
      this.dataSource = new PostDataSource(this.dataService);
    });
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {}
}
