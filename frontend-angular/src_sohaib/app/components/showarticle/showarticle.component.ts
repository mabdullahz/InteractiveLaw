import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-showarticle',
  templateUrl: './showarticle.component.html',
  styleUrls: ['./showarticle.component.css']
})
export class ShowarticleComponent implements OnInit {


 
  articles:any;
  checkdata(x){

    if(x==""||x==undefined){
    
      return false;
    }
    return true;
    
    }


alldates:any
allcat:any;
allcategories:any;
meaning:any;
filter:any;
articlename:any;
articlenumber:any;
chaptername:any;
chapternumber:any;
keyword:any;
articlelist:any;
articletoshow:any;
wrongword:any;
noarticle:any;
word:any;
flag:any;
arttt:any;
  constructor(private flashMessage:FlashMessagesService, private router:Router,private authService:AuthService,private location: Location, private route:ActivatedRoute, private simplePageScrollService: SimplePageScrollService) { }

  ngOnInit() {
    this.simplePageScrollService.scrollToElement("#articledetail",1);
  this.arttt = this.authService.getarticletoshow();
  if(!(this.arttt.text instanceof Array))
      {this.arttt.text =  this.arttt.text.split("\n")}
    console.log(this.arttt)
    this.articletoshow = this.arttt;
    this.arttt= [];
    //console.log(this.articletoshow);
  }

    searchformeaning(event){
      this.word = event.target.value
      }

      onEnter(){ 
        this.authService.checkmeaning(this.word).subscribe(data=>{
       if(data.check){
       this.meaning = data.meaning
       }else{
       this.meaning="NO SEARCH FOUND";
       }
       }) 
     
        }

  meaningclicked(){

    this.authService.checkmeaning(this.word).subscribe(data=>{
  
    if(data.check){
    this.meaning = data.meaning
    this.wrongword=false;
    }else{
    this.meaning="NO SEARCH FOUND";
  
  
    }
  
    })
  
    }
    goback(){
      this.router.navigate(['finsearch'])
    }


    tagclick(event){

      const searchedquery = {
        articlename:undefined,
        articlenumber:undefined,
        chaptername:undefined,
        chapternumber:undefined,
        keyword:event.target.id.split(" "),
        flag: [true,false,false,false,false]
        }

      this.authService.send_searchquery(searchedquery).subscribe(data=> {
      if(data.searched){
      console.log("IF ME AGYA BHAII JAAAN")
      this.articlelist = data.articleslist
      this.authService.savefilteredarticles(this.articlelist);
      this.router.navigate(['finsearch'])
      
      }else{
      console.log("ELSE ME AGYA BHAII JAAAN")
    
      this.authService.savefilteredarticles([]);
      //this.simplePageScrollService.scrollToElement("#aside",0)
      }
      
      })
    
      }



}
