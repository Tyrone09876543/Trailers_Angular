import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { categoryResponse, trailersResponse } from '../interfaces/api-interface';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  form= new FormGroup({
    category : new FormControl("-1"),
    from : new FormControl(),
    to : new FormControl(),
    title : new FormControl(),
    email : new FormControl(),
    firstName : new FormControl(),
    lastName : new FormControl(),
  });
  title=""
  category = "-1";
  categories =[];
  trailersResponse : trailersResponse;
  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res=>{
      if (!res["ok"]){
        return;
      }
      this.categories = res.categories;
    });
    this.search();
  }
  search(){
    this.api.trailersPreview().subscribe(res=>{
      if (!res["ok"]){
        return;
      }
      this.trailersResponse = res;
    });
  }

}
