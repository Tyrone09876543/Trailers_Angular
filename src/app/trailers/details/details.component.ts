import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ApiService } from '../../api.service';
import { trailerDetails } from '../../interfaces/api-interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  trailer : trailerDetails;
  constructor(private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.api.trailerDetails(id).subscribe(res=>{
      if (!res["ok"]){
        return;
      }
      this.trailer = res.trailer;
      console.log(this.trailer);
      
    });
  }
}
