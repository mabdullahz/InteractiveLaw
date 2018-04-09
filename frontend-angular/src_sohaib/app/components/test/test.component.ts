import { Component, OnInit } from '@angular/core';
import { scrollTo } from 'ng2-utils';
import {Router} from '@angular/router'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
	article:String
  constructor(private router:Router ) { }

  ngOnInit() {
  }

 search(event){
  this.article = event.target.value;
  }

  clicked(){
   this.router.navigate(['/search',this.article]);

  }


  
  

}
