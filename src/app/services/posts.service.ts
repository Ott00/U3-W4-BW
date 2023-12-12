import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postApi: string = environment.postApi;
  commentApi: string = environment.commentApi

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postApi);
  }

  getComments(){
    return this.http.get<Comment[]>(this.commentApi);
  }
}
