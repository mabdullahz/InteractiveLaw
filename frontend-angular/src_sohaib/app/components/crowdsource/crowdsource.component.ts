import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
import {FlashMessagesService} from 'angular2-flash-messages';
declare var getcomment : any;
declare var displayon : any;


@Component({
  selector: 'app-crowdsource',
  templateUrl: './crowdsource.component.html',
  styleUrls: ['./crowdsource.component.css']
})
export class CrowdsourceComponent implements OnInit {

  badword:any;
  lang:any;
  articlenumber:any;
  searchquery:any;
  article:any;
  nonumber:any;
  meaning:any;
  word:any;
  comment:any;
  commentlist:any;
  user:any;
  articletext:any;


  constructor( private authservice: AuthService, private flashMessage:FlashMessagesService, private router:Router,private simplePageScrollService: SimplePageScrollService) { }
  username: String;
  date : String;

  ngOnInit() {
  this.lang="english";
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
  this.searchquery = event.target.value;
  }

  clicked(){
  this.router.navigate(['/search',this.searchquery]);
  }


onEnterSearch(){
  
this.router.navigate(['/search',this.searchquery]);

}




  search_articlenumber(event){

  var query = event.target.value
  this.articlenumber = Number(query.match(/\d+/)[0])
  
  this.authservice.get_articlebynumber(this.articlenumber).subscribe(res=>{

var check = res.found;
if(check){
this.article=res.article[0]
this.articletext = this.article.text.split("\n")
this.simplePageScrollService.scrollToElement("#article",0)
console.log(this.article)
} else{
	
	this.nonumber=true;
}
  
  })
 
  }

meaningclicked(){

  this.authservice.checkmeaning(this.word).subscribe(data=>{

  if(data.check){
  this.meaning = data.meaning
  }else{
  this.meaning="NO SEARCH FOUND";
  }
  })

  }
  searchformeaning(event){
  this.word = event.target.value
  }

  commentclicked(){

this.authservice.checkbadword(this.comment).subscribe(data=>{
  
  if(data.badword){
  this.badword= true;
  } else{
  this.badword= false;
    const comment = {
    username: this.user.username,
    contrib : this.comment,
    date : new Date().toLocaleDateString(),
    language: this.lang,
    number: this.articlenumber
    
  }
  
  this.article.crowdsource.push(comment)
  this.authservice.addcomment(comment).subscribe(data=>{
    })
  this.comment =""

  }
})


  }


   onEnter(){ 
   this.authservice.checkmeaning(this.word).subscribe(data=>{

  if(data.check){
  this.meaning = data.meaning
  }else{
  this.meaning="NO SEARCH FOUND";
  }
  }) 

   }


   onEnterCS(){
this.simplePageScrollService.scrollToElement("#article",0) 
  
}


}
