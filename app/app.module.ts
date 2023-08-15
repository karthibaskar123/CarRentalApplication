import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FootComponent } from './foot/foot.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CarservicepageComponent } from './carservicepage/carservicepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddcarsComponent } from './addcars/addcars.component';
import { ListcarsComponent } from './listcars/listcars.component';
import { UpdatecarsdetailsComponent } from './updatecarsdetails/updatecarsdetails.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardetailspageComponent } from './cardetailspage/cardetailspage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SeachfilterPipe } from './shared/seachfilter.pipe';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SearchPipe } from './pipes/search.pipe';
import { OfferPipe } from './pipes/offer.pipe';
import { RentalpageComponent } from './rentalpage/rentalpage.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { MyfavComponent } from './myfav/myfav.component';
import { CustomerfbComponent } from './customerfb/customerfb.component';
import { SearchComponent } from './search/search.component';
import { MybookingComponent } from './mybooking/mybooking.component';
import { BookingComponent } from './booking/booking.component';
import { DeactivateGuardService } from './guard/deactivate.guard.service';
import { ExceptioninterceptorInterceptor } from './exceptioninterceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FootComponent,
    AboutusComponent,
    ContactusComponent,
    CarservicepageComponent,
    AddcarsComponent,
    ListcarsComponent,
    UpdatecarsdetailsComponent,
    CardetailspageComponent,
    LandingpageComponent,
    SeachfilterPipe,
    UserdetailsComponent,
    SearchPipe,
    OfferPipe,
    RentalpageComponent,
    PaymentpageComponent,
    ThankyoupageComponent,
    MyfavComponent,
    CustomerfbComponent,
    SearchComponent,
    MybookingComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ExceptioninterceptorInterceptor,
      multi:true

    },


    DeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule implements Extracted { }
interface Extracted {}
