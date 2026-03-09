import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- HERO SECTION -->
    <section class="hero-section min-h-screen flex items-center relative">
      <img src="gym-interior.png" alt="PowerFit Gym Interior"
           class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="hero-overlay"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
               style="background: rgba(255,59,63,0.15); border: 1px solid rgba(255,59,63,0.3); color: #FF3B3F;">
            <span class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            #1 GYM MANAGEMENT PLATFORM
          </div>

          <h1 class="font-black leading-none mb-6" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 7rem); color: white;">
            TRANSFORM YOUR<br>
            <span class="gradient-text">GYM BUSINESS</span>
          </h1>

          <p class="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
            Manage members, trainers, memberships and revenue with our ultra-modern gym management system. Built for champions, by champions. 💪
          </p>

          <div class="flex flex-wrap gap-4">
            <a routerLink="/dashboard" class="btn-primary text-lg px-8 py-4">
              <i class="fas fa-chart-line"></i> Go to Dashboard
            </a>
            <a routerLink="/members" class="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:bg-white/10"
               style="border: 1px solid rgba(255,255,255,0.2); font-size: 1rem;">
              <i class="fas fa-users mr-2"></i> View Members
            </a>
          </div>

          <!-- Stats row -->
          <div class="flex flex-wrap gap-8 mt-12 pt-12 border-t border-white/10">
            <div>
              <p class="text-4xl font-black text-white animate-glow">1,240+</p>
              <p class="text-slate-400 text-sm mt-1">Active Members</p>
            </div>
            <div>
              <p class="text-4xl font-black text-white">28</p>
              <p class="text-slate-400 text-sm mt-1">Expert Trainers</p>
            </div>
            <div>
              <p class="text-4xl font-black" style="color: #22C55E;">₹4.2L</p>
              <p class="text-slate-400 text-sm mt-1">Monthly Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY SECTION -->
    <section class="py-20 px-8" style="background: linear-gradient(180deg, #020617, #0F172A);">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-red-400 font-bold text-sm uppercase tracking-widest mb-2">Our Facility</p>
          <h2 class="text-4xl font-black text-white">WORLD CLASS <span class="gradient-text">EQUIPMENT</span></h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="relative overflow-hidden rounded-2xl group" style="height: 300px;">
            <img src="trainer-client.png" alt="Personal Training"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-red-400 text-xs font-bold uppercase tracking-wider">Personal Training</p>
              <h3 class="text-white font-bold text-xl">1-on-1 Sessions</h3>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl group" style="height: 300px;">
            <img src="gym-equipment.png" alt="Equipment"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-red-400 text-xs font-bold uppercase tracking-wider">Premium Gear</p>
              <h3 class="text-white font-bold text-xl">Pro Equipment</h3>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl group" style="height: 300px;">
            <img src="cardio-area.png" alt="Cardio Zone"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-red-400 text-xs font-bold uppercase tracking-wider">Cardio Zone</p>
              <h3 class="text-white font-bold text-xl">Cardio Area</h3>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl group" style="height: 300px;">
            <img src="athlete-barbell.png" alt="Weight Training"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-red-400 text-xs font-bold uppercase tracking-wider">Weight Training</p>
              <h3 class="text-white font-bold text-xl">Strength Zone</h3>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl group md:col-span-2" style="height: 300px;">
            <img src="yoga-area.png" alt="Yoga Area"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-red-400 text-xs font-bold uppercase tracking-wider">Wellness</p>
              <h3 class="text-white font-bold text-xl">Yoga & Stretching Area</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRAINERS SECTION -->
    <section class="py-20 px-8" style="background: #020617;">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-red-400 font-bold text-sm uppercase tracking-widest mb-2">Expert Team</p>
          <h2 class="text-4xl font-black text-white">MEET OUR <span class="gradient-text">TRAINERS</span></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let trainer of trainers" class="glass-card p-6 text-center">
            <div class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                 style="background: linear-gradient(135deg, rgba(255,59,63,0.2), rgba(255,59,63,0.05)); border: 2px solid rgba(255,59,63,0.3);">
              {{ trainer.emoji }}
            </div>
            <h3 class="text-white font-bold text-lg">{{ trainer.name }}</h3>
            <p class="text-red-400 text-sm font-medium mb-4">{{ trainer.specialty }}</p>
            <div class="flex justify-center gap-1 mb-4">
              <span *ngFor="let s of [1,2,3,4,5]" class="text-yellow-400 text-xs">★</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5">
              <span>{{ trainer.experience }} exp</span>
              <span class="badge badge-success">Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MEMBERSHIP BANNER -->
    <section class="py-20 px-8" style="background: linear-gradient(135deg, #0F172A, #1a0a0a);">
      <div class="max-w-7xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl p-12"
             style="background: linear-gradient(135deg, rgba(255,59,63,0.15), rgba(255,59,63,0.05)); border: 1px solid rgba(255,59,63,0.3);">
          <div class="absolute top-0 right-0 w-96 h-96 opacity-10"
               style="background: radial-gradient(circle, #FF3B3F, transparent); border-radius: 50%;"></div>
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p class="text-red-400 font-bold text-sm uppercase tracking-widest mb-3">🔥 Limited Time Offer</p>
              <h2 class="text-5xl font-black text-white mb-4">JOIN NOW<br>SAVE <span class="gradient-text">50%</span></h2>
              <p class="text-slate-400 mb-6">Get premium membership at half the price. Transform your body. Transform your life. The journey starts today.</p>
              <a routerLink="/membership" class="btn-primary text-lg px-8 py-4">
                <i class="fas fa-fire"></i> View Plans
              </a>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="stat-card text-center">
                <p class="text-3xl font-black text-white mb-1">500+</p>
                <p class="text-slate-400 text-sm">Equipment Pieces</p>
              </div>
              <div class="stat-card text-center">
                <p class="text-3xl font-black" style="color: #22C55E;">24/7</p>
                <p class="text-slate-400 text-sm">Gym Access</p>
              </div>
              <div class="stat-card text-center">
                <p class="text-3xl font-black text-white mb-1">50+</p>
                <p class="text-slate-400 text-sm">Classes/Week</p>
              </div>
              <div class="stat-card text-center">
                <p class="text-3xl font-black" style="color: #FF3B3F;">5⭐</p>
                <p class="text-slate-400 text-sm">Member Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  trainers: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/trainers').subscribe({
      next: (data) => this.trainers = data.slice(0, 4),
      error: (err) => console.log('Backend offline, using mock trainers')
    });
  }
}
