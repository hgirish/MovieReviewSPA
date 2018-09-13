import { Component,  OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input('total-items') totalItems;
  @Input('page-size') pageSize = 10;
  @Output('page-changed') pageChanged = new EventEmitter();
  @Output('total-items') totalNoOfPages;
  pages: any[];
  currentPage = 1;



  constructor() { }

  ngOnChanges() {
    this.currentPage = 1;
    this.totalNoOfPages = this.totalItems;
    var pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (var i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }

    console.log(this);
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  previous() {
    if (this.currentPage == 1) {
      return;
    }
    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage === this.pages.length) {
      return 
    }
    this.currentPage++;
    console.log("next", this);
    this.pageChanged.emit(this.currentPage);
  }

 

}
