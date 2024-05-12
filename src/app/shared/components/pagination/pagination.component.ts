import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() oddnumberOfOptions: number = 5;
  @Input({ required: true }) totalNumOfItems: number;
  @Input({ required: true }) itemsPerPage: number;
  @Input({ required: true }) currentPage: number;
  @Output() onPageChanged = new EventEmitter<number>();

  public numberOfPages: number;
  public pagesArray: number[];

  ngOnInit(): void {
    this.pagesArray = [1];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.numberOfPages = Math.ceil(this.totalNumOfItems / this.itemsPerPage);
    this.setPagesArray();
  }

  public setPagesArray() {
    const delta = Math.floor(this.oddnumberOfOptions / 2);
    let firstPage = this.currentPage - delta < 1 ? 1 : this.currentPage - delta;

    const lastPage =
      this.currentPage + delta > this.numberOfPages
        ? this.numberOfPages
        : this.currentPage + delta;

    this.pagesArray = [];
    for (let i = 0; i <= lastPage - firstPage; i++) {
      this.pagesArray.push(firstPage + i);
    }
  }
}
