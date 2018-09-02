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

  checkdata(x){

    if(x==""||x==undefined){
    
      return false;
    }
    return true;
    
    }
articlename:any;
articlenumber:any;
chaptername:any;
chapternumber:any;
keyword:any;
articlelist:any;
 flag:any

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

    var artn,chpn,keyw;
    let myarray = [this.keyword,this.chaptername,this.chapternumber,this.articlename,this.articlenumber]
    this.flag = myarray.map(x => this.checkdata(x));
    if(this.keyword!=undefined && this.keyword!=""){
      keyw = this.keyword.split(" ");
    }
    if(this.articlename!=undefined && this.articlename!=""){
      artn = this.articlename.split(" ");
    }
    if(this.chaptername!=undefined && this.chaptername!=""){
      chpn = this.chaptername.split(" ");
    }
    
     const searchedquery = {
     articlename:artn,
     articlenumber:this.articlenumber,
     chaptername:chpn,
     chapternumber:this.chapternumber,
     keyword:keyw,
     flag: this.flag
     }
    
     console.log(searchedquery)
      this.authservice.send_searchquery(searchedquery).subscribe(data=> {
      if(data.searched){
      this.flag=[false,false,false,false,false];
      this.articlelist = data.articleslist;
      console.log("HOME");
      console.log(this.articlelist)
      this.authservice.savefilteredarticles(this.articlelist);
      
    
      
      }else{
      console.log("ELSE ME AGYA BHAII JAAAN")
      //this.simplePageScrollService.scrollToElement("#about",0)
      this.authservice.savefilteredarticles([]);
      }
      this.router.navigate(['finsearch']);
      })
      }


 


onEnterSearch(){

  var artn,chpn,keyw;
  let myarray = [this.keyword,this.chaptername,this.chapternumber,this.articlename,this.articlenumber]
  this.flag = myarray.map(x => this.checkdata(x));
  if(this.keyword!=undefined && this.keyword!=""){
    keyw = this.keyword.split(" ");
  }
  if(this.articlename!=undefined && this.articlename!=""){
    artn = this.articlename.split(" ");
  }
  if(this.chaptername!=undefined && this.chaptername!=""){
    chpn = this.chaptername.split(" ");
  }
  
   const searchedquery = {
   articlename:artn,
   articlenumber:this.articlenumber,
   chaptername:chpn,
   chapternumber:this.chapternumber,
   keyword:keyw,
   flag: this.flag
   }
  
   
   console.log(searchedquery)
    this.authservice.send_searchquery(searchedquery).subscribe(data=> {
    if(data.searched){
    this.flag=[false,false,false,false,false];
    this.articlelist = data.articleslist;
    this.authservice.savefilteredarticles(this.articlelist);
    this.router.navigate(['finsearch']);
  
    
    }else{
    console.log("ELSE ME AGYA BHAII JAAAN")
    //this.simplePageScrollService.scrollToElement("#about",0)
    this.authservice.savefilteredarticles([]);
    this.router.navigate(['finsearch']);
    }
    
    })
     
  
  
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
