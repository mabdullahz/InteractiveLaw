import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent implements OnInit {


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
 



  constructor( private router:Router,private authService:AuthService,private location: Location, private route:ActivatedRoute, private simplePageScrollService: SimplePageScrollService) { }

 

  ngOnInit() {

  //displayoff();
  console.log("IDHR SEARCH ME AYA"); 
  //this.flag = [false, false, false, false, false];

  
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
  this.authService.send_searchquery(searchedquery).subscribe(data=> {
  if(data.searched){
  
  this.flag=[false,false,false,false,false];
  this.articlelist = data.articleslist;
  this.authService.savefilteredarticles(this.articlelist);
  this.router.navigate(['finsearch']);

  
  }else{
  console.log("ELSE ME AGYA BHAII JAAAN")
  //this.simplePageScrollService.scrollToElement("#about",0)
  }
  
  })
   


  }
}

