import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})

export class PostDialogComponent implements OnInit {
  /*
   * @Author: vtdkhoa
   * @Date: 2018-12-29 17:04:18
   * First value:
   * - title, body, category: null
   * - position: 0
   * - date_posted: present date
   */
  blogPost = {title: '', body: '', category: '', position: 0, date_posted: new Date()};

  // NOTE: Get all categories to transmission into <mat-select>
  Categories = this.dataService.getCategories();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    // NOTE: Transmission data from dialog to dashboard through @Inject
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) { }

  ngOnInit() {
  }

  // TODO: close dialog
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.blogPost.position = this.dataService.dataLength();
    // NOTE: Transmission parameter data (data has value) through emit()
    this.event.emit({data: this.blogPost});
    // NOTE: After transmission data, close dialog
    this.dialogRef.close();
  }
}
