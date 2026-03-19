import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 animate-fadeInUp">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black text-white">Gym <span class="gradient-text">Analytics</span></h1>
          <p class="text-slate-500 mt-1">Performance insights & revenue trends</p>
        </div>
        <div class="flex gap-3">
          <button *ngFor="let p of ['Week', 'Month', 'Year']"
                  class="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  [class]="activePeriod === p ? 'text-white' : 'text-slate-400 hover:text-white'"
                  [style.background]="activePeriod === p ? 'linear-gradient(135deg, #FF3B3F, #cc2a2d)' : 'rgba(255,255,255,0.05)'"
                  (click)="activePeriod = p">
            {{ p }}
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div *ngFor="let kpi of kpis" class="glass-card p-5">
          <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">{{ kpi.label }}</p>
          <p class="text-2xl font-black text-white mb-1">{{ kpi.value }}</p>
          <div class="flex items-center gap-1 text-xs">
            <i [class]="kpi.up ? 'fas fa-arrow-up text-green-400' : 'fas fa-arrow-down text-red-400'"></i>
            <span [class]="kpi.up ? 'text-green-400' : 'text-red-400'">{{ kpi.change }}</span>
            <span class="text-slate-600">vs last month</span>
          </div>
          <div class="progress-bar mt-3">
            <div class="progress-fill" [style.width]="kpi.progress"></div>
          </div>
        </div>
      </div>

      <!-- Revenue Chart + Member Growth -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Revenue Bar Chart -->
        <div class="glass-card p-6">
          <h3 class="text-white font-bold text-lg mb-6">Monthly Revenue (₹)</h3>
          <div class="flex items-end gap-2 h-52">
            <div *ngFor="let b of monthlyRevenue" class="flex-1 flex flex-col items-center gap-2">
              <span class="text-slate-500 text-xs">{{ b.val }}</span>
              <div class="chart-bar w-full" [style.height.%]="b.pct"
                   [style.background]="b.current ? 'linear-gradient(to top, #FF3B3F, #ff6b35)' : 'linear-gradient(to top, rgba(255,59,63,0.5), rgba(255,59,63,0.1))'">
              </div>
              <span class="text-slate-500 text-xs">{{ b.m }}</span>
            </div>
          </div>
        </div>

        <!-- Membership Split -->
        <div class="glass-card p-6">
          <h3 class="text-white font-bold text-lg mb-6">Membership Distribution</h3>
          <div class="space-y-5">
            <div *ngFor="let m of membershipSplit">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                       [style.background]="m.bg">{{ m.icon }}</div>
                  <span class="text-white text-sm font-semibold">{{ m.plan }}</span>
                </div>
                <div class="text-right">
                  <span class="text-white font-bold">{{ m.count }}</span>
                  <span class="text-slate-500 text-xs ml-2">members</span>
                </div>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width]="m.pct" [style.background]="m.color"></div>
              </div>
              <p class="text-slate-500 text-xs mt-1 text-right">{{ m.pct }} of total</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Peak Hours + Top Trainers -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Peak Hours -->
        <div class="glass-card p-6">
          <h3 class="text-white font-bold text-lg mb-6">Peak Hours Today</h3>
          <div class="flex items-end gap-2 h-40">
            <div *ngFor="let h of peakHours" class="flex-1 flex flex-col items-center gap-1">
              <div class="chart-bar w-full rounded"
                   [style.height.%]="h.load"
                   [style.background]="h.load > 70 ? 'linear-gradient(to top, #FF3B3F, rgba(255,59,63,0.3))' : h.load > 40 ? 'linear-gradient(to top, #EAB308, rgba(234,179,8,0.3))' : 'linear-gradient(to top, #22C55E, rgba(34,197,94,0.3))'">
              </div>
              <span class="text-slate-600 text-xs">{{ h.time }}</span>
            </div>
          </div>
          <div class="flex gap-4 mt-4 pt-4 border-t border-white/5">
            <div class="flex items-center gap-2 text-xs">
              <span class="w-3 h-3 rounded-sm bg-red-500"></span>
              <span class="text-slate-500">High (70%+)</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="w-3 h-3 rounded-sm bg-yellow-500"></span>
              <span class="text-slate-500">Medium</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="w-3 h-3 rounded-sm bg-green-500"></span>
              <span class="text-slate-500">Low</span>
            </div>
          </div>
        </div>

        <!-- Top Performing Trainers -->
        <div class="glass-card p-6">
          <h3 class="text-white font-bold text-lg mb-6">Top Trainers This Month</h3>
          <div class="space-y-4">
            <div *ngFor="let t of topTrainers; let i = index" class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                   [style.background]="i === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : i === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' : 'linear-gradient(135deg, #CD7F32, #A0522D)'">
                {{ i + 1 }}
              </div>
              <div class="text-2xl">{{ t.emoji }}</div>
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-white font-semibold text-sm">{{ t.name }}</span>
                  <span class="text-white text-sm font-bold">{{ t.sessions }} sessions</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width]="t.pct"
                       [style.background]="i === 0 ? 'linear-gradient(90deg, #FFD700, #FFA500)' : 'linear-gradient(90deg, #FF3B3F, #ff6b35)'">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent {
  activePeriod = 'Month';

  kpis = [
    { label: 'Total Revenue', value: '₹4.2L', change: '+18.2%', up: true, progress: '82%' },
    { label: 'New Members', value: '124', change: '+12.5%', up: true, progress: '65%' },
    { label: 'Avg. Attendance', value: '238/day', change: '+5.3%', up: true, progress: '71%' },
    { label: 'Churn Rate', value: '3.2%', change: '-1.1%', up: false, progress: '15%' },
  ];

  monthlyRevenue = [
    { m: 'Sep', val: '3.1L', pct: 55, current: false },
    { m: 'Oct', val: '3.5L', pct: 63, current: false },
    { m: 'Nov', val: '2.8L', pct: 50, current: false },
    { m: 'Dec', val: '3.9L', pct: 70, current: false },
    { m: 'Jan', val: '3.6L', pct: 64, current: false },
    { m: 'Feb', val: '4.0L', pct: 72, current: false },
    { m: 'Mar', val: '4.2L', pct: 80, current: true },
  ];

  membershipSplit = [
    { plan: 'Elite', icon: '👑', count: 253, pct: '25%', bg: 'rgba(234,179,8,0.15)', color: 'linear-gradient(90deg, #EAB308, #f59e0b)' },
    { plan: 'Premium', icon: '🔥', count: 487, pct: '45%', bg: 'rgba(255,59,63,0.15)', color: 'linear-gradient(90deg, #FF3B3F, #ff6b35)' },
    { plan: 'Basic', icon: '⚡', count: 300, pct: '30%', bg: 'rgba(100,116,139,0.15)', color: 'linear-gradient(90deg, #64748b, #94a3b8)' },
  ];

  peakHours = [
    { time: '6AM', load: 85 }, { time: '7AM', load: 95 }, { time: '8AM', load: 70 },
    { time: '9AM', load: 45 }, { time: '10AM', load: 30 }, { time: '11AM', load: 25 },
    { time: '12PM', load: 40 }, { time: '1PM', load: 35 }, { time: '2PM', load: 20 },
    { time: '3PM', load: 30 }, { time: '4PM', load: 55 }, { time: '5PM', load: 80 },
    { time: '6PM', load: 100 }, { time: '7PM', load: 90 }, { time: '8PM', load: 60 },
    { time: '9PM', load: 35 }, { time: '10PM', load: 15 },
  ];

  topTrainers = [
    { name: 'Arjun Singh', emoji: '💪', sessions: 95, pct: '95%' },
    { name: 'Priya Sharma', emoji: '🏃', sessions: 82, pct: '82%' },
    { name: 'Rahul Gupta', emoji: '🧘', sessions: 78, pct: '78%' },
    { name: 'Neha Verma', emoji: '🥗', sessions: 65, pct: '65%' },
  ];
}
