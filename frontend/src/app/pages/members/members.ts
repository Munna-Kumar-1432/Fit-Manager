import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8 animate-fadeInUp">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black text-white">Member <span class="gradient-text">Management</span></h1>
          <p class="text-slate-500 mt-1">{{ members.length }} total members registered</p>
        </div>
        <button class="btn-primary" (click)="showModal = true">
          <i class="fas fa-plus"></i> Add New Member
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="glass-card p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-48 flex items-center gap-2 px-3 py-2 rounded-lg"
             style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.15);">
          <i class="fas fa-search text-slate-500 text-sm"></i>
          <input type="text" placeholder="Search members..." [(ngModel)]="searchQuery"
                 class="bg-transparent outline-none text-white placeholder-slate-500 text-sm flex-1">
        </div>
        <select [(ngModel)]="filterStatus"
                class="px-3 py-2 rounded-lg text-sm text-slate-300 outline-none cursor-pointer"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.15);">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Pending">Pending</option>
        </select>
        <select [(ngModel)]="filterPlan"
                class="px-3 py-2 rounded-lg text-sm text-slate-300 outline-none cursor-pointer"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.15);">
          <option value="">All Plans</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Elite">Elite</option>
        </select>
        <span class="text-slate-500 text-sm ml-auto">Showing {{ filteredMembers.length }} results</span>
      </div>

      <!-- Members Table -->
      <div class="glass-card overflow-x-auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Member</th>
              <th>Contact</th>
              <th>Plan</th>
              <th>Joined</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let m of filteredMembers">
              <td>
                <div *ngIf="m.photoUrl" class="w-10 h-10 rounded-full bg-cover bg-center border border-red-500/30" [style.backgroundImage]="'url(' + m.photoUrl + ')'"></div>
                <div *ngIf="!m.photoUrl" class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style="background: linear-gradient(135deg, #FF3B3F, #cc2a2d);">
                   {{ m.name.charAt(0) }}
                </div>
              </td>
              <td>
                <div>
                  <p class="text-white font-semibold text-sm">{{ m.name }} <span class="text-red-400 font-mono text-xs ml-1">({{ m.id }})</span></p>
                  <p class="text-slate-500 text-xs">{{ m.age }} yrs • {{ m.gender }}</p>
                </div>
              </td>
              <td>
                <p class="text-sm text-white">{{ m.phone }}</p>
                <p class="text-xs text-slate-500">{{ m.email }}</p>
              </td>
              <td>
                <span class="px-3 py-1 rounded-full text-xs font-bold"
                      [style.background]="m.plan === 'Elite' ? 'rgba(234,179,8,0.15)' : m.plan === 'Premium' ? 'rgba(255,59,63,0.15)' : 'rgba(100,100,100,0.15)'"
                      [style.color]="m.plan === 'Elite' ? '#EAB308' : m.plan === 'Premium' ? '#FF3B3F' : '#94a3b8'">
                  {{ m.plan }}
                </span>
              </td>
              <td>{{ m.joined }}</td>
              <td>{{ m.expires }}</td>
              <td><span class="badge" [class]="m.statusClass">{{ m.status }}</span></td>
              <td>
                <div class="flex gap-2">
                  <button class="w-7 h-7 rounded flex items-center justify-center text-xs text-blue-400 hover:bg-blue-500/20 transition-colors">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="w-7 h-7 rounded flex items-center justify-center text-xs text-red-400 hover:bg-red-500/20 transition-colors" (click)="deleteMember(m._id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="filteredMembers.length === 0">
              <td colspan="8" class="text-center py-6 text-slate-500">No members found... Click Add New Member to get started</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Member Modal -->
    <div *ngIf="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4"
         style="background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);">
      <div class="w-full max-w-lg glass-card p-6 animate-fadeInUp">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-white font-bold text-xl">Add New Member</h2>
          <button (click)="showModal = false" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form (ngSubmit)="submitForm()">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Member Photo (Optional)</label>
              <input type="file" (change)="onFileSelected($event)" accept="image/*"
                     class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
                     style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.2);">
            </div>
            <div class="col-span-2">
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Full Name</label>
              <input type="text" placeholder="Enter full name" [(ngModel)]="newMember.name" name="name" required
                     class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
                     style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.2);">
            </div>
            <div>
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Phone</label>
              <input type="text" placeholder="+91 XXXXX XXXXX" [(ngModel)]="newMember.phone" name="phone" required
                     class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none"
                     style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.2);">
            </div>
            <div>
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Gender</label>
              <select [(ngModel)]="newMember.gender" name="gender" required
                      class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none cursor-pointer"
                      style="background: rgba(15,23,42,0.9); border: 1px solid rgba(255,59,63,0.2);">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Age</label>
              <input type="number" placeholder="25" [(ngModel)]="newMember.age" name="age" required
                     class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none"
                     style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.2);">
            </div>
            <div>
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Plan</label>
              <select [(ngModel)]="newMember.plan" name="plan" required
                      class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none cursor-pointer"
                      style="background: rgba(15,23,42,0.9); border: 1px solid rgba(255,59,63,0.2);">
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Elite">Elite</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Email</label>
              <input type="email" placeholder="member@email.com" [(ngModel)]="newMember.email" name="email" required
                     class="w-full px-4 py-3 rounded-lg text-white text-sm outline-none"
                     style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,59,63,0.2);">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button type="submit" class="btn-primary flex-1 justify-center" [disabled]="isSubmitting">
              <i class="fas fa-plus"></i> {{ isSubmitting ? 'Saving...' : 'Add Member' }}
            </button>
            <button type="button" (click)="showModal = false" class="flex-1 py-2 rounded-lg font-semibold text-slate-400 transition-all hover:text-white"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class MembersComponent implements OnInit {
  showModal = false;
  searchQuery = '';
  filterStatus = '';
  filterPlan = '';
  isSubmitting = false;

  members: any[] = [];
  selectedFile: File | null = null;

  newMember: any = {
    name: '', phone: '', email: '', gender: 'Male', age: null, plan: 'Basic'
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.http.get<any[]>('http://localhost:5000/api/members').subscribe({
      next: (data) => this.members = data,
      error: (err) => console.log('Error fetching members', err)
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitForm() {
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.newMember.name);
    formData.append('phone', this.newMember.phone);
    formData.append('email', this.newMember.email);
    formData.append('gender', this.newMember.gender);
    formData.append('age', this.newMember.age);
    formData.append('plan', this.newMember.plan);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.http.post('http://localhost:5000/api/members', formData).subscribe({
      next: (res) => {
        this.fetchMembers();
        this.isSubmitting = false;
        this.showModal = false;
        this.newMember = { name: '', phone: '', email: '', gender: 'Male', age: null, plan: 'Basic' };
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        alert('Error saving member!');
      }
    });
  }

  deleteMember(id: string) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.http.delete(`http://localhost:5000/api/members/${id}`).subscribe({
        next: () => this.fetchMembers(),
        error: (err) => console.log(err)
      });
    }
  }

  get filteredMembers() {
    return this.members.filter(m =>
      (!this.searchQuery || m.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || m.email.includes(this.searchQuery)) &&
      (!this.filterStatus || m.status === this.filterStatus) &&
      (!this.filterPlan || m.plan === this.filterPlan)
    );
  }
}
