import { Post } from '../model/Post';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  ELEMENT_DATA: Post[] = [
    {position: 0, title: 'Post One', category: 'Web Development', date_posted: new Date(), body: 'Body 1'},
    {position: 1, title: 'Post Two', category: 'Mobile Development', date_posted: new Date(), body: 'Body 2'},
    {position: 2, title: 'Post Three', category: 'Machine Learning Development', date_posted: new Date(), body: 'Body 3'},
    {position: 3, title: 'Post Four', category: 'Web Development', date_posted: new Date(), body: 'Body 4'},
    {position: 4, title: 'Post Five', category: 'Mobile Development', date_posted: new Date(), body: 'Body 5'},
    {position: 5, title: 'Post Six', category: 'Machine Learning Development', date_posted: new Date(), body: 'Body 6'},
    {position: 6, title: 'Post Seven', category: 'Desktop Development', date_posted: new Date(), body: 'Body 7'}
  ];

  Categories = [
    {value: 'Web Development', viewValue: 'Web Development'},
    {value: 'Mobile Development', viewValue: 'Mobile Development'},
    {value: 'Machine Learning Development', viewValue: 'Machine Learning Development'},
    {value: 'Desktop Development', viewValue: 'Desktop Development'}
  ];

  constructor() { }

  getData(): Observable<Post[]> {
    return of<Post[]>(this.ELEMENT_DATA);
  }

  getCategories() {
    return this.Categories;
  }

  // TODO: push new Post into last Post array
  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }

  // TODO: delete Post, base on index + 1
  deletePost(index) {
    this.ELEMENT_DATA = [
      ...this.ELEMENT_DATA.slice(0, index),
      ...this.ELEMENT_DATA.slice(index + 1)
    ];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }
}
