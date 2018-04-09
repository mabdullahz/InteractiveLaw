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
  article:String
  constructor(private router:Router, private authservice: AuthService) { }

  ngOnInit() {
  }

 search(event){
  this.article = event.target.value;
  }

  clicked(){
  //console.log(this.article)
  this.router.navigate(['/search',this.article]);
  }

onEnterSearch(){
  
this.router.navigate(['/search',this.article]);

}

  
  

}
