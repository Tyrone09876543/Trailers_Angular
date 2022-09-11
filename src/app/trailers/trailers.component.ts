import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { categoryResponse, trailersResponse } from '../interfaces/api-interface';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  categories =[];
  trailersResponse : trailersResponse;
  constructor(private api:ApiService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res=>{
      if (!res["ok"]){
        return;
      }
      this.categories = res.categories;
    });
    const data = this.getQueryParams();
    console.log(data);
    this.getTrailers(data);
  }
  getQueryParams(){
    const data = {
      "title":this.route.snapshot.queryParams["title"],
      "category":this.route.snapshot.queryParams["category"],
      "from":this.route.snapshot.queryParams["from"],
      "to":this.route.snapshot.queryParams["to"],
      "page":this.route.snapshot.queryParams["page"],
    }
    if (data["title"]==null){
      delete data["title"];
    }
    if (data["category"]==null){
      delete data["category"];
    }
    if (data["from"]==null){
      delete data["from"];
    }
    if (data["to"]==null){
      delete data["to"];
    }
    if (data["page"]==null){
      delete data["page"];
    }
    return data
  }
  getTrailers(data){
    this.api.trailersPreview(data).subscribe(res=>{
      console.log(res);
      if (!res["ok"]){
        return;
      }
      this.trailersResponse = res;
    });
  }
  search(){
    const data = this.getData();
    this.router.navigate(
      ['.'], 
      { relativeTo: this.route, queryParams: data }
    );
    this.getTrailers(data);
  }
  getData(){
    const data = {

    }
    if (this.trailersResponse == null){
      return data;
    }
    if (this.trailersResponse.context.title != null && this.trailersResponse.context.title != ""){
      data["title"] = this.trailersResponse.context.title
    }
    if (this.trailersResponse.context.category != null && this.trailersResponse.context.category != ""){
      data["category"] = this.trailersResponse.context.category
    }
    if (this.trailersResponse.context.from != null && this.trailersResponse.context.from != ""){
      data["from"] = this.trailersResponse.context.from
    }
    if (this.trailersResponse.context.to != null && this.trailersResponse.context.to != ""){
      data["to"] = this.trailersResponse.context.to
    }
    return data;
  }
  first(){
    const data = this.getQueryParams();
    data["page"] = 1;
    this.router.navigate(
      ['.'], 
      { relativeTo: this.route, queryParams: data }
    );
    this.getTrailers(data);
  }
  next(){
    const data = this.getQueryParams();
    data["page"] = this.trailersResponse.context.page +1;
    this.router.navigate(
      ['.'], 
      { relativeTo: this.route, queryParams: data }
    );
    this.getTrailers(data);
  }
  previous(){
    const data = this.getQueryParams();
    data["page"] = this.trailersResponse.context.page -1;
    this.router.navigate(
      ['.'], 
      { relativeTo: this.route, queryParams: data }
    );
    this.getTrailers(data);
  }
  last(){
    const data = this.getQueryParams();
    data["page"] = this.trailersResponse.context.num_pages;
    this.router.navigate(
      ['.'], 
      { relativeTo: this.route, queryParams: data }
    );
    this.getTrailers(data);
  }
  details(id){
    this.router.navigate(["/trailers/details",id])
  }
}
