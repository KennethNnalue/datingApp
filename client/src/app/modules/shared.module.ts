import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
    MatSnackBarModule,
  ],
  exports: [MatMenuModule, BsDropdownModule, MatSnackBarModule],
})
export class SharedModule {}
