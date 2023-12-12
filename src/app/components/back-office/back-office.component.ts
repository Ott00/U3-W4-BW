import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {

  postForm!: FormGroup

  constructor(private postSrv: PostsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user')
    
    if (userData) {
      const user = JSON.parse(userData)
      console.log(user);
      this.postForm = this.fb.group({
        userId: user.user.id,
        title: this.fb.control(null),
        body: this.fb.control(null)
      })
    }
  }

  addPost(){
    console.log(this.postForm.value);
    this.postSrv.setPost(this.postForm.value).subscribe(()=>{
      console.log('Nuovo post aggiunto!');
      this.router.navigate(['/'])
    })
  }



}
