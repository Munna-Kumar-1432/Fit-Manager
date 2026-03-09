import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer style="background: linear-gradient(180deg, #0F172A, #020617); border-top: 1px solid rgba(255,59,63,0.15);"
            class="mt-auto py-8 px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
                   style="background: linear-gradient(135deg, #FF3B3F, #cc2a2d);">PF</div>
              <div>
                <h3 class="text-white font-black text-xl">POWERFIT</h3>
                <p class="text-red-400 text-xs font-medium">GYM MANAGEMENT SYSTEM</p>
              </div>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed max-w-xs">
              Premium gym management solution. Track members, trainers, and revenue all in one powerful dashboard.
            </p>
            <div class="flex gap-3 mt-4">
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500 transition-all text-sm">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-500 transition-all text-sm">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 transition-all text-sm">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all text-sm">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-white font-bold mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-slate-500 hover:text-red-400 transition-colors text-sm">Dashboard</a></li>
              <li><a href="#" class="text-slate-500 hover:text-red-400 transition-colors text-sm">Members</a></li>
              <li><a href="#" class="text-slate-500 hover:text-red-400 transition-colors text-sm">Trainers</a></li>
              <li><a href="#" class="text-slate-500 hover:text-red-400 transition-colors text-sm">Membership Plans</a></li>
              <li><a href="#" class="text-slate-500 hover:text-red-400 transition-colors text-sm">Analytics</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white font-bold mb-4 text-sm uppercase tracking-widest">Contact</h4>
            <ul class="space-y-3">
              <li class="flex items-center gap-2 text-slate-500 text-sm">
                <i class="fas fa-user text-red-400 w-4"></i>
                <span>Munna Kumar</span>
              </li>
              <li class="flex items-center gap-2 text-slate-500 text-sm">
                <i class="fas fa-envelope text-red-400 w-4"></i>
                <a href="mailto:codewithmunna513@gmail.com" class="hover:text-red-400 transition-colors break-all">
                  codewithmunna513&#64;gmail.com
                </a>
              </li>
              <li class="flex items-center gap-2 text-slate-500 text-sm">
                <i class="fas fa-code text-red-400 w-4"></i>
                <span>Angular 19 + Tailwind CSS</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-6 border-t border-red-900/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-slate-600 text-sm">
            © 2026 <span class="text-red-400 font-semibold">PowerFit GYM</span> — Built with ❤️ by 
            <span class="text-white font-semibold">Munna Kumar</span>
          </p>
          <div class="flex gap-4 text-xs text-slate-600">
            <a href="#" class="hover:text-red-400 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-red-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
