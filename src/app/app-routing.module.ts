import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './feature/home/home.component';
import {PublicActivitiesComponent} from './feature/public-activities/public-activities.component';
import {LoginPageComponent} from './feature/login-page/login-page.component';
import {SeedFormPageComponent} from './feature/seed-form-page/seed-form-page.component';
import {ListVolunteersComponent} from "./feature/volunteer-manage/list-volunteers/list-volunteers.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'actividades-organizacion', component: PublicActivitiesComponent
  },
  {
    path: 'login-volunteer', component: LoginPageComponent
  },
  {
    path: 'quiero-aportar', component: SeedFormPageComponent
  },
  {
    path: 'admin/ver-voluntarios',
    component: ListVolunteersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
