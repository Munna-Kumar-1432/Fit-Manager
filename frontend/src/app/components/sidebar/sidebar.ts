import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="sidebar-wrap">
      <!-- Logo -->
      <div style="padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,59,63,0.12); display:flex; align-items:center; gap:12px; flex-shrink:0;">
        <div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#FF3B3F,#cc2a2d);display:flex;align-items:center;justify-content:center;color:white;font-size:16px;font-weight:900;letter-spacing:-1px;flex-shrink:0;">
          PF
        </div>
        <div>
          <div style="color:white;font-size:17px;font-weight:900;line-height:1.1;letter-spacing:-0.5px;">POWERFIT</div>
          <div style="color:#FF3B3F;font-size:9px;font-weight:700;letter-spacing:0.1em;">GYM MANAGEMENT</div>
        </div>
      </div>

      <!-- Nav -->
      <nav style="padding: 12px 10px; flex:1;">
        <div class="section-title">Main Menu</div>

        <a routerLink="/home" routerLinkActive="active-link" class="nav-link">
          <i class="fas fa-home" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Home</span>
        </a>
        <a routerLink="/dashboard" routerLinkActive="active-link" class="nav-link">
          <i class="fas fa-chart-line" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Dashboard</span>
          <span class="badge-pill">Live</span>
        </a>
        <a routerLink="/members" routerLinkActive="active-link" class="nav-link">
          <i class="fas fa-users" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Members</span>
        </a>
        <a routerLink="/trainers" routerLinkActive="active-link" class="nav-link">
          <i class="fas fa-dumbbell" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Trainers</span>
        </a>

        <div class="section-title">Finance</div>

        <a routerLink="/membership" routerLinkActive="active-link" class="nav-link">
          <i class="fas fa-id-card" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Membership Plans</span>
        </a>
        <a routerLink="/analytics" routerLinkActive="active-link" class="nav-link">
          <i class="fas fa-chart-bar" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Analytics</span>
        </a>

        <div class="section-title">Settings</div>

        <a href="#" class="nav-link">
          <i class="fas fa-cog" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Settings</span>
        </a>
        <a href="#" class="nav-link">
          <i class="fas fa-bell" style="width:16px;text-align:center;font-size:13px;"></i>
          <span>Notifications</span>
          <span class="badge-pill">3</span>
        </a>

        <!-- Motivational Banner -->
        <div style="margin-top:20px;border-radius:12px;padding:14px;background:linear-gradient(135deg,rgba(255,59,63,0.15),rgba(255,59,63,0.05));border:1px solid rgba(255,59,63,0.2);">
          <div style="font-size:22px;margin-bottom:6px;">💪</div>
          <div style="color:white;font-size:12px;font-weight:700;margin-bottom:4px;">Stay Strong!</div>
          <div style="color:#64748b;font-size:11px;line-height:1.4;">147 members checked in today</div>
        </div>
      </nav>

      <!-- User -->
      <div style="flex-shrink:0; padding-bottom:8px;">
        <div class="user-box">
          <div class="avatar">MK</div>
          <div style="flex:1;min-width:0;">
            <div style="color:white;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Munna Kumar</div>
            <div style="color:#475569;font-size:11px;">Admin</div>
          </div>
          <i class="fas fa-sign-out-alt" style="color:#475569;cursor:pointer;font-size:13px;" onmouseenter="this.style.color='#FF3B3F'" onmouseleave="this.style.color='#475569'"></i>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent { }
