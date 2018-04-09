import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service'
import {SimplePageScrollService} from 'ng2-simple-page-scroll';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
categoryclicked:any;
numofammendclicked:any;
langclicked:any;
artnumclicked:any;
languages:any;


meaning:any;
wrongword:any;
word:any;

allarticles:any;
filteredarticles:any;
articletoshow:any;


categories:any;
searchquery:any;

  constructor(private router:Router, private authservice: AuthService,private simplePageScrollService: SimplePageScrollService) { }

  ngOnInit(){
  let art = this.authservice.getsavedarticles()
  if(!art.length){
  console.log("IF ME AYA")
  this.authservice.getarticles().subscribe(data=>{
  this.authservice.savearticles(data.articles);
  this.allarticles = data.articles;
  this.allarticles.map(art => art.text = art.text.split("\n"))


})


}else{
console.log("ELSE ME AYA")
  this.allarticles=this.authservice.getsavedarticles()

}


  
  this.categories = ["human rights","obedience to constitution","equality","civil rights","discrimination","religion","labour","punishment","state definition","freedom","property rights","objectives resolution","education","treason"]
  this.languages = ["Urdu","English","Roman Urdu","Other"]
  }
  search(event){
  this.searchquery = event.target.value;
  }

 show(event) :void{
  console.log("AYAA")
  const num = event.target.id;
  this.articletoshow = this.allarticles.filter(art => art.number==num)[0]

//displayon();
  //display()//
  this.simplePageScrollService.scrollToElement("#articledetail",10)}


  clicked(){
  //console.log(this.article)
  this.router.navigate(['/search',this.searchquery]);
  }

  onEnterSearch(){
this.router.navigate(['/search',this.searchquery]);
}


oncatclick(event){

let category = event.target.id;  
this.filteredarticles = this.allarticles.filter(art => art.category.includes(category))

this.simplePageScrollService.scrollToElement("#articles",0)



 //let element =  <HTMLElement>document.getElementById(event.target.id)
 //if(element.style.backgroundColor!="") {
 //element.style.backgroundColor=""
 //}else{
 //element.style.backgroundColor="#337AB7"
 //}

}

catbuttonclicked(){
  
this.categoryclicked=true;
this.numofammendclicked=false;
this.langclicked=false;
this.artnumclicked=false;

}

crowdlangbuttonclicked(){

this.categoryclicked=false;
this.numofammendclicked=false;
this.langclicked=true;
this.artnumclicked=false;
}

onlangclick(event){

  
  let element =  <HTMLElement>document.getElementById(event.target.id)
 if(element.style.backgroundColor=="#337AB7"){
 element.style.backgroundColor=""
 }else{
 element.style.backgroundColor="#337AB7"
 }

}

ammbuttonclicked(){
  
}

artnumbuttonclicked(){
  
  
}



  meaningclicked(){

  this.authservice.checkmeaning(this.word).subscribe(data=>{

  if(data.check){
  this.meaning = data.meaning
  this.wrongword=false;
  }else{
  this.meaning="NO SEARCH FOUND";


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

  searchformeaning(event){

  this.word = event.target.value
  

  }

  tagclick(event){

  this.router.navigate(['/search',event.target.id]);
  }


}
