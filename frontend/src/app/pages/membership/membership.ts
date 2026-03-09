import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 animate-fadeInUp">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-black text-white">Membership <span class="gradient-text">Plans</span></h1>
        <p class="text-slate-500 mt-1">Choose the perfect plan for your fitness journey</p>
      </div>

      <!-- Plans -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div *ngFor="let plan of plans; let i = index"
             class="relative glass-card p-8 flex flex-col transition-all duration-300"
             [class.scale-105]="plan.popular"
             [style.border-color]="plan.popular ? '#FF3B3F' : ''">

          <!-- Popular Badge -->
          <div *ngIf="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="px-4 py-1 rounded-full text-xs font-black text-white"
                  style="background: linear-gradient(135deg, #FF3B3F, #cc2a2d);">🔥 MOST POPULAR</span>
          </div>

          <div class="mb-6">
            <div class="text-4xl mb-3">{{ plan.icon }}</div>
            <h3 class="text-white font-black text-xl mb-1">{{ plan.name }}</h3>
            <p class="text-slate-500 text-sm">{{ plan.description }}</p>
          </div>

          <div class="mb-6">
            <div class="flex items-end gap-1">
              <span class="text-5xl font-black" [style.color]="plan.popular ? '#FF3B3F' : 'white'">₹{{ plan.price }}</span>
              <span class="text-slate-500 text-sm mb-2">/month</span>
            </div>
            <p class="text-slate-600 text-xs mt-1">Billed annually • Save {{ plan.saving }}</p>
          </div>

          <ul class="space-y-3 mb-8 flex-1">
            <li *ngFor="let feature of plan.features" class="flex items-center gap-3 text-sm">
              <i class="fas fa-check-circle text-green-400 flex-shrink-0"></i>
              <span class="text-slate-300">{{ feature }}</span>
            </li>
            <li *ngFor="let f of plan.excluded" class="flex items-center gap-3 text-sm opacity-40">
              <i class="fas fa-times-circle text-slate-500 flex-shrink-0"></i>
              <span class="text-slate-500">{{ f }}</span>
            </li>
          </ul>

          <button class="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300"
                  (click)="purchasePlan(plan.name, plan.price)"
                  [style.background]="plan.popular ? 'linear-gradient(135deg, #FF3B3F, #cc2a2d)' : 'rgba(255,59,63,0.1)'"
                  [style.color]="plan.popular ? 'white' : '#FF3B3F'"
                  [style.border]="plan.popular ? 'none' : '1px solid rgba(255,59,63,0.3)'">
            {{ plan.btnText }}
          </button>
        </div>
      </div>

      <!-- Payment History -->
      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-white font-bold text-xl">Payment History</h2>
          <button class="btn-primary text-sm py-2 px-4">
            <i class="fas fa-download text-xs"></i> Export
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Member</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of payments">
                <td class="font-mono text-red-400 text-sm">{{ p.invoice }}</td>
                <td class="text-white text-sm font-medium">{{ p.member }}</td>
                <td>
                  <span class="badge"
                        [style.background]="p.plan === 'Elite' ? 'rgba(234,179,8,0.15)' : p.plan === 'Premium' ? 'rgba(255,59,63,0.15)' : 'rgba(100,100,100,0.15)'"
                        [style.color]="p.plan === 'Elite' ? '#EAB308' : p.plan === 'Premium' ? '#FF3B3F' : '#94a3b8'">
                    {{ p.plan }}
                  </span>
                </td>
                <td class="text-white font-bold">{{ p.amount }}</td>
                <td class="text-slate-400">{{ p.date }}</td>
                <td>
                  <div class="flex items-center gap-2 text-sm text-slate-400">
                    <i [class]="p.methodIcon" class="text-xs"></i>
                    {{ p.method }}
                  </div>
                </td>
                <td><span class="badge" [class]="p.statusClass">{{ p.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class MembershipComponent implements OnInit {
  plans = [
    {
      name: 'BASIC', icon: '⚡', price: '999', description: 'Perfect for beginners', saving: '10%',
      popular: false, btnText: 'Select Basic',
      features: ['Gym access 6 AM – 10 PM', '2 Guest passes/month', 'Locker access', 'Basic equipment'],
      excluded: ['Personal trainer', 'Swimming pool', 'Nutrition plan']
    },
    {
      name: 'PREMIUM', icon: '🔥', price: '1,999', description: 'Most loved by our members', saving: '20%',
      popular: true, btnText: '🚀 Get Premium Now',
      features: ['24/7 Gym access', '5 Guest passes/month', 'Personal trainer (4 sessions)', 'All equipment', 'Swimming pool', 'Group classes'],
      excluded: ['Private nutrition plan']
    },
    {
      name: 'ELITE', icon: '👑', price: '3,499', description: 'Ultimate fitness experience', saving: '30%',
      popular: false, btnText: 'Go Elite',
      features: ['24/7 VIP access', 'Unlimited guest passes', 'Dedicated personal trainer', 'All equipment', 'Swimming pool', 'Group classes', 'Custom nutrition plan'],
      excluded: []
    },
  ];

  payments: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPayments();
  }

  fetchPayments() {
    this.http.get<any[]>('http://localhost:5000/api/payments').subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.log('Error fetching payments:', err)
    });
  }

  purchasePlan(plan: string, amount: string) {
    this.http.post<any>('http://localhost:5000/api/create-checkout-session', { plan, amount }).subscribe({
      next: (session) => {
        if (session.url) window.location.href = session.url;
      },
      error: (err) => alert('Failed to initiate checkout. Is backend running?')
    });
  }
}
