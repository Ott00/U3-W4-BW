import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { Faq } from '../models/faq';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postApi: string = environment.postApi;
  commentApi: string = environment.commentApi;
  userApi: string = environment.userApi;
  emailApi: string = environment.emailApi;
  risposteApi: string = environment.risposteApi;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postApi);
  }

  getUsers() {
    return this.http.get<User[]>(this.userApi);
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
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentApi}`, comment);
  }

  //PER ASSISTENZA
  sendEmail(email: Email) {
    console.log(email);
    return this.http.post<Email>(`${this.emailApi}`, email);
  }

  getAssistance() {
    return this.http.get<Faq[]>(this.emailApi);
  }

  removeEmail(emailId: number) {
    return this.http.delete(`${this.emailApi}/${emailId}`);
  }

  sendAnswer(email: Faq) {
    return this.http.post<Email>(`${this.risposteApi}`, email);
  }

  changeCompl(email: Partial<Email>, emailId: number): Observable<Email> {
    return this.http.patch<Email>(`${this.emailApi}/${emailId}`, email);
  }
}
