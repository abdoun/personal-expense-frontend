import { Component, OnInit, Input } from '@angular/core';

import { User } from '../User';

declare var $: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  constructor() { }
  setLoading():void {
    $('#loading').html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
  }
  ngOnInit(): void {
    this.setLoading();
  }

}
