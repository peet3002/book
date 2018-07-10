import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component'
import { BooksComponent } from './books/books.component';
import { BookService } from './books/shared/book.service';
import { BookListComponent } from './books/book-list/book-list.component';
import { FormComponent } from './books/form/form.component';
import { BookComponent } from './books/book/book.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'new',
        component: FormComponent,
        data: { fromType: 'NEW' }
      },
      {
        path: ':id',
        component: BookComponent,
        data: {fromType: 'EDIT' }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }


]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    FormComponent,
    BookComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
