import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './feature/home-page/home.component';
import {PublicActivitiesComponent} from './feature/public-activities/public-activities.component';
import {LoginPageComponent} from './feature/login-page/login-page.component';
import {SeedFormPageComponent} from './feature/seed-form-page/seed-form-page.component';
import {ListVolunteersComponent} from "./feature/volunteer-manage/list-volunteers/list-volunteers.component";
import {ListSeedsComponent} from "./feature/seeds-manage/list-seeds/list-seeds.component";
import {LoginGuardGuard} from "./core/guards/login-guard.guard";
import {
  ListSeedsApplicantsComponent
} from "./feature/seeds-manage/list-seeds-applicants/list-seeds-applicants.component";
import {NewSeedFromVolunteerComponent} from "./feature/seeds-manage/new-seed-from-volunteer/new-seed-from-volunteer.component";
import {ManageDonationsComponent} from "./feature/tracking/manage-donations/manage-donations.component";
import {ManageTrackingComponent} from "./feature/tracking/manage-tracking/manage-tracking.component";
import {
  ManageVolunterTrackingSeedsComponent
} from "./feature/tracking/manage-volunter-tracking-seeds/manage-volunter-tracking-seeds.component";
import {
  ManageSouvenirTrackingComponent
} from "./feature/souvenirs/manage-souvenir-tracking/manage-souvenir-tracking.component";
import {ManageActivitiesComponent} from "./feature/public-activities/manage-activities/manage-activities.component";

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
    //canActivate: [LoginGuardGuard]
  },
  {
    path: 'admin/semillas',
    component: ListSeedsComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'admin/aplicantes',
    component: ListSeedsApplicantsComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'admin/new-seed',
    component: NewSeedFromVolunteerComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'admin/tracking',
    component: ManageTrackingComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'admin/tracking/volunteer-seeds',
    component: ManageVolunterTrackingSeedsComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path:'admin/tracking/donations',
    component: ManageDonationsComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path:'admin/souvenirs/benefited-seeds',
    component: ManageSouvenirTrackingComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path:'admin/activities/manage-activities',
    component: ManageActivitiesComponent,
    data :{ actions:'canTakeActions'},
    canActivate: [LoginGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
