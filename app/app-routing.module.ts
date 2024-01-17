import { CardetailspageComponent } from './cardetailspage/cardetailspage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanDeactivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FootComponent } from './foot/foot.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CarservicepageComponent } from './carservicepage/carservicepage.component';
import { RoleGuard } from './guard/role.guard';
import { AddcarsComponent } from './addcars/addcars.component';
import { ListcarsComponent } from './listcars/listcars.component';
import { UpdatecarsdetailsComponent } from './updatecarsdetails/updatecarsdetails.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { RentalpageComponent } from './rentalpage/rentalpage.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { MyfavComponent } from './myfav/myfav.component';
import { CustomerfbComponent } from './customerfb/customerfb.component';
import { MybookingComponent } from './mybooking/mybooking.component';
import { BookingComponent } from './booking/booking.component';
import { DeactivateGuardService } from './guard/deactivate.guard.service';



const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'foot',component:FootComponent},
  {path:'footer',component:FooterComponent},
  {path:'header',component:HeaderComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'carservice',component:CarservicepageComponent,},
  {path:'addcars',component:AddcarsComponent,canActivate:[RoleGuard], data:{role:'admin'}},
  {path:'listcars',component:ListcarsComponent,canActivate:[RoleGuard], data:{role:'admin'}},
  {path:'cardetails/:productId',component:CardetailspageComponent},
  {path:'update/:productid',component:UpdatecarsdetailsComponent,canDeactivate:[DeactivateGuardService],canActivate:[RoleGuard], data:{role:'admin'}},
  {path:'newlandingpage/:query',component:LandingpageComponent},
  {path:'landingpage',component:LandingpageComponent},
  {path:'userdetails',component:UserdetailsComponent,canActivate:[RoleGuard], data:{role:'admin'}},
  {path:'rentalcar/:productid',component:RentalpageComponent},
  {path:'payment/:bookingid',component:PaymentpageComponent},
  {path:'thankyou',component:ThankyoupageComponent},
  {path:'myfav',component:MyfavComponent},
  {path:'fb',component:CustomerfbComponent},
  {path:'mybooking',component:MybookingComponent},
  {path:'booking',component:BookingComponent,canActivate:[RoleGuard], data:{role:'admin'}}


];

@NgModule
({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
