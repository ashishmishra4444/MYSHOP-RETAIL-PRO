import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, User, Building2, Calendar, Eye, KeyRound, X, ShoppingCart, Monitor, Info, Clock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — MyShop Retail Pro" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex h-screen flex-col bg-[#F5DEB3] text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 flex h-8 items-center justify-between bg-black/40 backdrop-blur-md px-3 text-white/80 border-b border-white/10">
        <div className="flex items-center gap-2 text-[12.5px] font-medium">
          <div className="grid h-5 w-5 place-items-center rounded-sm bg-white/15 text-[10px] font-bold">MS</div>
          <span>MyShop Retail Pro — Login</span>
        </div>
        <div className="flex items-center gap-3 text-xs opacity-80">— ▢ ✕</div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between border-b border-white/20 pb-5">
            <div className="flex items-end gap-6">
              <div>
                <div className="font-serif text-5xl font-extrabold italic text-white leading-none drop-shadow-md">MyShop</div>
                <div className="ml-10 font-serif text-3xl font-extrabold italic text-indigo-400 drop-shadow-sm">Retail Pro</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <div className="text-sm text-white/60">Welcome to</div>
                <div className="text-2xl font-bold text-white">MyShop Retail Pro</div>
                <div className="text-[13px] text-white/60">Retail Billing &amp; Inventory Management Software</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <ShoppingCart className="h-12 w-12 drop-shadow-md" />
              <Monitor className="h-12 w-12 drop-shadow-md" />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 px-4 py-3 border-b border-white/10 text-white font-medium text-sm">
              <Lock className="h-4 w-4 text-indigo-300" /> User Login
            </div>
            <div className="grid grid-cols-2 gap-8 p-8 text-white/90">
              <div className="flex items-center justify-center">
                <div className="relative grid h-48 w-56 place-items-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                  <Monitor className="h-32 w-32 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" strokeWidth={1.2} />
                  <Lock className="absolute right-6 bottom-6 h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-2 text-white shadow-lg shadow-rose-500/30" />
                </div>
              </div>
              <form className="space-y-4">
                <FieldRow icon={<User className="h-4 w-4" />} label="User Name">
                  <input className="erp-input w-full bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md" defaultValue="ADMIN" />
                </FieldRow>
                <FieldRow icon={<KeyRound className="h-4 w-4" />} label="Password">
                  <div className="relative">
                    <input type="password" className="erp-input w-full pr-9 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md" defaultValue="adminpass" />
                    <Eye className="absolute right-2 top-1.5 h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer transition-colors" />
                  </div>
                </FieldRow>
                <FieldRow icon={<Building2 className="h-4 w-4" />} label="Branch">
                  <select className="erp-input w-full bg-black/20 border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md [&>option]:bg-slate-900"><option>Main Location</option><option>Branch 2</option></select>
                </FieldRow>
                <FieldRow icon={<Calendar className="h-4 w-4" />} label="Financial Year">
                  <select className="erp-input w-full bg-black/20 border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md [&>option]:bg-slate-900"><option>2024-2025</option><option>2023-2024</option></select>
                </FieldRow>
                <label className="flex items-center gap-2 text-[12.5px] text-white/70 hover:text-white cursor-pointer transition-colors">
                  <input type="checkbox" className="rounded bg-black/20 border-white/20 text-indigo-500 focus:ring-indigo-500" defaultChecked /> Remember me
                </label>
                <div className="flex gap-3 pt-2">
                  <Link to="/" className="flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-5 font-semibold text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all">
                    <Lock className="h-4 w-4" /> Login
                  </Link>
                  <button type="button" className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 text-white hover:bg-white/10 transition-all">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button type="button" className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 text-white hover:bg-white/10 transition-all">
                    <KeyRound className="h-4 w-4" /> Change Password
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-2 text-[12px] text-white/50 backdrop-blur-sm">
              <span className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5"/> Version : 1.0.0.0</span>
              <span>RC433</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5"/> {new Date().toLocaleDateString("en-GB")}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/> {new Date().toLocaleTimeString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 text-[12px] text-white/60">
        <span>Licensed To : <b className="text-white/90">BEST SUPER MARKET</b></span>
        <span>Main Division | Main Location</span>
        <span>© {new Date().getFullYear()} MyShop Retail Pro. All Rights Reserved.</span>
      </div>
    </div>
  );
}

function FieldRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-3">
      <div className="flex items-center gap-2 font-medium text-white/90"><span className="text-rose-400">*</span>{label}</div>
      <div className="relative">
        <div className="pointer-events-none absolute left-2 top-1.5 text-white/50">{icon}</div>
        <div className="[&_input]:pl-8 [&_select]:pl-8">{children}</div>
      </div>
    </div>
  );
}
