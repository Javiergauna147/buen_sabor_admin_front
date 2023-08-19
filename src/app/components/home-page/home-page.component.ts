import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

}
