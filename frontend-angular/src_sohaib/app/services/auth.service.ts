import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
	authtoken:any;
	user:any;
  article:any;
  allarticles:Array<string>;

  constructor(private http:Http) { 
this.allarticles=[];

  }


savearticles(articles){
  
  this.allarticles = articles;
}

getsavedarticles(){
  
  return this.allarticles
}

getarticles(){
  
let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:4000/articles/getallarticles',{headers:headers}).map(res=>res.json()); 

}



addcomment(comment){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/articles/addcrowdsource',comment,{headers:headers}).map(res=>res.json())
  }

  registerUser(user){

  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:4000/users/register',user,{headers:headers}).map(res=>res.json())
  }

  authenticateUser(user){

  let headers = new Headers();
  headers.append('Content-Type','application/json');

  return this.http.post('http://localhost:4000/users/authenticate',user,{headers:headers}).map(res=>res.json())
  }


updatestatus(user){
  
  let headers = new Headers();
  headers.append('Content-Type','application/json');

  return this.http.post('http://localhost:4000/users/setstatus',user,{headers:headers}).map(res=>res.json())
}

getProfile(){

let headers = new Headers();
this.loadToken();
  headers.append('Authorization',this.authtoken);
  headers.append('Content-Type','application/json');


  return this.http.get('http://localhost:4000/users/profile',{headers:headers}).map(res=>res.json()); 
  }

  loadToken(){
  const token = localStorage.getItem('mytoken');
  this.authtoken = token;

}

  storeUserData(token,user){

  localStorage.setItem('mytoken',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authtoken=token;
  this.user=user;
  }
  logout(){
  this.authtoken = null;
  this.user = null;
  localStorage.clear();
  }

  isloggedin(){
  
  return tokenNotExpired('mytoken');
  }


  send_searchquery(query){
    
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  var queryarray = query.split(" ");
  //console.log(queryarray)
  const tags = {
  searchtags : queryarray
  }

return this.http.post('http://localhost:4000/articles/search',tags,{headers:headers}).map(res => res.json())

  }


get_articlebynumber(num){
    
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  
  //console.log(queryarray)
  const tags = {
  number : num
  }

return this.http.post('http://localhost:4000/articles/searchbynumber',tags,{headers:headers}).map(res => res.json())

  }


  checkmeaning(tofind){

  let headers = new Headers();
  headers.append('Content-Type','application/json');
  const words = {word:tofind}

  return this.http.post('http://localhost:4000/meaning',words,{headers:headers}).map(res=>res.json()); 
  }
  

checkbadword(comment){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
 var com = comment.split(" ");
  const tags = {
  word : com
  }
  return this.http.post('http://localhost:4000/checkbadword',tags,{headers:headers}).map(res => res.json())

}

  }


  







