import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
declare var displayon : any;
declare var displayoff : any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
wrongword:any;
article:String;
word:any;
meaning:String;
articlelist:any;
noarticle:any;
articletoshow:any;
  constructor( private router:Router,private authService:AuthService,private location: Location, private route:ActivatedRoute, private simplePageScrollService: SimplePageScrollService) { }

 

  ngOnInit() {
  //displayoff();

  this.simplePageScrollService.scrollToElement("#about",0)
  this.article = this.route.snapshot.params['id']
  //console.log(this.article)
  this.authService.send_searchquery(this.article).subscribe(data=> {

  if(data.searched){
  console.log("SEARCH ME  AYA")
  this.noarticle=false;
  this.articlelist = data.articleslist
  //this.articlelist[0].text = this.articlelist[0].text.split("\n")
  this.articlelist.map(art => art.text = art.text.split("\n"))

  }else{
  this.noarticle = true;
  this.articlelist=false;
  this.articletoshow=false;
  this.simplePageScrollService.scrollToElement("#about",0)
  }
})
   //


 

  }

  show(event) :void{
  console.log("AYAA")
  const num = event.target.id;
  this.articletoshow = this.articlelist.filter(art => art.number==num)[0]

//displayon();
  //display()
  this.simplePageScrollService.scrollToElement("#articledetail",10)}


search(event){
  this.article = event.target.value;
  console.log("Search");
  console.log(this.article)
  
  }






  clicked(){
  console.log(this.article)
  this.authService.send_searchquery(this.article).subscribe(data=> {
  if(data.searched){
  console.log("IF ME AGYA BHAII JAAAN")
  this.noarticle=false;
  this.articlelist = data.articleslist
  //this.router.navigate(['/search',this.article])
  this.articlelist.map(art => art.text = art.text.split("\n"))
  this.simplePageScrollService.scrollToElement("#about",0)
  }else{
  console.log("ELSE ME AGYA BHAII JAAAN")
this.noarticle = true;
this.articlelist=false;
this.articletoshow=false;
  this.simplePageScrollService.scrollToElement("#about",0)
  }
  
  })
   

  }   


onEnterSearch()
{
  console.log(this.article)
  this.authService.send_searchquery(this.article).subscribe(data=> {
  if(data.searched){
  this.noarticle=false;
  this.articlelist = data.articleslist
  //this.router.navigate(['/search',this.article])
  this.articlelist.map(art => art.text = art.text.split("\n"))
  this.simplePageScrollService.scrollToElement("#about",0)
  }else{
this.noarticle = true;
this.articlelist=false;
this.articletoshow=false;
  this.simplePageScrollService.scrollToElement("#about",0)
  }
  
  })
   //this.router.navigate(['/search',this.article]);
// window.location.reload();

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

  onEnter(){ 
   this.authService.checkmeaning(this.word).subscribe(data=>{

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


  okpressed(){
  this.word=false; 
  }

  tagclick(event){

  
  this.authService.send_searchquery(event.target.id).subscribe(data=> {
  if(data.searched){
  console.log("IF ME AGYA BHAII JAAAN")
  this.noarticle=false;
  this.articlelist = data.articleslist
  //this.router.navigate(['/search',this.article])
  this.articlelist.map(art => art.text = art.text.split("\n"))
  this.simplePageScrollService.scrollToElement("#about",0)
  }else{
  console.log("ELSE ME AGYA BHAII JAAAN")
this.noarticle = true;
this.articlelist=false;
this.articletoshow=false;
  this.simplePageScrollService.scrollToElement("#about",0)
  }
  
  })

  }
}
