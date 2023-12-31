import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'U3-W4-BW';
  constructor(private authSrv: AuthService) {}

  ngOnInit() {
    this.authSrv.restore();
  }
}
