import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userId: number | null = null;

  posts: Post[] = [];
  users: User[] = [];
  usersArr: User[] = [];

  constructor(private postSrv: PostsService, private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const actUser = user.user;

      this.userId = actUser.id;
    }

    this.getPosts();
    this.getUsers();
  }

  getPosts() {
    this.postSrv.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts);
      this.shufflePosts();
    });
  }

  getUsers() {
    this.postSrv.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
      this.usersArr = users;
      this.usersArr.shift();
      this.shuffleUser();
    });
  }

  changePage(id: number) {
    this.router.navigate([`/details/${id}`]);
  }

  removePost(postId: number) {
    this.postSrv.removePost(postId).subscribe(() => {
      console.log('Post rimosso!');
      this.getPosts();
    });
  }

  //SHUFFLE

  shuffleUser() {
    this.usersArr = this.usersArr.sort(() => Math.random() - 0.5);
  }

  shufflePosts() {
    this.posts = this.posts.sort(() => Math.random() - 0.5);
  }
}
