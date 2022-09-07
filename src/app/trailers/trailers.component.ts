import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  category = "-1";
  categories = [{"id":1, "name":"prueba"}];
  constructor() { }

  ngOnInit(): void {
  }

}
