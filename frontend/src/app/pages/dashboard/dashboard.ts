import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fadeInUp">
      <!-- Page Header -->
      <div class="mb-8 p-8 pb-0">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-white">Dashboard <span class="gradient-text">Overview</span></h1>
            <p class="text-slate-500 mt-1">Real-time gym performance insights</p>
          </div>
          <div class="flex gap-3">
            <button class="btn-primary">
              <i class="fas fa-download"></i> Export Report
            </button>
            <button class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 transition-all hover:text-white"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
              <i class="fas fa-calendar-alt mr-2"></i> This Month
            </button>
          </div>
        </div>
      </div>

      <!-- STAT CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-8 mb-8">
        <div *ngFor="let stat of stats" class="stat-card">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                 [style.background]="stat.iconBg">
              {{ stat.icon }}
            </div>
            <span class="badge" [class]="stat.trendClass">
              {{ stat.trend }}
            </span>
          </div>
          <p class="text-3xl font-black text-white mb-1">{{ stat.value }}</p>
          <p class="text-slate-400 text-sm">{{ stat.label }}</p>
          <div class="progress-bar mt-3">
            <div class="progress-fill" [style.width]="stat.progress"></div>
          </div>
        </div>
      </div>

      <!-- CHARTS ROW -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 mb-8">
        <!-- Revenue Chart -->
        <div class="glass-card p-6 lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-white font-bold text-lg">Revenue Analytics</h3>
              <p class="text-slate-500 text-sm">Monthly revenue overview 2026</p>
            </div>
            <span class="badge badge-success">+18.2% ↑</span>
          </div>
          <!-- Bar Chart -->
          <div class="flex items-end gap-3 h-48">
            <div *ngFor="let bar of revenueChart" class="flex-1 flex flex-col items-center gap-2">
              <span class="text-slate-500 text-xs">{{ bar.amount }}</span>
              <div class="chart-bar w-full" [style.height.%]="bar.height"></div>
              <span class="text-slate-500 text-xs">{{ bar.month }}</span>
            </div>
          </div>
        </div>

        <!-- Attendance Donut -->
        <div class="glass-card p-6">
          <h3 class="text-white font-bold text-lg mb-6">Attendance Today</h3>
          <div class="flex flex-col items-center gap-4">
            <div class="relative w-36 h-36">
              <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#FF3B3F" stroke-width="12"
                        stroke-dasharray="188 251" stroke-linecap="round"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" stroke-width="12"
                        stroke-dasharray="50 251" stroke-dashoffset="-188" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <p class="text-2xl font-black text-white">238</p>
                <p class="text-slate-500 text-xs">Total</p>
              </div>
            </div>
            <div class="w-full space-y-3 mt-2">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-red-500"></span>
                  <span class="text-slate-400">Morning</span>
                </div>
                <span class="text-white font-semibold">150</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-green-500"></span>
                  <span class="text-slate-400">Evening</span>
                </div>
                <span class="text-white font-semibold">88</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Members + Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 pb-8">
        <!-- Recent Members Table -->
        <div class="glass-card p-6 lg:col-span-2 overflow-x-auto">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-white font-bold text-lg">Recent Members</h3>
            <button class="text-red-400 text-sm hover:text-red-300 transition-colors font-semibold">View All →</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of recentMembers">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                         style="background: linear-gradient(135deg, #FF3B3F, #cc2a2d);">
                      {{ m.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="text-white font-medium text-sm">{{ m.name }}</p>
                      <p class="text-slate-600 text-xs">{{ m.email }}</p>
                    </div>
                  </div>
                </td>
                <td><span class="text-white text-sm">{{ m.plan }}</span></td>
                <td>{{ m.joined || m.date }}</td>
                <td><span class="badge" [class]="m.statusClass">{{ m.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Quick Actions -->
        <div class="glass-card p-6">
          <h3 class="text-white font-bold text-lg mb-6">Quick Actions</h3>
          <div class="space-y-3">
            <button *ngFor="let action of quickActions"
                    class="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:border-red-500/40"
                    style="background: rgba(255,59,63,0.05); border: 1px solid rgba(255,59,63,0.1);">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                   style="background: rgba(255,59,63,0.15);">
                {{ action.icon }}
              </div>
              <div>
                <p class="text-white font-semibold text-sm">{{ action.label }}</p>
                <p class="text-slate-500 text-xs">{{ action.desc }}</p>
              </div>
              <i class="fas fa-arrow-right text-red-400 ml-auto text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats: any[] = [];
  attendance = { morning: 150, evening: 88, total: 238 };

  revenueChart = [
    { month: 'Sep', amount: '3.1L', height: 55 },
    { month: 'Oct', amount: '3.5L', height: 62 },
    { month: 'Nov', amount: '2.8L', height: 50 },
    { month: 'Dec', amount: '3.9L', height: 70 },
    { month: 'Jan', amount: '3.6L', height: 64 },
    { month: 'Feb', amount: '4.0L', height: 72 },
    { month: 'Mar', amount: '4.2L', height: 80 },
  ];

  recentMembers: any[] = [];

  quickActions = [
    { icon: '➕', label: 'Add Member', desc: 'Register a new member' },
    { icon: '💳', label: 'Renew Plan', desc: 'Extend membership' },
    { icon: '📊', label: 'Generate Report', desc: 'Monthly analytics' },
    { icon: '🔔', label: 'Send Notification', desc: 'Alert all members' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchDashboardData();
    this.fetchRecentMembers();
  }

  fetchDashboardData() {
    this.http.get<any>('http://localhost:5000/api/stats').subscribe({
      next: (data) => {
        this.attendance = data.attendance || this.attendance;
        this.stats = [
          { icon: '👥', label: 'Total Members', value: data.totalMembers.toLocaleString(), trend: '+12%', trendClass: 'badge badge-success', iconBg: 'rgba(255,59,63,0.15)', progress: '75%' },
          { icon: '✅', label: 'Active Memberships', value: data.activeMemberships.toLocaleString(), trend: '+5%', trendClass: 'badge badge-success', iconBg: 'rgba(34,197,94,0.15)', progress: '60%' },
          { icon: '🏋️', label: 'Trainers', value: data.trainersCount.toString(), trend: 'Stable', trendClass: 'badge badge-warning', iconBg: 'rgba(234,179,8,0.15)', progress: '45%' },
          { icon: '💰', label: 'Monthly Revenue', value: '₹' + data.revenue, trend: '+18%', trendClass: 'badge badge-success', iconBg: 'rgba(255,59,63,0.15)', progress: '82%' },
        ];
      },
      error: (err) => console.log('Backend stats offline, fetching failed', err)
    });
  }

  fetchRecentMembers() {
    this.http.get<any[]>('http://localhost:5000/api/members').subscribe({
      next: (data) => {
        this.recentMembers = data.slice(0, 5); // limit to 5
      },
      error: (err) => console.log('Backend members offline', err)
    });
  }
}
