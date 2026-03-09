import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, FooterComponent],
  template: `
    <div class="layout-wrap">
      <!-- Sidebar (fixed, always visible) -->
      <app-sidebar></app-sidebar>

      <!-- Main area pushed right by sidebar width -->
      <div class="main-content">
        <!-- Top Navbar -->
        <app-navbar></app-navbar>

        <!-- Routed page content -->
        <div class="page-area">
          <router-outlet></router-outlet>
        </div>

        <!-- Footer -->
        <app-footer></app-footer>
      </div>
    </div>
  `
})
export class App { }
