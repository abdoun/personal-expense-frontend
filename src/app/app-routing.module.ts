import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { UserareaComponent } from './userarea/userarea.component';
import { ExpensesComponent } from './expenses/expenses.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'userarea', component: UserareaComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expenses/:pageNo', component: ExpensesComponent },
  { path: 'expenses/category/:categoryId', component: ExpensesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
