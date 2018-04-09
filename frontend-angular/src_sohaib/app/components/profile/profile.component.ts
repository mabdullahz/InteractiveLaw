import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages';
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:any;
article:any;
status:any;
  constructor(private authservice:AuthService,
  private router : Router,
  private flashMessage:FlashMessagesService, private simplePageScrollService:SimplePageScrollService, private http:Http) { }

  ngOnInit() {
  this.authservice.getProfile().subscribe(profile=>{ 
console.log("profile")
console.log(profile.user)
  this.user = profile.user; 

  },err=>{

  console.log(err)
  return false;
  })
  }

search(event){
  this.article = event.target.value;
  }

  clicked(){
  //console.log(this.article)
  this.router.navigate(['/search',this.article]);
  //window.location.reload();
}


onEnterSearch(){
this.router.navigate(['/search',this.article]);
}


  onLogoutClick(){
    this.authservice.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

  clickedonstatus(){
let headers = new Headers();
  headers.append('Content-Type','application/json');
  this.simplePageScrollService.scrollToElement("#status",0)
  console.log(this.user.status)
  console.log("clicked me aya")

  this.authservice.updatestatus(this.user).subscribe(data=>{

  console.log("dataaaa")
  console.log(data)
  })
  //this.http.post('http://localhost:4000/users/setstatus',this.user,{headers:headers}).map(res=>res.json())


  }

  statuswritten(event){
  
this.user.status = event.target.value;


  }


clickedonphoto(){
  
  let element= <HTMLInputElement>document.getElementById('choosefile')
  element.click();

}

}
