import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Email } from 'src/app/models/email';
import { NgForm } from '@angular/forms';
import { Faq } from 'src/app/models/faq';

@Component({
  selector: 'app-assistenza',
  templateUrl: './assistenza.component.html',
  styleUrls: ['./assistenza.component.scss'],
})
export class AssistenzaComponent implements OnInit {
  newEmail: Email = {
    oggetto: '',
    corpo: '',
    userId: 0,
    userEmail: '',
    completed: false,
  };

  newAnswer: Faq = {
    oggetto: '',
    corpo: '',
    userId: 0,
    userEmail: '',
    emailId: 0,
    completed: false,
  };

  userId!: number;
  userEmail!: string;

  emails: Faq[] = [];

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
    this.getFaqs();
    console.log(this.emails);
  }

  sendEmail(form: NgForm) {
    this.newEmail.userId = this.userId;
    this.newEmail.userEmail = this.userEmail;
    this.newEmail.corpo = form.value.corpo;
    this.newEmail.oggetto = form.value.oggetto;
    this.newEmail.completed = false;
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

  //ADMIN

  getFaqs() {
    this.postSrv.getAssistance().subscribe((emails: Faq[]) => {
      this.emails = emails;
      console.log(this.emails);
    });
  }

  // removeEmail(emailId: any) {
  //   this.postSrv.removeEmail(emailId).subscribe(() => {
  //     console.log('email rimossa!');
  //     this.getFaqs();
  //   });
  // }
  // removeEmail(email: Email) {
  //   this.emailsDone.push(email);
  // }

  sendAnswer(form: NgForm, emailId: any) {
    this.newAnswer.userId = this.userId;
    this.newAnswer.userEmail = this.userEmail;
    this.newAnswer.corpo = form.value.corpo;
    this.newAnswer.oggetto = form.value.oggetto;
    this.newAnswer.emailId = emailId;

    console.log(emailId);
    console.log(form);

    console.log(this.newAnswer);

    this.postSrv.sendAnswer(this.newAnswer).subscribe(
      (response) => {
        console.log('Risposta inviata con successo', response);
        form.resetForm();
      },
      (error) => {
        console.error("Errore nell'invio dell'email:", error);
      }
    );
    console.log(form.value);
  }

  changeStatus(email: Email, emailId: any) {
    const partialFaq: Partial<Email> = { completed: true };
    this.postSrv.changeCompl(partialFaq, emailId).subscribe(() => {
      email.completed = true;
    });

    this.getFaqs();
  }
}
