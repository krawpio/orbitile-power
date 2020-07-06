import { Component, OnInit } from '@angular/core';
import {MenuEl} from '../main-menu-element/menu-el';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  selectedMenu: MenuEl;

  menuElements: MenuEl[] = [
    { id: 1, icon: 'menu-dashboard', title: 'Pulpit', link: '/dashboard' },
    { id: 2, icon: 'menu-powerline', title: 'Linie', link: '/powerline' },
    { id: 3, icon: 'menu-alert', title: 'Alarmy', link: '/alert' },
    { id: 4, icon: 'menu-task', title: 'Zlecenia', link: '/order' },
    { id: 5, icon: 'menu-help', title: 'Pomoc', link: '/help' },
    { id: 6, icon: 'menu-logout', title: 'Wyloguj', link: '/logout' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(menu: MenuEl): void {
    this.selectedMenu = menu;
  }

  isActive(menu: MenuEl) {
    return this.router.url.startsWith(menu.link);
  }

}


