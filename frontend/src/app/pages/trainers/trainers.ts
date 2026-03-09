import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 animate-fadeInUp">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black text-white">Our <span class="gradient-text">Trainers</span></h1>
          <p class="text-slate-500 mt-1">{{ trainers.length }} expert fitness coaches</p>
        </div>
        <button class="btn-primary">
          <i class="fas fa-plus"></i> Add Trainer
        </button>
      </div>

      <!-- Trainer Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        <div *ngFor="let t of trainers" class="glass-card p-6 flex flex-col items-center text-center group">
          <div class="relative mb-4">
            <div class="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl transition-transform duration-300 group-hover:scale-110"
                 style="background: linear-gradient(135deg, rgba(255,59,63,0.2), rgba(255,59,63,0.05));">
              {{ t.emoji }}
            </div>
            <span class="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  [class]="t.available ? 'bg-green-500' : 'bg-slate-500'">
              <i class="fas fa-check text-white text-xs"></i>
            </span>
          </div>
          <h3 class="text-white font-bold text-lg mb-1">{{ t.name }}</h3>
          <p class="text-red-400 text-sm font-semibold mb-1">{{ t.specialty }}</p>
          <p class="text-slate-500 text-xs mb-4">{{ t.experience }} experience</p>
          
          <!-- Rating -->
          <div class="flex gap-1 mb-4">
            <i *ngFor="let s of [1,2,3,4,5]" class="fas fa-star text-yellow-400 text-xs"></i>
            <span class="text-slate-500 text-xs ml-1">({{ t.reviews }})</span>
          </div>

          <!-- Stats -->
          <div class="w-full grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-white/5">
            <div class="text-center">
              <p class="text-white font-bold text-xl">{{ t.clients }}</p>
              <p class="text-slate-500 text-xs">Clients</p>
            </div>
            <div class="text-center">
              <p class="text-white font-bold text-xl">{{ t.sessions }}</p>
              <p class="text-slate-500 text-xs">Sessions</p>
            </div>
          </div>

          <div class="flex gap-2 w-full">
            <button class="flex-1 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                    style="background: linear-gradient(135deg, #FF3B3F, #cc2a2d);">Schedule</button>
            <button class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
              <i class="fas fa-ellipsis-v text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Schedule Table -->
      <div class="glass-card p-6">
        <h2 class="text-white font-bold text-xl mb-6">Weekly Schedule</h2>
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of schedule">
                <td>
                  <div class="flex items-center gap-2">
                    <span class="text-xl">{{ row.emoji }}</span>
                    <span class="text-white font-semibold text-sm">{{ row.name }}</span>
                  </div>
                </td>
                <td *ngFor="let slot of row.slots">
                  <span *ngIf="slot" class="px-2 py-1 rounded text-xs font-semibold"
                        style="background: rgba(255,59,63,0.15); color: #FF3B3F;">{{ slot }}</span>
                  <span *ngIf="!slot" class="text-slate-700 text-xs">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class TrainersComponent implements OnInit {
  trainers: any[] = [];

  schedule = [
    { name: 'Arjun Singh', emoji: '💪', slots: ['6-8 AM', '10-12 PM', '6-8 AM', '10-12 PM', '6-8 AM', '8-10 AM'] },
    { name: 'Priya Sharma', emoji: '🏃', slots: ['', '6-8 PM', '', '6-8 PM', '', '10-12 PM'] },
    { name: 'Rahul Gupta', emoji: '🧘', slots: ['7-9 AM', '', '7-9 AM', '', '7-9 AM', '7-9 AM'] },
    { name: 'Neha Verma', emoji: '🥗', slots: ['2-4 PM', '2-4 PM', '2-4 PM', '', '2-4 PM', ''] },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTrainers();
  }

  fetchTrainers() {
    this.http.get<any[]>('http://localhost:5000/api/trainers').subscribe({
      next: (data) => this.trainers = data,
      error: (err) => console.log('Backend offline, failed fetching trainers:', err)
    });
  }
}
