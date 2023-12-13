import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  post: Post | undefined;
  id!: number;
  posts: Post[] = [];
  comments: Comment[] = [];
  commentPost: Comment[] = [];
  newComment: Comment = { postId: 0, id: 0, name: '', email: '', body: '' };
  email!: string;

  constructor(private postSrv: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.takeId();
    this.getPostDetail();
    this.getComments();
    this.getEmailFromLocalStorage();
  }

  getPostDetail() {
    this.postSrv.getPosts().subscribe((post: Post[]) => {
      this.posts = post;
      this.post = this.posts.find((element) => element.id === this.id);
    });
  }

  getComments() {
    this.postSrv.getComments().subscribe((comment: Comment[]) => {
      this.comments = comment;
      this.commentPost = this.comments.filter(
        (element: Comment) => element.postId === this.id
      );
    });
  }

  takeId() {
    this.route.params.subscribe((parm) => {
      this.id = +parm['id'];
    });
  }
  getEmailFromLocalStorage() {
    const storedEmail = localStorage.getItem('user');
    if (storedEmail) {
      const mail = JSON.parse(storedEmail);
      this.email = mail.user.email;
    }
    console.log(this.email);
  }

  addComment(form: NgForm) {
    this.newComment.postId = this.id;
    this.newComment.email = this.email;
    this.postSrv.addComment(this.newComment).subscribe((comment) => {
      this.commentPost.push(comment);
      this.newComment = form.value;
    });
    console.log(this.newComment);
  }
}
