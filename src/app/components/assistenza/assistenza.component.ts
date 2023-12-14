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
  userEmail!: string;

  constructor(private postSrv: PostsService) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const helpMe = JSON.parse(user);
      this.userId = helpMe.user.id;
      this.userEmail = helpMe.user.email;
      console.log(this.userId);
      console.log(this.userEmail);
    }
  }

  sendEmail(form: NgForm) {
    this.newEmail.userId = this.userId;
    this.newEmail.userEmail = this.userEmail;
    this.newEmail.corpo = form.value.corpo;
    this.newEmail.destinatario = form.value.destinatario;
    this.newEmail.oggetto = form.value.oggetto;
    console.log(this.newEmail);

    this.postSrv.sendEmail(this.newEmail).subscribe(
      (response) => {
        console.log('Email inviata con successo', response);
        form.resetForm();
      },
      (error) => {
        console.error("Errore nell'invio dell'email:", error);
      }
    );
    console.log(form.value);
  }
}
