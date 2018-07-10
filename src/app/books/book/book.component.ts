import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BookService } from '../shared/book.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  form: FormGroup;
  formType: 'NEW'|'EDIT';
  submitBtnTxt: 'Create' |'Update';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.setFormType();
    this.createForm();
    this.setSubmitBtnText();
    this.loadBook();
  }


  onSubmit(event){
    event.preventDefault();
    this.formType === 'NEW' ? this.createBook() : this.updateBook();

  }

  private createBook(){
    this.bookService.createBook(this.form.value);
    this.router.navigate(['/books']);

  }

  private updateBook(){
    const { id } = this.route.snapshot.params;
    this.bookService.updateBook(+id,this.form.value);
    this.router.navigate(['/books',id]);
  }
  
  private setFormType(){
    this.formType = this.route.snapshot.data.formType;
  }

  private setSubmitBtnText(){
    this.submitBtnTxt = this.formType === 'NEW' ? 'Create' : 'Update';
  }

  private loadBook(){
    if(this.formType === 'NEW') return ;

    const {id} = this.route.snapshot.params;

    const {title,description,content} = this.bookService.getBook(+id);
    this.form.setValue({title,description,content});
  }

  private createForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
          content: ['', Validators.required]
    });
  }
  

}
