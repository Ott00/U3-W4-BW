import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postSrv: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postSrv.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }

  changePage(id: number) {
    this.router.navigate([`/details/${id}`]);
  }
}
