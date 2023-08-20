import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { MenuService } from './menu-service/menu.service';
import { Router } from '@angular/router';
import { MenuOpcion } from './home-page.interface';

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
export class HomePageComponent implements OnInit {

  opcionesMenu: MenuOpcion[] = [];


  constructor(private menuService: MenuService, private router: Router){}

  ngOnInit(): void {
    this.menuService.getOpcionesMenu().subscribe({
      next: (opcionesMenu: MenuOpcion[]) => {
        this.opcionesMenu = opcionesMenu;
      }
    })
  }

  opcionMenuClick(urlToNavigate: string) {
    this.router.navigate([urlToNavigate]);
  }
}
