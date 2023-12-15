import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { Faq } from '../models/faq';
import { UserBan } from '../models/user-ban';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postApi: string = environment.postApi;
  commentApi: string = environment.commentApi;
  userApi: string = environment.userApi;
  emailApi: string = environment.emailApi;
  banUser: string = environment.banApi;

  constructor(private http: HttpClient) {}
  removeUser(userId: number): Observable<void> {
    const url = `${this.userApi}/${userId}`;
    return this.http.delete<void>(url);
  }
  setUserBan(data: { email: string }) {
    return this.http.post<UserBan>(` ${this.banUser}`, data);
  }

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

  removeComment(commentId: number) {
    return this.http.delete(`${this.commentApi}/${commentId}`);
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
}
