import { Component, Directive, OnInit, Inject } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { PopupNotificationService } from 'src/app/services/popup-notification.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // ID UTENTE URL
  id!: number;

  //PER DATI CARD
  userId: number | null = null;
  userName: string | null = null;
  userSurname: string | null = null;
  userEmail: string | null = null;
  userImageProf: string | null = null;
  userCity: string | null = null;
  userUsername: string | null = null;
  userPhone: string | null = null;
  nPost: number = 0;
  actUser!: User;

  //PER POSTS
  postsProf: Post[] = [];
  postsPageId: Post[] = [];
  postEdit: Post[] = [];
  comments: Comment[] = [];
  commentPost: Comment[] = [];
  users: User[] = [];
  user: User[] = [];

  postFocus: boolean = false;

  constructor(
    private postSrv: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PopupNotificationService) private alertSrv: PopupNotificationService
  ) {}

  ngOnInit(): void {
    this.takeId();

    if (this.id) {
      console.log(true);
      this.getUser();
    } else {
      console.log(false);
      const userString = localStorage.getItem('user');

      if (userString) {
        const user = JSON.parse(userString);
        this.actUser = user.user;

        this.userId = this.actUser.id;
        this.userName = this.actUser.name;
        this.userSurname = this.actUser.surname;
        this.userEmail = this.actUser.email;
        this.userImageProf = this.actUser.imageProf;
        this.userCity = this.actUser.city;
        this.userUsername = this.actUser.username;
        this.userPhone = this.actUser.phone;
      }
    }

    this.getPosts();
    this.getComments();
  }

  getPosts() {
    this.postSrv.getPosts().subscribe((posts: Post[]) => {
      this.postsProf = posts;

      if (this.user[0] == undefined) {
        this.postsPageId = this.postsProf.filter(
          (element: Post) => element.userId === this.actUser.id
        );
        this.nPost = this.postsPageId.length;
      } else {
        this.postsPageId = this.postsProf.filter(
          (element: Post) => element.userId === this.user[0].id
        );
        this.nPost = this.postsPageId.length;
      }

      console.log(this.postsProf);
      console.log(this.postsPageId);
      console.log(this.nPost);
    });
  }

  removePost(postId: number) {
    this.postSrv.removePost(postId).subscribe(() => {
      this.alertSrv.toastNotificationSuccess('Post rimosso');
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

  getComments() {
    this.postSrv.getComments().subscribe((comment: Comment[]) => {
      this.comments = comment;
      console.log(this.comments);
      this.commentPost = this.comments.filter(
        (element: Comment) => element.email === this.userEmail
      );
      console.log(this.commentPost);
    });
  }

  removeComment(commentId: any) {
    this.postSrv.removeComment(commentId).subscribe(() => {
      this.alertSrv.toastNotificationSuccess('Commento rimosso');
      console.log('Commento rimosso!');
      this.getComments();
    });
  }

  getUser() {
    this.postSrv.getUsers().subscribe((user: User[]) => {
      this.users = user;
      console.log(this.users);
      this.user = this.users.filter((element: User) => element.id === this.id);
      console.log(this.user);

      this.userId = this.user[0].id;
      this.userName = this.user[0].name;
      this.userSurname = this.user[0].surname;
      this.userEmail = this.user[0].email;
      this.userImageProf = this.user[0].imageProf;
      this.userCity = this.user[0].city;
      this.userUsername = this.user[0].username;
      this.userPhone = this.user[0].phone;
      const userString = localStorage.getItem('user');

      if (userString) {
        const user = JSON.parse(userString);
        this.actUser = user.user;
      }
    });
  }

  detailsPost(postId: number) {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.actUser = user.user;
    }
    console.log(this.actUser);
    console.log(this.user[0]);
    if (this.user[0] != undefined) {
      this.router.navigate([`/details/${postId}`]);
    }
  }

  takeId() {
    this.route.params.subscribe((parm) => {
      this.id = +parm['id'];
    });
  }
  removeProfile() {
    if (this.actUser.id === 1 || this.actUser) {
      const confirmDelete = confirm(
        'Sei sicuro di voler eliminare il profilo?'
      );

      if (confirmDelete) {
        if (this.user[0] !== null) {
          this.postSrv.removeUser(this.user[0].id).subscribe(() => {
            console.log('Profilo eliminato con successo');
            this.router.navigate(['/']);
          });
        } else {
          console.log('userId non è un numero valido.');
        }
      }
    } else {
      console.log('Non sei autorizzato a eliminare un profilo.');
    }
  }
}
