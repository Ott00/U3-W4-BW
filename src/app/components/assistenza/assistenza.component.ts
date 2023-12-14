import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Email } from 'src/app/models/email';
import { NgForm } from '@angular/forms';
import { Faq } from 'src/app/models/faq';
import { PopupNotificationService } from 'src/app/services/popup-notification.service';

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
  };
  userId!: number;
  userEmail!: string;

  emails: Faq[] = [];

  constructor(
    private postSrv: PostsService,
    private alertSrv: PopupNotificationService
  ) {}
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
  }

  sendEmail(form: NgForm) {
    this.newEmail.userId = this.userId;
    this.newEmail.userEmail = this.userEmail;
    this.newEmail.corpo = form.value.corpo;
    this.newEmail.oggetto = form.value.oggetto;
    console.log(this.newEmail);

    this.postSrv.sendEmail(this.newEmail).subscribe(
      (response) => {
        if (this.newEmail.corpo && this.newEmail.oggetto) {
          this.alertSrv.toastNotificationSuccess(
            'Feedback inviato correttamente!'
          );
          console.log('Email inviata con successo', response);
          form.resetForm();
        } else {
          if (!this.newEmail.corpo)
            this.alertSrv.toastNotificationError(
              'Non è presente il corpo della segnalazione'
            );
          if (!this.newEmail.oggetto) {
            this.alertSrv.toastNotificationError(
              "Non è presente l'oggetto della segnalazione"
            );
          }
        }
      },
      (error) => {
        this.alertSrv.toastNotificationError(
          "Errore durante l'invio del feedback!"
        );
        console.error("Errore nell'invio dell'email:", error);
      }
    );
    console.log(form.value);
  }

  getFaqs() {
    this.postSrv.getAssistance().subscribe((emails: Faq[]) => {
      this.emails = emails;
      console.log(this.emails);
    });
  }

  removeEmail(emailId: number) {
    this.postSrv.removeEmail(emailId).subscribe(() => {
      console.log('email rimossa!');
      this.getFaqs();
    });
  }
}
