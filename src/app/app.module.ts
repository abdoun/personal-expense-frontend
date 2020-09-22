import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserareaComponent } from './userarea/userarea.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ExpensesComponent } from './expenses/expenses.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    UserDetailComponent,
    UserareaComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
