import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'sml-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() emitLen: EventEmitter<string> = new EventEmitter();
  @Input() inputSideNav: MatSidenav;
  showFiller = false;
  events: string[] = [];
  opened: boolean;
  panelOpenState = false;
  snav: MatSidenav;

  loggedIn: boolean = false;

  currentUser;
  loadingUser = true;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private oauthService: AuthService,
  ) { }


  display = false;
  // tslint:disable-next-line:typedef
  onPress() {
    this.display = !this.display;
  }

  logOut(): void {
    this.oauthService.logout();
    window.location.reload();
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.oauthService.getCurrentUser().subscribe((usr)=>{
      this.oauthService.setUser(usr);
      this.currentUser = usr;
      this.loadingUser = false;
      this.loggedIn = true;
    }, (error => {
      this.inputSideNav.close();
      this.currentUser = null;
      this.loadingUser = false;
      this.loggedIn = false;
    }));
  }
  refreshToken(): void {
  }

  changeLen(len: string){
    this.emitLen.emit(len);
  }
}
