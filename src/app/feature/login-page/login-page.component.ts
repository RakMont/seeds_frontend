import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LogInComponent} from "./log-in/log-in.component";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loggedIn = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    //private tokenService: TokenService,
    //private oauthService: OauthService,
  ) { }

  ngOnInit(): void {
  }
  signInWithGoogle(): void {
    const dialogConfig =  this.dialog.open(LogInComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
    });
    dialogConfig.afterClosed().subscribe(result => {
    });
  }
  logOut(): void {

  }
}
