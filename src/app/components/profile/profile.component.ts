import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
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
  postEdit: Post[] = [];
  comments: Comment[] = []
  commentPost: Comment[] = []


  postFocus: boolean = false;

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
    this.getComments()
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

  addValue(form: NgForm, postId: number, e: Event) {
    this.postEdit = this.postsProf.filter(
      (element: Post) => element.id === postId
    );
    const Obj = {
      title: this.postEdit[0].title,
      body: this.postEdit[0].body,
    };
    form.form.setValue(Obj);
    console.log(Obj);

    //Logica per colorare il post selezionato e il corrispettivo form di modifica
    this.postFocus = !this.postFocus;
    const btn = e.currentTarget as HTMLAnchorElement;
    const card = btn.parentElement?.parentElement?.parentElement;

    if (this.postFocus) {
      card?.classList.add('card-focus');
    } else {
      card?.classList.remove('card-focus');
    }
  }

  editPost(form: NgForm, postId: number) {
    console.log(form.value);
    console.log(postId);
    this.postSrv.editPost(form.value, postId).subscribe(() => {
      console.log('Post modificato');
      this.getPosts();
    });
  }

  getComments(){
    this.postSrv.getComments().subscribe((comment: Comment[] )=> {
      this.comments = comment
      console.log(this.comments);
      this.commentPost = (this.comments.filter((element: Comment) => element.email === this.userEmail))
      console.log(this.commentPost);
    })
  }
}
