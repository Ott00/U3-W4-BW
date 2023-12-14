import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { PopupNotificationService } from 'src/app/services/popup-notification.service';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss'],
})
export class BackOfficeComponent implements OnInit {
  postForm!: FormGroup;

  constructor(
    private postSrv: PostsService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(PopupNotificationService) private alertSrv: PopupNotificationService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      console.log(user);
      this.postForm = this.fb.group({
        userId: user.user.id,
        title: this.fb.control(null),
        body: this.fb.control(null),
      });
    }
  }

  addPost() {
    console.log(this.postForm.value.title);
    console.log(this.postForm.value.body);

    if (this.postForm.value.title && this.postForm.value.body) {
      this.postSrv.setPost(this.postForm.value).subscribe(() => {
        console.log('Nuovo post aggiunto!');
        this.alertSrv.toastNotificationSuccess('Post creato!');
        this.router.navigate(['/']);
      });
    } else {
      this.alertSrv.toastNotificationError('Nessun post è stato creato');
    }
  }
}
