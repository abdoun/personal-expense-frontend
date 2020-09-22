import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Category } from '../Category';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { CategoriesService } from '../categories.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormControl} from '@angular/forms';

//import { $ } from 'protractor';
// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  user : User;
  categories : Category[];
  category: Category;
  editCategoryForm = new FormGroup({
    name: new FormControl(''),
    notes: new FormControl('')
  });
  msg: string = '';
  //loading : string = '<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>';

  constructor(private categoriesService: CategoriesService,
    private router: Router,
     private usersService: UsersService, 
     private sessionSt:SessionStorageService) { }

     getCategories(): void {
      this.categoriesService.getCategories()
      .subscribe(categories => this.categories = categories);
    }

    getUser(id: number): void {
     $('#ModalLongTitle').html('User Detail');
      this.usersService.showUser(id)
      .subscribe(user => this.user = user);
      
      
    }
    getExpensesByCategory(id: number): void {
      this.router.navigate(['/expenses/category/' + id]);
    }

    async deleteCategory(id: number) {
      $('#deleteButton-' + id).html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
      this.categoriesService.deleteCategory(id).subscribe(result => this.msg = result);
      await this.delay(3000);
      $('#deleteButton-' + id).html('Delete');
      location.reload();
    }

    async editCategory(id:number) {
      $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');      this.msg = '';
      this.msg = '';
      this.editCategoryForm.setValue({name: '', notes: ''});      
      this.categoriesService.showCategory(id).subscribe(category => this.category = category);
      await this.delay(3000);
      $('#loading').html('');
      this.editCategoryForm.setValue({name: this.category.name, notes: this.category.notes});
    }

    addCategory() {
      $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');      this.msg = '';
      this.msg = '';
      this.category = null;
      this.editCategoryForm.setValue({name: '', notes: ''});
      $('#loading').html('');
    }

    async onSubmit() {
      this.msg = '';
      if (this.editCategoryForm.valid) {
        $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
        let categoryId = 0;
        if(this.category !== null) {
          this.categoriesService.updateCategory(this.category.id,this.editCategoryForm.value.name,this.editCategoryForm.value.notes)
        .subscribe(data => categoryId = data);
        } else {
          console.log('here');
          this.categoriesService.addCategory(this.editCategoryForm.value.name,this.editCategoryForm.value.notes)
        .subscribe(data => categoryId = data);
        }        
        await this.delay(3000);
        $('#loading').html('');
        if(categoryId > 0) {
          this.msg ='it is updated';        
        } else {
          this.msg = 'sorry, the update was not successful!';
        }
      }
    }
    

  ngOnInit(): void {
    if(this.sessionSt.retrieve('userId')) {
      this.usersService.showUser(this.sessionSt.retrieve('userId')).subscribe(user => this.user = user);
      this.getCategories();
    } else {
      this.router.navigate(['/userarea']);
    }   
    
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
