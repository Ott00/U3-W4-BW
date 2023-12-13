import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postApi: string = environment.postApi;
  commentApi: string = environment.commentApi;
  emailApi: string = environment.emailApi;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postApi);
  }

  removePost(postId: number) {
    return this.http.delete(`${this.postApi}/${postId}`);
  }

  getComments() {
    return this.http.get<Comment[]>(this.commentApi);
  }

  editPost(data: Partial<Post>, postId: number): Observable<Post> {
    console.log(data);
    return this.http.patch<Post>(`${this.postApi}/${postId}`, data);
  }

  setPost(data: { userId: number; title: string; body: string }) {
    return this.http.post<Post>(`${this.postApi}`, data);
  }
  inviaEmail(email: Email): Observable<any> {
    return this.http.post<Email>('http://localhost:4201/assistenza', email);
  }
}
