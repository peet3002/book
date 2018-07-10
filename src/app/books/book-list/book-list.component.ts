import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }

}
