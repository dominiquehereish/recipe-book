import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  imports: [TranslatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
