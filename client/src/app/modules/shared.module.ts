import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatIconModule } from '@angular/material/icon';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
  ],
  exports: [
    MatMenuModule,
    BsDropdownModule,
    MatSnackBarModule,
    MatIconModule,
    TabsModule,
    MatTabsModule,
  ],
})
export class SharedModule {}
