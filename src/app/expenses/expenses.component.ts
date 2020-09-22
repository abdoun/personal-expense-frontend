import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../Expense';
import { SessionStorageService } from 'ngx-webstorage';
import { UsersService } from '../users.service';
import { User } from '../User';
import { Category } from '../Category';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from '../categories.service';

//import { $ } from 'protractor';
// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses: Expense[];
  expense: Expense;
  user: User;
  categoryId: number;
  categories : Category[];
  editExpenseForm = new FormGroup({
    qty: new FormControl(0),
    category: new FormControl(1),
    date_time: new FormControl(new Date().toISOString().split('T')[0]),
    notes: new FormControl('')
  });
  msg: string = '';
  count : number = 0;
  pageResults : number = 5;
  pageNo : number = 0;
  pages: number = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private expensesService: ExpensesService, 
    private sessionSt:SessionStorageService,
    private usersService: UsersService,
    private categoriesService: CategoriesService) { }

  async getExpensesByCategoryId(id: number) {
    this.pageNo = +this.route.snapshot.paramMap.get('pageNo');
    this.expensesService.getAllExpensesByCategoryCount(id).subscribe(data => this.count = data);
    this.expensesService.getExpensesByCategoryId(id).subscribe(expenses => this.expenses = expenses.slice(this.pageNo * this.pageResults,(this.pageNo * this.pageResults) + this.pageResults));
    await this.delay(3000);
    this.pages = Math.round(this.count/this.pageResults);
  }

  async getAllExpenses() {
    
    this.pageNo = +this.route.snapshot.paramMap.get('pageNo');
    this.expensesService.getAllExpensesCount().subscribe(data => this.count = data);    
    this.expensesService.getAllExpenses().subscribe(expenses => this.expenses = expenses.slice(this.pageNo * this.pageResults,(this.pageNo * this.pageResults) + this.pageResults));
    await this.delay(3000);
    this.pages = Math.round(this.count/this.pageResults);
  }

  async deleteExpense(id: number) {
    $('#deleteButton-' + id).html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    this.expensesService.deleteExpense(id).subscribe(result => this.msg = result);
    await this.delay(3000);
    $('#deleteButton-' + id).html('Delete');
    location.reload();
  }

  async editExpense(id:number) {
    $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');      this.msg = '';
    this.msg = '';
    this.expensesService.showExpense(id).subscribe(expense => this.expense = expense);
    await this.delay(2000);
    //console.log(new Date(this.expense.date_time).toISOString().split('T')[0]);
    this.editExpenseForm.setValue({qty: this.expense.qty, notes: this.expense.notes, category: this.expense.category, date_time: new Date(this.expense.date_time).toISOString().split('T')[0] });
    $('#loading').html('');
    this.editExpenseForm.setValue({qty: this.expense.qty, notes: this.expense.notes, category: this.expense.category, date_time: this.expense.date_time});
  }

  addExpense() {
      $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
      this.msg = '';
      this.expense = null;      
      this.editExpenseForm.setValue({qty: 0, notes: '', category: 1, date_time: new Date().toDateString()});
      $('#loading').html('');
    }

    async onSubmit() {
      this.msg = '';
      if (this.editExpenseForm.valid) {
        $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
        let expenseId = 0;
        if(this.expense !== null) {
          this.expensesService.updateExpense(this.expense.id,
                this.editExpenseForm.value.qty,
                this.editExpenseForm.value.category,
                this.editExpenseForm.value.date_time,
                this.editExpenseForm.value.notes)
        .subscribe(data => expenseId = data);
        } else {
          console.log('here');
          this.expensesService.addExpense(this.editExpenseForm.value.qty,
                this.editExpenseForm.value.category,
                this.editExpenseForm.value.date_time,
                this.editExpenseForm.value.notes)
        .subscribe(data => expenseId = data);
        }        
        await this.delay(3000);
        $('#loading').html('');
        if(expenseId > 0) {
          this.msg ='it is updated';        
        } else {
          this.msg = 'sorry, the update was not successful!';
        }
      }
    }

  ngOnInit(): void {
    if(this.sessionSt.retrieve('userId')) {
      this.usersService.showUser(this.sessionSt.retrieve('userId')).subscribe(user => this.user = user);
      this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
      this.getCategories();
      if(this.categoryId == 0) {
        this.getAllExpenses();
      } else {
        this.getExpensesByCategoryId(this.categoryId);
      }
      
    } else {
      this.router.navigate(['/userarea']);
    }
  }
  getCategories(): void {
    this.categoriesService.getCategories()
    .subscribe(categories => this.categories = categories);
  }
  refresh(): void 
  {
    location.reload();
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
