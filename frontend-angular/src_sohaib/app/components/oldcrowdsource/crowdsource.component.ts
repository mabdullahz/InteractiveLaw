import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
declare var getcomment : any;
declare var displayon : any;


@Component({
  selector: 'app-crowdsource',
  templateUrl: './crowdsource.component.html',
  styleUrls: ['./crowdsource.component.css']
})
export class CrowdsourceComponent implements OnInit {


  articlenumber:any;
  searchquery:any;
  article:any;
  nonumber:any;
  meaning:any;
  word:any;
  comment:any;
  commentlist:any;


  constructor( private authservice: AuthService, private router:Router,private simplePageScrollService: SimplePageScrollService) { }

  ngOnInit() {
this.commentlist = ["This article is related to pakistan republic terrioties in provinces"]
  }

  search(event){
  this.searchquery = event.target.value;
  }

  clicked(){
  //console.log(this.article)
  this.router.navigate(['/search',this.searchquery]);
  }

  search_articlenumber(event){

  var query = event.target.value
  this.articlenumber = Number(query.match(/\d+/)[0])
  
  this.authservice.get_articlebynumber(this.articlenumber).subscribe(res=>{

var check = res.found;
if(check){
this.article=res.article[0]
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

  if(this.comment){
  	this.commentlist.unshift(this.comment)
  	this.comment=""
  }
  }


  

  

}
