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
  posts: Post[] = [];
  users: User[] = [];

  constructor(private postSrv: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers()
  }

  getPosts() {
    this.postSrv.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }

  getUsers(){
    this.postSrv.getUsers().subscribe((users: User[]) =>{
      this.users = users
      console.log(this.users);
    })
  }

  changePage(id: number) {
    this.router.navigate([`/details/${id}`]);
  }
}
