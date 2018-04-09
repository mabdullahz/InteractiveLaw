import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from "./services/validate.service";
import { FlashMessagesModule } from 'angular2-flash-messages';
import {AuthService} from "./services/auth.service";
import {PopoverModule} from "ng2-popover";
import {AuthGuard} from "./guards/auth.guard";
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import {NgsRevealModule} from 'ng-scrollreveal';
import { TourComponent } from './components/tour/tour.component';
import { SearchComponent } from './components/search/search.component';
import { TestComponent } from './components/test/test.component';
import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll';
import { Ng2ScrollableModule } from 'ng2-scrollable';
import { CrowdsourceComponent } from './components/crowdsource/crowdsource.component';
import { BrowseComponent } from './components/browse/browse.component';

 




const appRoutes :Routes = [
{path:"" , component: HomeComponent},
{ path :'register',component:RegisterComponent},
{ path:'login', component : LoginComponent},
{ path:'dashboard', component : DashboardComponent},

{path:'search/:id', component : SearchComponent},
{path:'crowdsource', component : CrowdsourceComponent},
{path:'profile', component : ProfileComponent },
{path:'tour', component : TourComponent },
{path: 'test', component: TestComponent},
{path: 'bookmarks',component:BookmarksComponent},
{path: 'browse',component: BrowseComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    BookmarksComponent,
    TourComponent,
    SearchComponent,
    TestComponent,
    CrowdsourceComponent,
    BrowseComponent,
    ],
  imports: [
    BrowserModule,
    Ng2ScrollableModule,
    FormsModule,
    HttpModule,
    Ng2SimplePageScrollModule.forRoot(),
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    NgsRevealModule.forRoot(),
    PopoverModule

  ],
  providers: [ValidateService,AuthService,AuthGuard,NgsRevealModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
