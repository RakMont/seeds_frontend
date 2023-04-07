import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from "./core/services/auth.service";
import {MenuService} from "./core/services/menu.service";

interface IMenu {
  text: string;
  icon: string;
  routerLink?: string;
  children?: IMenu[];
}
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
@Component({
  selector: 'sml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = 'semillasui';
  logged = false;
  events: string[] = [];
  menuList: IMenu[];
  loadingMenuList = true;
  constructor(
    private oauthService: AuthService,
    private  translateService: TranslateService,
    private menuS: MenuService,
    private observer: BreakpointObserver) {
    translateService.addLangs(['en','es']);
    translateService.setDefaultLang('es');
  }

  switchLang(lang: string){
    this.translateService.use(lang);
  }
  ngAfterViewInit(): void {
    this.logged = this.isLogged;
    if (this.isLogged){
      this.getMenu();
    }

  }
  ngOnInit(): void {
    this.logged = this.isLogged;
     if (this.isLogged){
       this.getMenu();
     }
  }
  get isLogged(): boolean{
    return this.oauthService.isLoggedIn();
    return false;
  }

  getMenu(){
    this.menuS.getMenu().subscribe((data)=>{
      this.menuList=data;
      this.loadingMenuList = false;
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    })
  }
}
