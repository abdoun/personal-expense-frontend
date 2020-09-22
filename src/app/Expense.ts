import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export interface Expense {
    id: number;
    qty: number;
    date_time: Date;
    notes: string;
    user: number;
    category: string;
  }
  