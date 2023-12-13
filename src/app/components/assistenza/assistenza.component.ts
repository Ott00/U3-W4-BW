import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Email } from 'src/app/models/email';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assistenza',
  templateUrl: './assistenza.component.html',
  styleUrls: ['./assistenza.component.scss'],
})
export class AssistenzaComponent implements OnInit {
  newEmail: Email = {
    destinatario: '',
    oggetto: '',
    corpo: '',
    userId: 0,
    userEmail: '',
  };
  userId!: number;

  constructor(private postSrv: PostsService) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const helpMe = JSON.parse(user);
      this.userId = helpMe.user.id;
      console.log(this.userId);
    }
  }

  inviaEmail(form: NgForm) {
    this.newEmail.userId = this.userId;
    this.postSrv.inviaEmail(this.newEmail).subscribe(
      (response) => {
        console.log('Email inviata con successo', response);
        form.resetForm();
      },
      (error) => {
        console.error("Errore nell'invio dell'email:", error);
      }
    );
    console.log(form);
  }
}
