import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  //PER DATI CARD
  userId: number | null = null;
  userName: string | null = null;
  userSurname: string | null = null;
  userEmail: string | null = null;
  userImageProf: string | null = null;
  userCity: string | null = null;
  userUsername: string | null = null;
  userPhone: string | null = null;

  //PER POSTS
  postsProf: Post[] = [];

  constructor(private postSrv: PostsService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const actUser = user.user;

      this.userId = actUser.id;
      this.userName = actUser.name;
      this.userSurname = actUser.surname;
      this.userEmail = actUser.email;
      this.userImageProf = actUser.imageProf;
      this.userCity = actUser.city;
      this.userUsername = actUser.username;
      this.userPhone = actUser.phone;
    }

    this.getPosts();
  }

  getPosts() {
    this.postSrv.getPosts().subscribe((posts: Post[]) => {
      this.postsProf = posts;
      console.log(this.postsProf);
    });
  }

  removePost(postId: number) {
    this.postSrv.removePost(postId).subscribe(() => {
      console.log('Post rimosso!');
      this.getPosts();
    });
  }
}
