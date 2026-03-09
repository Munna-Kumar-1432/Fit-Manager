import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="navbar-top">
      <div style="display:flex;align-items:center;gap:16px;">
        <div>
          <div style="color:white;font-size:16px;font-weight:700;">GYM Management</div>
          <div style="color:#475569;font-size:11px;">Welcome back, <span id="welcome-name">Munna</span>! 💪</div>
        </div>
      </div>

      <!-- Right -->
      <div style="display:flex;align-items:center;gap:10px;">
        <!-- Search -->
        <div class="search-box">
          <i class="fas fa-search" style="color:#475569;font-size:12px;"></i>
          <input type="text" placeholder="Search..." [(ngModel)]="query">
        </div>

        <!-- Notification -->
        <div class="icon-btn">
          <i class="fas fa-bell" style="font-size:14px;"></i>
          <span class="ping"></span>
        </div>

        <!-- Online Status -->
        <div class="online-pill">
          <span class="dot"></span>
          System Online
        </div>

        <!-- Clerk User Button -->
        <div id="clerk-user-button" style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;">
          <!-- Fallback avatar -->
           <div class="fallback-avatar" style="width:100%;height:100%;border-radius:10px;background:linear-gradient(135deg,#FF3B3F,#cc2a2d);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">
             MK
           </div>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent implements AfterViewInit {
  query = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window === 'undefined') return;

      let attempts = 0;
      const checkClerk = setInterval(() => {
        attempts++;
        if (attempts > 20) {
          clearInterval(checkClerk); // Auto clear after 10 seconds to prevent memory leaks
          return;
        }

        const clerk = (window as any).Clerk;
        if (clerk && clerk.isReady) {
          clearInterval(checkClerk);
          if (clerk.user) {
            const fallback = document.querySelector('.fallback-avatar');
            if (fallback) fallback.remove();
            clerk.mountUserButton(document.getElementById('clerk-user-button'));
            const welcomeEl = document.getElementById('welcome-name');
            if (welcomeEl) welcomeEl.innerText = clerk.user.firstName || 'Munna';
          }
        }
      }, 500);
    }
  }
}
