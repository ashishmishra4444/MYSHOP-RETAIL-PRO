import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, User, Building2, Calendar, Eye, KeyRound, X, Clock, Info, CheckCircle2, MapPin, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useToolbar } from "@/lib/erp-context";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — MyShop Retail Pro" }] }),
  component: LoginPage,
});

// Simple hash helper to represent hashed passwords securely
const hashPassword = (password: string) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};

function LoginPage() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { logActivity, setCurrentUser } = useToolbar();

  const [selectedUser, setSelectedUser] = useState("admin");
  const [password, setPassword] = useState("adminpass");
  const [showPassword, setShowPassword] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true }));
      setDate(now.toLocaleDateString("en-GB"));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_users");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUsersList(parsed);
          if (parsed.length > 0) {
            setSelectedUser(parsed[0].username);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaultUsers = [
          { id: 1, name: "Admin Operator", username: "admin", role: "Administrator", status: "Active" },
          { id: 2, name: "Amit Kumar", username: "amit", role: "Administrator", status: "Active" },
          { id: 3, name: "Cashier Terminal 1", username: "cashier1", role: "Cashier", status: "Active" }
        ];
        setUsersList(defaultUsers);
        localStorage.setItem("myshop_users", JSON.stringify(defaultUsers));
      }

      // Initialize credentials if not present
      const savedCreds = localStorage.getItem("myshop_credentials");
      if (!savedCreds) {
        const defaultCreds: Record<string, string> = {
          admin: hashPassword("adminpass"),
          amit: hashPassword("amitpass"),
          cashier1: hashPassword("cashier1pass")
        };
        localStorage.setItem("myshop_credentials", JSON.stringify(defaultCreds));
      }
    }
  }, []);

  // Update password field to match selected user default profile for convenience
  useEffect(() => {
    if (selectedUser === "admin") {
      setPassword("adminpass");
    } else if (selectedUser === "amit") {
      setPassword("amitpass");
    } else if (selectedUser === "cashier1") {
      setPassword("cashier1pass");
    } else {
      setPassword(selectedUser + "pass");
    }
  }, [selectedUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = usersList.find((u) => u.username.toLowerCase() === selectedUser.toLowerCase());
    if (!user) {
      toast.error("Invalid user selection.");
      return;
    }

    if (user.status !== "Active") {
      toast.error(`User profile @${user.username} is currently inactive.`);
      return;
    }

    const savedCreds = localStorage.getItem("myshop_credentials");
    let credentials: Record<string, string> = {};
    if (savedCreds) {
      try {
        credentials = JSON.parse(savedCreds);
      } catch (e) {}
    }

    const expectedHash = credentials[user.username.toLowerCase()] || hashPassword(user.username.toLowerCase() + "pass");

    if (hashPassword(password) !== expectedHash) {
      logActivity("LOGIN_FAILURE", `Failed login attempt for user @${user.username}`);
      toast.error("Incorrect password. Please try again.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_session_active", "true");
      setCurrentUser(user);
    }

    logActivity("LOGIN_SUCCESS", `User @${user.username} logged in successfully.`);
    toast.success(`Welcome back, ${user.name}!`);
    
    if (user.role === "Cashier" || user.role === "Billing Staff") {
      navigate({ to: "/pos", replace: true });
    } else {
      navigate({ to: "/", replace: true });
    }
  };


  return (
    <div className="flex h-screen flex-col bg-white text-slate-800 overflow-hidden font-sans select-none">
      
      {/* Title Bar */}
      <div className="flex h-8 items-center justify-between bg-[#0047BA] px-3 text-white">
        <div className="flex items-center gap-2 text-[12.5px] font-medium">
          <div className="grid h-5 w-5 place-items-center rounded-sm bg-white/20 text-[10px] font-bold">MS</div>
          <span>MyShop Retail Pro - Login</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono select-none">
          <button className="hover:bg-white/10 px-2 py-0.5 rounded-sm">—</button>
          <button className="hover:bg-white/10 px-2 py-0.5 rounded-sm">▢</button>
          <button className="hover:bg-[#d32f2f] px-2 py-0.5 rounded-sm">✕</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-4xl space-y-5">
          
          {/* Top Logo and Tagline Grid */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Left Logo */}
              <div className="flex flex-col select-none font-sans italic">
                <span className="text-5xl font-bold tracking-tight text-[#0047BA] leading-none">MyShop</span>
                <span className="text-[23px] font-bold text-[#D32F2F] tracking-tight self-end pr-1">Retail Pro</span>
              </div>
              
              {/* Separator and Slogan */}
              <div className="h-14 w-[1px] bg-slate-300"></div>
              <div>
                <div className="text-sm text-slate-500">Welcome to</div>
                <div className="text-2xl font-bold text-slate-800 -mt-1">MyShop Retail Pro</div>
                <div className="text-[12.5px] text-slate-500 font-medium">Retail Billing &amp; Inventory Management Software</div>
              </div>
            </div>

            {/* Right Top Illustration */}
            <div className="flex items-center">
              <svg className="h-16 w-36" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="10" width="44" height="28" rx="2" fill="#0047BA" />
                <rect x="18" y="13" width="38" height="22" fill="white" />
                <path d="M23 18h2.5l2 5h8.5l1.5-3.5h-9.5" stroke="#0047BA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="28.5" cy="25.5" r="1.2" fill="#0047BA" />
                <circle cx="35.5" cy="25.5" r="1.2" fill="#0047BA" />
                <path d="M32 38h10v4H32z" fill="#0A2A5C" />
                <path d="M27 42h20v2H27z" fill="#0A2A5C" />

                <rect x="68" y="22" width="20" height="28" rx="2" fill="#0A2A5C" />
                <rect x="71" y="25" width="14" height="7" fill="#E6EFFC" />
                <circle cx="73" cy="36" r="1" fill="white" />
                <circle cx="78" cy="36" r="1" fill="white" />
                <circle cx="83" cy="36" r="1" fill="white" />
                <circle cx="73" cy="40" r="1" fill="white" />
                <circle cx="78" cy="40" r="1" fill="white" />
                <circle cx="83" cy="40" r="1" fill="white" />
                <circle cx="73" cy="44" r="1" fill="white" />
                <circle cx="78" cy="44" r="1" fill="white" />
                <circle cx="83" cy="44" r="1" fill="white" />

                <rect x="99" y="12" width="28" height="22" rx="2" fill="#0047BA" />
                <rect x="103" y="9" width="20" height="5" fill="#E2E8F0" />
                <path d="M106 11h14" stroke="#4A5568" strokeWidth="1" />
                <rect x="99" y="30" width="28" height="16" fill="#F59E0B" rx="1" />
                <path d="M103 34h2v8h-2zm4 0h1v8h-1zm3 0h2v8h-2zm4 0h1v8h-1zm3 0h2v8h-2z" fill="#000" />
              </svg>
            </div>
          </div>

          {/* Login Card Panel */}
          <div className="rounded-md border border-[#C2D6E9] bg-white shadow-xl overflow-hidden">
            {/* Card Header tab */}
            <div className="flex items-center gap-2 bg-[#E5EFFC] px-4 py-2.5 border-b border-[#C2D6E9] text-[#0047BA] font-semibold text-sm">
              <Lock className="h-4.5 w-4.5 stroke-[2.5]" /> User Login
            </div>
            
            {/* Card Grid Content */}
            <div className="grid grid-cols-[260px_1fr] gap-4 p-8 items-center bg-white">
              {/* Left Side Illustration */}
              <div className="flex items-center justify-center border-r border-slate-100 pr-6">
                <svg className="h-40 w-48" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="15" y="10" width="70" height="46" rx="3" fill="#1A365D" />
                  <rect x="19" y="14" width="62" height="38" fill="white" />
                  <path d="M44 56h12v10H44z" fill="#0F172A" />
                  <path d="M35 66h30v3H35z" fill="#0F172A" />
                  <circle cx="50" cy="27" r="8" fill="#0047BA" />
                  <path d="M34 45c0-6 7-8 16-8s16 2 16 8v3H34v-3z" fill="#0047BA" />
                  <ellipse cx="50" cy="74" rx="30" ry="3" fill="#E2E8F0" />
                  <rect x="65" y="44" width="22" height="18" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
                  <path d="M70 44v-4c0-3.3 2.7-6 6-6s6 2.7 6 6v4" stroke="#475569" strokeWidth="2" fill="none" />
                  <circle cx="76" cy="51" r="1.5" fill="#000" />
                  <path d="M76 52.5v4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleLogin} className="space-y-3 pl-4">
                
                <FieldRow label="User Name" icon={<User className="h-4 w-4 text-slate-500" />}>
                  <select 
                    value={selectedUser} 
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="erp-input w-full border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm font-semibold"
                  >
                    {usersList.map((u) => (
                      <option key={u.id} value={u.username}>
                        {u.username.toUpperCase()} ({u.role})
                      </option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow label="Password" icon={<Lock className="h-4 w-4 text-slate-500" />}>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="erp-input w-full pr-9 border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm font-mono" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FieldRow>

                <FieldRow label="Branch" icon={<Building2 className="h-4 w-4 text-slate-500" />}>
                  <select className="erp-input w-full border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm">
                    <option>Main Location</option>
                    <option>Branch Division 2</option>
                  </select>
                </FieldRow>

                <FieldRow label="Financial Year" icon={<Calendar className="h-4 w-4 text-slate-500" />}>
                  <select className="erp-input w-full border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm">
                    <option>2024-2025</option>
                    <option>2023-2024</option>
                  </select>
                </FieldRow>

                {/* Form Buttons */}
                <div className="flex gap-2.5 pt-3">
                  <button 
                    type="submit" 
                    className="flex h-9 items-center gap-1.5 rounded-sm bg-[#0047BA] hover:bg-[#003da8] px-6 font-semibold text-white transition-colors cursor-pointer"
                  >
                    <Lock className="h-4 w-4" /> Login
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setPassword("");
                    }}
                    className="flex h-9 items-center gap-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 px-5 text-slate-700 font-semibold transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={() => toast.info("Password changes require administrator privileges.")}
                    className="flex h-9 items-center gap-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 px-4 text-slate-700 font-semibold transition-colors cursor-pointer"
                  >
                    <KeyRound className="h-4 w-4" /> Change Password
                  </button>
                </div>
              </form>
            </div>

            {/* Login Card Footer bar */}
            <div className="flex items-center justify-around border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[12px] text-slate-500">
              <span className="flex items-center gap-1"><Info className="h-4 w-4 text-[#0047BA]" /> Version : 1.0.0.0</span>
              <span className="flex items-center gap-1.5"><svg className="h-4 w-4 text-[#0047BA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> RC433</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#0047BA]" /> {date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#0047BA]" /> {time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Window Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-[#E5EFFC] px-6 py-2.5 text-[12.5px] font-semibold text-[#0047BA]">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4.5 w-4.5 text-[#0047BA]" /> Licensed To : <b className="text-slate-800">BEST SUPER MARKET</b>
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4.5 w-4.5 text-[#0047BA]" /> Main Division | Main Location
        </span>
        <span className="text-slate-600 font-medium">© {new Date().getFullYear()} MyShop Retail Pro. All Rights Reserved.</span>
      </div>
    </div>
  );
}

function FieldRow({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] items-center gap-4">
      <div className="text-[13px] font-semibold text-[#0047BA]">{label}</div>
      <div className="relative flex-1">
        <div className="pointer-events-none absolute left-2.5 top-1.5 z-10">{icon}</div>
        <div className="[&_input]:pl-9 [&_select]:pl-9">{children}</div>
      </div>
    </div>
  );
}
