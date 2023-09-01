import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic' ;
import { CKEditorModule } from 'ng2-ckeditor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
/* Material */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import {CdkStepperModule, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './feature/home-page/home.component';
import { PublicActivitiesComponent } from './feature/public-activities/public-activities.component';
import { LoginPageComponent } from './feature/login-page/login-page.component';
import { SeedFormPageComponent } from './feature/seed-form-page/seed-form-page.component';
import { LogInComponent } from './feature/login-page/log-in/log-in.component';
import { PersonalInfoComponent } from './shared/seed-form/personal-info/personal-info.component';
import { ConstantDonationComponent } from './shared/seed-form/constant-donation/constant-donation.component';
import { UniqueDonationComponent } from './shared/seed-form/unique-donation/unique-donation.component';
import { NewSeedFormComponent } from './shared/seed-form/new-seed-form/new-seed-form.component';
import { MessageSnackBarComponent } from './shared/message-snack-bar/message-snack-bar.component';
import { SentDataMessageComponent } from './shared/seed-form/sent-data-message/sent-data-message.component';
import { GenericTableComponent } from './shared/generic-table/generic-table.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { ListVolunteersComponent } from './feature/volunteer-manage/list-volunteers/list-volunteers.component';
import { VolunterDialogComponent } from './feature/volunteer-manage/volunter-dialog/volunter-dialog.component';
import { VolunterDetailsComponent } from './feature/volunteer-manage/volunter-details/volunter-details.component';
import { ExitElementComponent } from './shared/exit-element/exit-element.component';
import { ListSeedsComponent } from './feature/seeds-manage/list-seeds/list-seeds.component';
import { ModalProcessSeedComponent } from './feature/seeds-manage/modal-process-seed/modal-process-seed.component';
import { ModalViewSeedComponent } from './feature/seeds-manage/modal-view-seed/modal-view-seed.component';
import {authInterceptorProviders} from "./core/interceptors/auth.interceptor";
import {EncodeHttpParamsInterceptor} from "./core/interceptors/encoder.interceptor";
import { ListSeedsApplicantsComponent } from './feature/seeds-manage/list-seeds-applicants/list-seeds-applicants.component';
import { CarouselComponent } from './feature/home-page/carousel/carousel.component';
import { DuplicateDirective } from './core/directives/duplicate.directive';
import { TitleBannerComponent } from './shared/title-banner/title-banner.component';
import { NewSeedFromVolunteerComponent } from './feature/seeds-manage/new-seed-from-volunteer/new-seed-from-volunteer.component';
import { ManageTrackingComponent } from './feature/tracking/manage-tracking/manage-tracking.component';
import { ListTrackingSeedsComponent } from './feature/tracking/list-tracking-seeds/list-tracking-seeds.component';
import { ManageDonationsComponent } from './feature/tracking/manage-donations/manage-donations.component';
import { ListSeedDonationsComponent } from './feature/tracking/list-seed-donations/list-seed-donations.component';
import { AsignSeedVolunteerComponent } from './feature/tracking/manage-tracking/asign-seed-volunteer/asign-seed-volunteer.component';
import { ModalDonationComponent } from './feature/tracking/manage-donations/modal-donation/modal-donation.component';
import { ViewDonationComponent } from './feature/tracking/manage-donations/view-donation/view-donation.component';
import { LogedVolunteerInfoComponent } from './feature/volunteer-manage/loged-volunteer-info/loged-volunteer-info.component';
import { ModalEditSeedComponent } from './feature/seeds-manage/modal-edit-seed/modal-edit-seed.component';
import { ModalUnactiveSeedComponent } from './feature/seeds-manage/modal-unactive-seed/modal-unactive-seed.component';
import { UpdatePasswordComponent } from './feature/volunteer-manage/update-password/update-password.component';
import { EnterpriseDonationComponent } from './shared/seed-form/enterprise-donation/enterprise-donation.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PublicActivitiesComponent,
    LoginPageComponent,
    SeedFormPageComponent,
    LogInComponent,
    PersonalInfoComponent,
    ConstantDonationComponent,
    UniqueDonationComponent,
    NewSeedFormComponent,
    MessageSnackBarComponent,
    SentDataMessageComponent,
    GenericTableComponent,
    SidebarComponent,
    ListVolunteersComponent,
    VolunterDialogComponent,
    VolunterDetailsComponent,
    ExitElementComponent,
    ListSeedsComponent,
    ModalProcessSeedComponent,
    ModalViewSeedComponent,
    ListSeedsApplicantsComponent,
    CarouselComponent,
    DuplicateDirective,
    TitleBannerComponent,
    NewSeedFromVolunteerComponent,
    ManageTrackingComponent,
    ListTrackingSeedsComponent,
    ManageDonationsComponent,
    ListSeedDonationsComponent,
    AsignSeedVolunteerComponent,
    ModalDonationComponent,
    ViewDonationComponent,
    LogedVolunteerInfoComponent,
    ModalEditSeedComponent,
    ModalUnactiveSeedComponent,
    UpdatePasswordComponent,
    EnterpriseDonationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTreeModule,
    MatToolbarModule,
    //  MatCarouselModule.forRoot(),
    CdkAccordionModule,
    HttpClientModule,
    MatAutocompleteModule,
    CdkStepperModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    CKEditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
     },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncodeHttpParamsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
