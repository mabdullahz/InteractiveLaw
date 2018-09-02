import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {SimplePageScrollService} from 'ng2-simple-page-scroll';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-finsearch',
  templateUrl: './finsearch.component.html',
  styleUrls: ['./finsearch.component.css']
})
export class FinsearchComponent implements OnInit {
  articles:any;
  checkdata(x){

    if(x==""||x==undefined){
    
      return false;
    }
    return true;
    
    }

  removeDuplicates(arr){
      let unique_array = []
      for(let i = 0;i < arr.length; i++){
          if(unique_array.indexOf(arr[i]) == -1){
              unique_array.push(arr[i])
          }
      }
      return unique_array
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
num:any;

  constructor(private flashMessage:FlashMessagesService, private router:Router,private authService:AuthService,private location: Location, private route:ActivatedRoute, private simplePageScrollService: SimplePageScrollService) { }

  ngOnInit(){
    this.alldates=[];
    this.allcat=[];
    this.articletoshow=[];
    this.num=[1,2,3,4,5,6]
    this.simplePageScrollService.scrollToElement("#contain",10)

  this.articlelist = this.authService.getfilteredarticles();
  if(!this.articlelist.length){

    console.log("ERROR")
    this.flashMessage.show("PLEASE MODIFY YOUR SEARCH",{cssClass: 'alert-danger', timeout:3000})
    return;
  }
  console.log("SERVICE se aya")
  console.log(this.articlelist);
  this.articles = this.articlelist;
  for (var i of this.articles){
    this.alldates.push(i.lastmodified);
    for (var c of i.category){
      this.allcat.push(c);
    } 
  }
  this.allcat = this.removeDuplicates(this.allcat);
  this.alldates = this.removeDuplicates(this.alldates);

  if(!this.articles){
    this.noarticle=true;
  }else{
    console.log("yehan ayaaa")
    console.log(this.articles);
    //this.articles.map(art => art.text = art.text.split("\n"))
    this.noarticle=false;
  }
  
  
  }

  filterData(event){
    var element = <HTMLInputElement> document.getElementById(event.target.id);
    console.log("Checkedsss")
    if(element.checked){
      console.log("Checked : " + event.target.id)
      this.articles = this.articlelist.filter(x=>x.lastmodified==event.target.id);
    }
    

    var textinputs = document.querySelectorAll('input[name=date]'); 
var empty = [].filter.call( textinputs, function( el ) {
   return !el.checked
});

if (textinputs.length == empty.length){
    this.articles = this.articlelist  
}
  }


  filterDatacrwd(event){
    var element = <HTMLInputElement> document.getElementById(event.target.id);
    console.log("Checkedsss")
    
    if(element.checked){
      console.log("Checked : " + event.target.id)
      var temparticles = this.articlelist;
      for(var a of temparticles){
        if(a.crowdsource.length){
          var newcrowdsource = a.crowdsource.filter(c => c.language.toLowerCase == event.target.id.toLowerCase);
          console.log(newcrowdsource)
          a.crowdsource = newcrowdsource;
        }
      }
      this.articles = temparticles;
      // this.articles = this.articlelist.filter(x=>x.lastmodified==event.target.id);
    }
    
    var textinputs = document.querySelectorAll('input[name=crowd]'); 
var empty = [].filter.call( textinputs, function( el ) {
   return !el.checked
});

if (textinputs.length == empty.length){
    this.articles = this.articlelist  
}
  }


  filterDatacat(event){
    var element = <HTMLInputElement> document.getElementById(event.target.id);
    console.log("Checkedssss")
    if(element.checked){
      console.log("Checked : " + event.target.id)
      this.articles = this.articlelist.filter(x=> x.category.indexOf(event.target.id)!=-1);
    }var textinputs = document.querySelectorAll('input[name=cat]'); 
    var empty = [].filter.call( textinputs, function( el ) {
       return !el.checked
    });
    
    if (textinputs.length == empty.length) {
        this.articles = this.articlelist
        
    }
  }


  show(event) :void{
    console.log("AYAA")
    const num = event.target.id;
    this.articletoshow = this.articlelist.filter(art => art.number==num)[0]
    console.log(this.articletoshow);
    this.authService.setarticletoshow(this.articletoshow);
    this.router.navigate(['showarticle'])
  }
    
  
  //displayon();
    //display()
    //this.simplePageScrollService.scrollToElement("#articledetail",10)}



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
        this.noarticle=false;
        this.articlelist = data.articleslist
        //this.router.navigate(['/search',this.article])
        // for (var art of this.articlelist){
        //   art.text = art.text.split("\n");
        // }
        this.simplePageScrollService.scrollToElement("#aside",0)
        }else{
        console.log("ELSE ME AGYA BHAII JAAAN")
      
      this.articlelist=false;
      this.articles=false;
      this.articletoshow=false;
        this.simplePageScrollService.scrollToElement("#aside",0)
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
      this.articlelist = data.articleslist;
      this.authService.savefilteredarticles(this.articlelist);
      this.alldates = []
      this.allcat = []
      for (var i of this.articlelist){
        this.alldates.push(i.lastmodified);
        for (var c of i.category){
          this.allcat.push(c);
        } 
      }
      this.allcat = this.removeDuplicates(this.allcat);
      this.alldates = this.removeDuplicates(this.alldates);
      
      this.articles = this.articlelist;
      //this.articles.map(art => art.text = art.text.split("\n"))
    
      
      }else{
        this.flashMessage.show("PLEASE MODIFY YOUR SEARCH",{cssClass: 'alert-danger', timeout:3000})
        this.authService.savefilteredarticles([]);
        this.articles=[];
        this.articlelist=[];
        this.alldates = []
      this.allcat = []
       
      console.log("ELSE ME AGYA BHAII JAAAN")
      //this.simplePageScrollService.scrollToElement("#about",0)
      }
      
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
          this.authService.send_searchquery(searchedquery).subscribe(data=> {
          if(data.searched){
          this.articlelist = data.articleslist;
          this.authService.savefilteredarticles(this.articlelist);
          this.alldates = []
          this.allcat = []
          for (var i of this.articlelist){
            this.alldates.push(i.lastmodified);
            for (var c of i.category){
              this.allcat.push(c);
            } 
          }
          this.allcat = this.removeDuplicates(this.allcat);
          this.alldates = this.removeDuplicates(this.alldates);
          
          this.articles = this.articlelist;
          //this.articles.map(art => art.text = art.text.split("\n"))
        
          
          }else{
            this.flashMessage.show("PLEASE MODIFY YOUR SEARCH",{cssClass: 'alert-danger', timeout:3000})
            this.authService.savefilteredarticles([]);
            this.articles=[];
            this.articlelist=[];
            this.alldates = []
          this.allcat = []
           
          console.log("ELSE ME AGYA BHAII JAAAN")
          //this.simplePageScrollService.scrollToElement("#about",0)
          }
          
          })
           
        
        
          }

}
