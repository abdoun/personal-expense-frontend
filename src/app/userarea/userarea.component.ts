import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { User } from '../User';
import { UsersService } from '../users.service';
import {SessionStorageService} from 'ngx-webstorage';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-userarea',
  templateUrl: './userarea.component.html',
  styleUrls: ['./userarea.component.css']
})
export class UserareaComponent implements OnInit {
  userId : number;
  user : User;
  loginform: FormGroup;
  username: FormControl;
  password: FormControl;
  msg: string = '';
  
  constructor(private usersService: UsersService, 
    private sessionSt:SessionStorageService) { }

  createForm() {
    this.loginform = new FormGroup({
      username: this.username,
      password: this.password
    });
  }
  async onSubmit() {
    if (this.loginform.valid) {
      this.msg ='';
      $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
      this.usersService.signIn(this.loginform.value.username,this.loginform.value.password)
      .subscribe(data => this.userId = data);
      await this.delay(5000);
      if(this.userId > 0) {
        this.sessionSt.store('username',this.loginform.value.username);
        this.sessionSt.store('password',this.loginform.value.password);
        this.sessionSt.store('userId',this.userId);
        this.usersService.showUser(this.userId).subscribe(user => this.user = user);
        this.msg ='';
      } else {
        this.msg = 'sorry, username or password is not right!';
      }
      $('#loading').html('');
    }
  }
  ngOnInit() {
    if(this.sessionSt.retrieve('userId')) {
      this.usersService.showUser(this.sessionSt.retrieve('userId')).subscribe(user => this.user = user);      
    } else {
      $('#loading').html('');
      this.createFormControls();
      this.createForm();
    }
  }

  createFormControls() {
    this.username = new FormControl('');
    this.password = new FormControl('');
  }

  logout() {
    this.sessionSt.clear();
    location.reload();
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
