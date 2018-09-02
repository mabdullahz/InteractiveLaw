import { Component, OnInit } from '@angular/core';
import { scrollTo } from 'ng2-utils';
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'


@Component({
  selector: 'app-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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



  article:String
  constructor(private router:Router, private authservice: AuthService) { }

  ngOnInit() {
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
      this.authservice.setarticletoshow([]);
      
    
      
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

  
  

}
