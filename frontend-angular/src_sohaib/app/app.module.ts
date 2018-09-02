import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes} from "@angular/router";
import { AppComponent } from './app.component';
//import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from "./services/validate.service";
import { FlashMessagesModule } from 'angular2-flash-messages';
import {AuthService} from "./services/auth.service";
import {PopoverModule} from "ng2-popover";
import {AuthGuard} from "./guards/auth.guard";
    
import {NgsRevealModule} from 'ng-scrollreveal';

import { SearchComponent } from './components/search/search.component';

import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll';
import { Ng2ScrollableModule } from 'ng2-scrollable';
import { CrowdsourceComponent } from './components/crowdsource/crowdsource.component';

import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { FinsearchComponent } from './components/finsearch/finsearch.component';
import { ShowarticleComponent } from './components/showarticle/showarticle.component';

 




const appRoutes :Routes = [
{path:"" , component: HomeComponent},
{ path :'register',component:RegisterComponent},
{ path:'login', component : LoginComponent},
{path:'search/:id', component : SearchComponent},
{path:'crowdsource', component : CrowdsourceComponent},
{path:'profile', component : ProfileComponent },
{path: 'filter-search', component: FilterSearchComponent},
{path: 'finsearch', component: FinsearchComponent},
{path:'showarticle', component:ShowarticleComponent}

];


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegisterComponent,
    HomeComponent,
   
    ProfileComponent,
   
    SearchComponent,
    
    CrowdsourceComponent,
   
    FilterSearchComponent,
    FinsearchComponent,
    ShowarticleComponent,
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
