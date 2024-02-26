import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MenubarModule
  ]
})

export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
          label: 'Menu',
          icon: 'pi pi-fw pi-file',
          routerLink: '/home'
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/menu-pedidos'
    },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/menu-productos'
    },
    {
        label: 'Insumos',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/menu-insumos'
    },
      {
          label: 'Usuarios',
          icon: 'pi pi-fw pi-user',
          routerLink: '/menu-usuarios'
      }
      
  ];
  }



}
