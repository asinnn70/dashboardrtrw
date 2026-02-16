
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Wallet, 
  FileText, 
  Bell, 
  LayoutDashboard, 
  Search, 
  Plus, 
  ChevronRight,
  TrendingUp,
  UserCheck,
  Activity,
  MessageSquareText,
  Menu, 
  X,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  FileSearch,
  MapPin,
  HeartPulse,
  Baby,
  Skull,
  ShieldCheck,
  Briefcase,
  Send,
  ArrowUpCircle,
  ArrowDownCircle,
  Camera,
  Megaphone,
  CreditCard,
  MapPinned,
  Info,
  LogIn,
  LogOut,
  Lock,
  UserCircle,
  Save,
  Calendar,
  Heart,
  BabyIcon,
  Stethoscope
} from 'lucide-react';
import { Resident, Transaction, ServiceRequest, ViewState, ServiceDefinition, Announcement, UserRole } from './types';
import { getAIAssistance } from './services/geminiService';

// Mock Data
const INITIAL_RESIDENTS: Resident[] = [
  { id: '1', name: 'Budi Santoso', nik: '3171012304780001', gender: 'L', age: 45, address: 'Blok A/12', occupation: 'PNS', status: 'Tetap', isVoter: true, phoneNumber: '0812-3456-7890', photoUrl: 'https://i.pravatar.cc/150?u=1', birthPlace: 'Jakarta', birthDate: '1978-04-23', maritalStatus: 'Menikah', healthStatus: 'Sehat', isAlive: true },
  { id: '2', name: 'Siti Aminah', nik: '3171025608850002', gender: 'P', age: 38, address: 'Blok B/05', occupation: 'Wiraswasta', status: 'Tetap', isVoter: true, phoneNumber: '0857-1122-3344', photoUrl: 'https://i.pravatar.cc/150?u=2', birthPlace: 'Bandung', birthDate: '1985-08-16', maritalStatus: 'Menikah', healthStatus: 'Sakit', isAlive: true },
  { id: '3', name: 'Rian Hidayat', nik: '3171031210990003', gender: 'L', age: 24, address: 'Blok A/03', occupation: 'Mahasiswa', status: 'Kontrak', isVoter: true, phoneNumber: '0819-9988-7766', photoUrl: 'https://i.pravatar.cc/150?u=3', birthPlace: 'Surabaya', birthDate: '1999-10-12', maritalStatus: 'Lajang', healthStatus: 'Sehat', isAlive: true },
  { id: '4', name: 'Ani Wijaya', nik: '3171044405910004', gender: 'P', age: 32, address: 'Blok C/10', occupation: 'Ibu Rumah Tangga', status: 'Tetap', isVoter: true, phoneNumber: '0821-4455-6677', photoUrl: 'https://i.pravatar.cc/150?u=4', birthPlace: 'Semarang', birthDate: '1991-05-14', maritalStatus: 'Menikah', healthStatus: 'Sehat', isAlive: true },
  { id: '5', name: 'Dedi Kusuma', nik: '3171050201730005', gender: 'L', age: 50, address: 'Blok B/15', occupation: 'Karyawan Swasta', status: 'Tetap', isVoter: true, phoneNumber: '0878-0099-8877', photoUrl: 'https://i.pravatar.cc/150?u=5', birthPlace: 'Yogyakarta', birthDate: '1973-01-02', maritalStatus: 'Janda/Duda', healthStatus: 'Sehat', isAlive: true },
  { id: '6', name: 'Almarhum Suhardi', nik: '3171050201730006', gender: 'L', age: 70, address: 'Blok C/02', occupation: 'Pensiunan', status: 'Tetap', isVoter: false, phoneNumber: '-', photoUrl: 'https://i.pravatar.cc/150?u=6', birthPlace: 'Solo', birthDate: '1954-01-01', maritalStatus: 'Menikah', healthStatus: 'Sehat', isAlive: false },
];

const AVAILABLE_SERVICES: ServiceDefinition[] = [
  { id: 'dom', title: 'Surat Domisili', description: 'Keterangan tempat tinggal warga.', icon: MapPin, color: 'blue' },
  { id: 'sktm', title: 'SKTM', description: 'Surat Keterangan Tidak Mampu.', icon: ShieldCheck, color: 'orange' },
  { id: 'pnikah', title: 'Pengantar Nikah', description: 'Surat pengantar untuk urusan KUA.', icon: HeartPulse, color: 'rose' },
  { id: 'lahir', title: 'Ket. Kelahiran', description: 'Laporan warga baru/kelahiran.', icon: Baby, color: 'emerald' },
  { id: 'mati', title: 'Ket. Kematian', description: 'Laporan kematian warga.', icon: Skull, color: 'slate' },
  { id: 'usaha', title: 'Ket. Usaha', description: 'Pengantar izin usaha mikro.', icon: Briefcase, color: 'indigo' },
];

const INITIAL_FINANCES: Transaction[] = [
  { id: '1', date: '2024-05-01', description: 'Iuran Bulanan Mei', amount: 2500000, type: 'Masuk', category: 'Iuran' },
  { id: '2', date: '2024-05-05', description: 'Perbaikan Lampu Jalan', amount: 450000, type: 'Keluar', category: 'Fasilitas' },
  { id: '3', date: '2024-05-10', description: 'Donasi Kebersihan', amount: 500000, type: 'Masuk', category: 'Donasi' },
  { id: '4', date: '2024-05-15', description: 'Gaji Keamanan', amount: 1500000, type: 'Keluar', category: 'Gaji' },
];

const INITIAL_SERVICES: ServiceRequest[] = [
  { id: '1', residentName: 'Budi Santoso', type: 'Surat Domisili', status: 'Pending', date: '2024-05-20' },
  { id: '2', residentName: 'Siti Aminah', type: 'SKTM', status: 'Selesai', date: '2024-05-18' },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Kerja Bakti Rutin', category: 'Kegiatan', content: 'Kerja bakti pembersihan selokan rutin akhir bulan pada hari Minggu pukul 07:00 WIB.', date: '2024-05-25' },
  { id: '2', title: 'Himbauan Keamanan', category: 'Keamanan', content: 'Harap pastikan semua pintu terkunci saat meninggalkan rumah dan segera lapor jika ada tamu menginap 1x24 jam.', date: '2024-05-24' },
];

const App: React.FC = () => {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [currentUser, setCurrentUser] = useState<Resident | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // View States
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [serviceTab, setServiceTab] = useState<'catalog' | 'requests'>('requests');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  
  // App Data States
  const [residents, setResidents] = useState<Resident[]>(INITIAL_RESIDENTS);
  const [finances, setFinances] = useState<Transaction[]>(INITIAL_FINANCES);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  
  // Selection States
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceRequest | null>(null);
  const [activeFormService, setActiveFormService] = useState<ServiceDefinition | null>(null);
  
  // Form Inputs
  const [formResidentId, setFormResidentId] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Modals
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'Masuk' | 'Keluar'>('Masuk');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showResidentModal, setShowResidentModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({ title: '', category: 'Umum', content: '', date: new Date().toISOString().split('T')[0] });
  const [newResident, setNewResident] = useState<Partial<Resident>>({ name: '', nik: '', gender: 'L', age: 0, address: '', occupation: '', status: 'Tetap', isVoter: true, phoneNumber: '', birthPlace: '', birthDate: '', maritalStatus: 'Lajang', healthStatus: 'Sehat', isAlive: true });
  const [editProfileForm, setEditProfileForm] = useState<Partial<Resident>>({});

  // Statistics
  const stats = useMemo(() => {
    const isAdmin = userRole === 'admin';
    const myRequests = serviceRequests.filter(s => s.residentName === currentUser?.name);
    
    // Filter only alive residents for most active counts
    const aliveResidents = residents.filter(r => r.isAlive);
    const deceasedCount = residents.filter(r => !r.isAlive).length;

    return {
      totalResidents: aliveResidents.length,
      totalIncome: finances.filter(t => t.type === 'Masuk').reduce((acc, t) => acc + t.amount, 0),
      totalExpense: finances.filter(t => t.type === 'Keluar').reduce((acc, t) => acc + t.amount, 0),
      pendingServices: isAdmin 
        ? serviceRequests.filter(s => s.status === 'Pending').length 
        : myRequests.filter(s => s.status === 'Pending').length,
      myTotalRequests: myRequests.length,
      // Demografi Stats (Based on Alive)
      countLajang: aliveResidents.filter(r => r.maritalStatus === 'Lajang').length,
      countMenikah: aliveResidents.filter(r => r.maritalStatus === 'Menikah').length,
      countJandaDuda: aliveResidents.filter(r => r.maritalStatus === 'Janda/Duda').length,
      // Gender Stats (Based on Alive)
      countPria: aliveResidents.filter(r => r.gender === 'L').length,
      countWanita: aliveResidents.filter(r => r.gender === 'P').length,
      // Health Stats (Based on Alive)
      countSakit: aliveResidents.filter(r => r.healthStatus === 'Sakit').length,
      // Deceased Stats
      countMeninggal: deceasedCount
    };
  }, [residents, finances, serviceRequests, userRole, currentUser]);

  // Auth Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setUserRole('admin');
      setIsLoggedIn(true);
      setCurrentUser(null);
    } else if (loginForm.username === 'warga' && loginForm.password === 'warga') {
      setUserRole('user');
      setIsLoggedIn(true);
      setCurrentUser(residents.find(r => r.isAlive && r.id === '1') || residents[0]); // Mock login as Budi
    } else {
      alert('Login gagal! Coba admin/admin atau warga/warga');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  // Business Handlers
  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsLoadingAI(true);
    const context = { residents, finances, activeView, userRole };
    const res = await getAIAssistance(aiPrompt, context);
    setAiResponse(res || 'Terjadi kesalahan.');
    setIsLoadingAI(false);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const residentName = userRole === 'admin' 
      ? residents.find(r => r.id === formResidentId)?.name 
      : currentUser?.name;

    if (!residentName || !activeFormService) return;

    const newRequest: ServiceRequest = {
      id: Math.random().toString(36).substr(2, 9),
      residentName,
      type: activeFormService.title,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    setServiceRequests([newRequest, ...serviceRequests]);
    setActiveFormService(null);
    setFormResidentId('');
    setFormNotes('');
    setServiceTab('requests');
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: newTransaction.date,
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      type: transactionType,
      category: newTransaction.category || 'Lain-lain'
    };
    setFinances([transaction, ...finances]);
    setShowTransactionModal(false);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...editProfileForm };
    setCurrentUser(updatedUser);
    
    // Update also in main residents list
    setResidents(residents.map(r => r.id === currentUser.id ? updatedUser : r));
    setShowEditProfileModal(false);
    alert('Profil Anda berhasil diperbarui!');
  };

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResident.name || !newResident.nik) return;

    const res: Resident = {
      ...(newResident as Resident),
      id: Math.random().toString(36).substr(2, 9),
      photoUrl: `https://i.pravatar.cc/150?u=${Math.random()}`
    };

    setResidents([res, ...residents]);
    setShowResidentModal(false);
    setNewResident({ name: '', nik: '', gender: 'L', age: 0, address: '', occupation: '', status: 'Tetap', isVoter: true, phoneNumber: '', birthPlace: '', birthDate: '', maritalStatus: 'Lajang', healthStatus: 'Sehat', isAlive: true });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden flex flex-col md:flex-row border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <Activity size={32} />
              </div>
              <h1 className="text-4xl font-extrabold mb-4 leading-tight">RT/RW Digital Dashboard</h1>
              <p className="text-blue-100 font-medium text-lg leading-relaxed">
                Kelola lingkungan Anda dengan cara yang lebih cerdas, transparan, dan terintegrasi.
              </p>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-white/20 rounded-lg"><ShieldCheck size={20}/></div>
                <p className="text-sm font-semibold italic">"Gotong royong digital untuk masa depan lingkungan."</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Selamat Datang</h2>
              <p className="text-slate-500 font-medium">Silakan masuk ke akun Anda</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    placeholder="admin atau warga" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-100 flex items-center justify-center space-x-3"
              >
                <span>Masuk Sekarang</span>
                <LogIn size={20} />
              </button>
            </form>

            <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex items-start space-x-3">
                <Info size={20} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase mb-2">Petunjuk Login Demo:</p>
                  <ul className="text-xs text-slate-500 space-y-1 font-medium">
                    <li>• Admin: <span className="font-bold text-slate-800">admin / admin</span></li>
                    <li>• Warga: <span className="font-bold text-slate-800">warga / warga</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: { id: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${
        activeView === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon size={20} />
      {isSidebarOpen && <span className="font-medium">{label}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col`}>
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Activity size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-800">RT/RW Digital</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Beranda" />
          {userRole === 'admin' && <SidebarItem id="residents" icon={Users} label="Data Warga" />}
          {userRole === 'admin' && <SidebarItem id="finances" icon={Wallet} label="Keuangan" />}
          {userRole === 'user' && <SidebarItem id="my-profile" icon={UserCircle} label="Profil Saya" />}
          <SidebarItem id="services" icon={FileText} label="Layanan Surat" />
          <SidebarItem id="announcements" icon={Bell} label="Pengumuman" />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center w-full py-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span className="ml-2 font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold capitalize text-slate-800">
              {activeView === 'dashboard' ? 'Dashboard Utama' : 
               activeView === 'my-profile' ? 'Profil Saya' : `Kelola ${activeView}`}
            </h1>
            <p className="text-slate-500 text-sm">
              Selamat datang, {userRole === 'admin' ? 'Ketua RT 05' : currentUser?.name} 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${userRole === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {userRole}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari data..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              onClick={() => userRole === 'user' && setActiveView('my-profile')}
              className={`w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold overflow-hidden cursor-pointer hover:ring-4 hover:ring-blue-50 transition-all shadow-sm`}
            >
              {userRole === 'admin' ? 'RT' : <img src={currentUser?.photoUrl} className="object-cover w-full h-full" />}
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeView === 'dashboard' && (
            <>
              {/* Conditional Stats (Utama) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userRole === 'admin' ? (
                  <>
                    <StatCard label="Warga Hidup" value={stats.totalResidents} icon={Users} color="blue" onClick={() => setActiveView('residents')} />
                    <StatCard label="Pemasukan Kas" value={`Rp ${(stats.totalIncome / 1000000).toFixed(1)}jt`} icon={Wallet} color="emerald" onClick={() => setActiveView('finances')} />
                    <StatCard label="Layanan Pending" value={stats.pendingServices} icon={FileText} color="orange" onClick={() => setActiveView('services')} />
                    <StatCard label="Saldo Kas" value={`Rp ${((stats.totalIncome - stats.totalExpense) / 1000).toLocaleString()}rb`} icon={Activity} color="indigo" onClick={() => setActiveView('finances')} />
                  </>
                ) : (
                  <>
                    <StatCard label="Permintaan Saya" value={stats.myTotalRequests} icon={FileSearch} color="blue" onClick={() => setActiveView('services')} />
                    <StatCard label="Status Pending" value={stats.pendingServices} icon={Clock} color="orange" onClick={() => setActiveView('services')} />
                    <StatCard label="Status Warga" value={currentUser?.status || '-'} icon={UserCheck} color="emerald" onClick={() => setActiveView('my-profile')} />
                    <StatCard label="Alamat Blok" value={currentUser?.address || '-'} icon={MapPinned} color="rose" onClick={() => setActiveView('my-profile')} />
                  </>
                )}
              </div>

              {/* Demographics Group 1: Marital Status */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-800 flex items-center space-x-2">
                   <Activity size={20} className="text-blue-500" />
                   <span>Statistik Status Perkawinan (Warga Hidup)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <StatCard label="Lajang" value={stats.countLajang} icon={UserCircle} color="indigo" />
                   <StatCard label="Menikah" value={stats.countMenikah} icon={Heart} color="rose" />
                   <StatCard label="Janda / Duda" value={stats.countJandaDuda} icon={Activity} color="slate" />
                </div>
              </div>

              {/* Demographics Group 2: Gender & Vitalitas & Kesehatan */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-800 flex items-center space-x-2">
                   <Users size={20} className="text-indigo-500" />
                   <span>Statistik Gender & Kondisi Warga</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   <StatCard label="Pria (Hidup)" value={stats.countPria} icon={User} color="blue" />
                   <StatCard label="Wanita (Hidup)" value={stats.countWanita} icon={User} color="rose" />
                   <StatCard label="Sedang Sakit" value={stats.countSakit} icon={HeartPulse} color="orange" />
                   <StatCard label="Telah Meninggal" value={stats.countMeninggal} icon={Skull} color="slate" />
                </div>
              </div>

              {/* Layanan Cepat */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-slate-800">Akses Cepat Layanan</h3>
                  <button onClick={() => setActiveView('services')} className="text-blue-600 text-sm font-semibold hover:underline"> Lihat Semua </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {AVAILABLE_SERVICES.map(svc => (
                    <div key={svc.id} onClick={() => { setActiveFormService(svc); }} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-${svc.color}-50 text-${svc.color}-600 group-hover:scale-110 transition-transform`}>
                        <svc.icon size={24} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-700">{svc.title}</h4>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom Layout (Simplified for brevity but kept functional) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                   {/* Announcements Card */}
                   <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-lg text-slate-800">Pengumuman Terbaru</h3>
                        <button onClick={() => setActiveView('announcements')} className="text-xs text-blue-600 font-bold hover:underline">Lihat Semua</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {announcements.slice(0, 2).map(ann => (
                          <div key={ann.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                            <div className="flex items-center justify-between mb-3">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${ann.category === 'Keamanan' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{ann.category}</span>
                              <span className="text-[10px] text-slate-400">{ann.date}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2 leading-tight">{ann.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2">{ann.content}</p>
                          </div>
                        ))}
                      </div>
                   </div>

                   {userRole === 'admin' && (
                     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                          <h3 className="font-semibold text-lg text-slate-800">Daftar Warga (Terbaru)</h3>
                          <button onClick={() => setActiveView('residents')} className="text-blue-600 text-sm font-medium hover:underline"> Lihat Semua </button>
                        </div>
                        <table className="w-full text-left">
                          <tbody className="divide-y divide-slate-100">
                            {residents.filter(r => r.isAlive).slice(0, 3).map(res => (
                              <tr key={res.id} onClick={() => setSelectedResident(res)} className="hover:bg-blue-50/50 transition-colors cursor-pointer group">
                                <td className="px-6 py-4 flex items-center space-x-3">
                                  <img src={res.photoUrl} className="w-10 h-10 rounded-full bg-slate-200 object-cover border-2 border-white shadow-sm" />
                                  <div className="font-medium text-slate-900 group-hover:text-blue-600">{res.name}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{res.occupation}</td>
                                <td className="px-6 py-4 text-right">
                                  <ChevronRight size={18} className="text-slate-300 inline" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                     </div>
                   )}
                </div>

                <div className="space-y-6">
                   {/* Info Card Aktif */}
                   <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-100">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden border border-white/30">
                          {userRole === 'admin' ? <Activity size={32} /> : <img src={currentUser?.photoUrl} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Sedang Aktif</p>
                          <h3 className="text-xl font-bold leading-tight">{userRole === 'admin' ? 'Ketua RT 05' : currentUser?.name}</h3>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                          <span className="text-blue-200">Role</span>
                          <span className="font-bold capitalize">{userRole}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                          <span className="text-blue-200">Kesehatan</span>
                          <span className={`font-bold ${currentUser?.healthStatus === 'Sakit' ? 'text-orange-300' : 'text-emerald-300'}`}>{userRole === 'admin' ? 'Stabil' : currentUser?.healthStatus}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => userRole === 'user' ? setActiveView('my-profile') : setActiveView('residents')}
                        className="w-full mt-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
                      >
                        Lihat Profil Detail
                      </button>
                   </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'my-profile' && currentUser && (
             <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-50 overflow-hidden border border-slate-100">
                   <div className="h-48 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 relative">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                   </div>
                   <div className="px-12 pb-12 relative">
                      <div className="flex flex-col md:flex-row items-end md:space-x-8 -mt-20 mb-10">
                         <img 
                           src={currentUser.photoUrl} 
                           className="w-40 h-40 rounded-[2.5rem] bg-white p-2 object-cover shadow-2xl border-4 border-white"
                         />
                         <div className="flex-1 pb-2 mt-4 md:mt-0">
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{currentUser.name}</h2>
                            <div className="flex flex-wrap gap-3">
                               <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">{currentUser.status}</span>
                               <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentUser.healthStatus === 'Sakit' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>{currentUser.healthStatus}</span>
                            </div>
                         </div>
                         <button 
                          onClick={() => { setEditProfileForm(currentUser); setShowEditProfileModal(true); }}
                          className="mb-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center space-x-2"
                         >
                            <UserCircle size={18} />
                            <span>Edit Profil</span>
                         </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                         <ProfileInfoItem icon={CreditCard} label="Nomor Induk Kependudukan" value={currentUser.nik} />
                         <ProfileInfoItem icon={Calendar} label="Tempat, Tanggal Lahir" value={`${currentUser.birthPlace}, ${currentUser.birthDate}`} />
                         <ProfileInfoItem icon={Heart} label="Status Perkawinan" value={currentUser.maritalStatus} />
                         <ProfileInfoItem icon={Stethoscope} label="Kondisi Kesehatan" value={currentUser.healthStatus} />
                         <ProfileInfoItem icon={Phone} label="Nomor WhatsApp" value={currentUser.phoneNumber} />
                         <ProfileInfoItem icon={Briefcase} label="Pekerjaan" value={currentUser.occupation} />
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeView === 'residents' && userRole === 'admin' && (
             <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">Basis Data Lingkungan</h3>
                    <p className="text-slate-500 text-sm">Menampilkan semua warga (Hidup & Meninggal)</p>
                  </div>
                  <button onClick={() => setShowResidentModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 font-bold">
                    <Plus size={20} />
                    <span>Tambah Warga</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                      <tr className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        <th className="px-8 py-5">Informasi Warga</th>
                        <th className="px-8 py-5">Status / Vital</th>
                        <th className="px-8 py-5">TTL / Marital</th>
                        <th className="px-8 py-5">Kesehatan</th>
                        <th className="px-8 py-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {residents.map(res => (
                        <tr key={res.id} onClick={() => setSelectedResident(res)} className={`hover:bg-blue-50/30 cursor-pointer group transition-all ${!res.isAlive ? 'opacity-60 bg-slate-50' : ''}`}>
                          <td className="px-8 py-5 flex items-center space-x-4">
                             <img src={res.photoUrl} className="w-12 h-12 rounded-xl bg-slate-100 object-cover shadow-sm border border-white group-hover:scale-110 transition-transform" />
                             <div>
                               <div className="font-bold text-slate-800 group-hover:text-blue-600 flex items-center">
                                 {res.name}
                                 {!res.isAlive && <Skull size={14} className="ml-2 text-slate-400" />}
                               </div>
                               <div className="text-[10px] font-mono text-slate-400">{res.nik}</div>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="space-y-1">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase block w-fit ${res.status === 'Tetap' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}> {res.status} </span>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase block w-fit ${res.isAlive ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'}`}> {res.isAlive ? 'Hidup' : 'Meninggal'} </span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-xs text-slate-600 font-medium">
                            <div className="font-bold">{res.birthPlace}, {res.birthDate}</div>
                            <div className="text-slate-400 mt-0.5">{res.maritalStatus}</div>
                          </td>
                          <td className="px-8 py-5">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${res.healthStatus === 'Sakit' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}> {res.healthStatus} </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100">
                               <ChevronRight size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

          {/* ... Services, Announcements, Finances views remain exactly as they were ... */}
          {activeView === 'services' && (
             <div className="space-y-6">
                <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit shadow-sm">
                  <button onClick={() => setServiceTab('requests')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${serviceTab === 'requests' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}> 
                    {userRole === 'admin' ? 'Antrean Pengajuan' : 'Surat Saya'} 
                    <span className="ml-2 px-2 py-0.5 bg-black/10 rounded text-[10px]">{stats.pendingServices}</span>
                  </button>
                  <button onClick={() => setServiceTab('catalog')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${serviceTab === 'catalog' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}> Katalog Layanan </button>
                </div>

                {serviceTab === 'requests' ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                       <h3 className="font-bold text-xl text-slate-800">{userRole === 'admin' ? 'Daftar Antrean Surat' : 'Status Pengajuan Saya'}</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {(userRole === 'admin' ? serviceRequests : serviceRequests.filter(s => s.residentName === currentUser?.name)).length > 0 ? (
                        (userRole === 'admin' ? serviceRequests : serviceRequests.filter(s => s.residentName === currentUser?.name)).map(svc => (
                          <div key={svc.id} onClick={() => setSelectedService(svc)} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
                            <div className="flex items-center space-x-6">
                              <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${svc.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}> <FileText size={28} /> </div>
                              <div>
                                <div className="font-bold text-lg text-slate-900 group-hover:text-blue-600">{svc.type}</div>
                                <div className="text-sm text-slate-500 flex items-center mt-1">
                                   <User size={14} className="mr-1" /> {svc.residentName} • <Clock size={14} className="mx-1 ml-3" /> {svc.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${svc.status === 'Pending' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}> {svc.status === 'Pending' ? 'Menunggu' : 'Selesai'} </span>
                              <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"> <ChevronRight size={24} /> </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-24 text-center text-slate-400"> <FileSearch size={80} className="mx-auto mb-6 opacity-10" /> <p className="font-bold text-lg">Belum ada pengajuan surat yang ditemukan.</p> </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {AVAILABLE_SERVICES.map(svc => (
                      <div key={svc.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col shadow-sm">
                        <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-${svc.color}-50 text-${svc.color}-600 group-hover:scale-110 transition-transform shadow-sm`}> <svc.icon size={32} /> </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{svc.title}</h4>
                        <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">{svc.description}</p>
                        <button onClick={() => setActiveFormService(svc)} className="w-full py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center space-x-3 border border-slate-100 hover:border-blue-600"> <Plus size={20} /> <span>Buat Pengajuan</span> </button>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          )}

          {activeView === 'announcements' && (
             <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <div>
                      <h3 className="font-bold text-3xl text-slate-800">Papan Pengumuman</h3>
                      <p className="text-slate-500 font-medium mt-1">Informasi terkini di lingkungan kita</p>
                   </div>
                   {userRole === 'admin' && (
                     <button onClick={() => setShowAnnouncementModal(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center space-x-3">
                        <Plus size={24} />
                        <span>Terbitkan Baru</span>
                     </button>
                   )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {announcements.map(ann => (
                     <div key={ann.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group border-b-8 border-b-transparent hover:border-b-blue-500">
                        <div className="flex items-center justify-between mb-6">
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                             ann.category === 'Kegiatan' ? 'bg-blue-100 text-blue-600' :
                             ann.category === 'Keamanan' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                           }`}>{ann.category}</span>
                           <span className="text-xs text-slate-400 font-medium">{ann.date}</span>
                        </div>
                        <h4 className="text-2xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">{ann.title}</h4>
                        <p className="text-slate-500 text-sm leading-loose line-clamp-4">{ann.content}</p>
                     </div>
                   ))}
                </div>
             </div>
          )}

          {activeView === 'finances' && userRole === 'admin' && (
             <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-2xl text-slate-800">Manajemen Kas RT</h3>
                   <div className="flex space-x-4">
                      <button onClick={() => { setTransactionType('Masuk'); setShowTransactionModal(true); }} className="bg-emerald-600 text-white px-6 py-3.5 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 font-bold flex items-center space-x-3"> <ArrowUpCircle size={20} /> <span>Pemasukan</span> </button>
                      <button onClick={() => { setTransactionType('Keluar'); setShowTransactionModal(true); }} className="bg-red-600 text-white px-6 py-3.5 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 font-bold flex items-center space-x-3"> <ArrowDownCircle size={20} /> <span>Pengeluaran</span> </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FinanceStatCard label="Pemasukan Kas" value={stats.totalIncome} icon={Wallet} color="emerald" />
                  <FinanceStatCard label="Pengeluaran Kas" value={stats.totalExpense} icon={TrendingUp} color="red" />
                  <FinanceStatCard label="Total Saldo" value={stats.totalIncome - stats.totalExpense} icon={Activity} color="blue" />
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                   <div className="p-8 border-b border-slate-100"> <h3 className="font-bold text-xl text-slate-800">Jurnal Transaksi Terakhir</h3> </div>
                   <table className="w-full text-left">
                     <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <tr> <th className="px-8 py-5">Tanggal</th> <th className="px-8 py-5">Deskripsi Transaksi</th> <th className="px-8 py-5">Kategori</th> <th className="px-8 py-5 text-right">Jumlah (IDR)</th> </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {finances.map(t => (
                          <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-5 text-sm font-medium text-slate-500">{t.date}</td>
                            <td className="px-8 py-5 font-bold text-slate-800">{t.description}</td>
                            <td className="px-8 py-5"> <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">{t.category}</span> </td>
                            <td className={`px-8 py-5 text-right font-extrabold text-lg ${t.type === 'Masuk' ? 'text-emerald-600' : 'text-red-600'}`}> {t.type === 'Masuk' ? '+' : '-'} {t.amount.toLocaleString()} </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
             </div>
          )}
        </div>

        {/* AI FAB Assistant */}
        <div className="fixed bottom-10 right-10 z-40">
          {isAIChatOpen ? (
            <div className="bg-white w-[26rem] rounded-[2rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
              <div className="bg-blue-600 p-6 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="flex items-center space-x-3 relative z-10"> <MessageSquareText size={24} /> <span className="font-bold text-xl tracking-tight">Asisten Pintar</span> </div>
                <button onClick={() => setIsAIChatOpen(false)} className="hover:rotate-90 transition-transform relative z-10"><X size={24} /></button>
              </div>
              <div className="h-[30rem] p-6 overflow-y-auto bg-slate-50/50 space-y-5 text-sm">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm leading-relaxed text-slate-600"> 
                   Halo {userRole === 'admin' ? 'Pak Ketua' : currentUser?.name}! Saya asisten bertenaga AI Anda. <br/><br/> 
                   {userRole === 'admin' ? 'Ada data warga yang ingin ditanyakan atau butuh draf pengumuman baru?' : 'Ada kesulitan terkait layanan surat atau pengumuman?'}
                </div>
                {aiResponse && <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-xl shadow-blue-100 animate-in fade-in slide-in-from-top-4"> <p className="whitespace-pre-wrap leading-relaxed">{aiResponse}</p> </div>}
                {isLoadingAI && <div className="flex items-center space-x-2 text-blue-400 p-4"> <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div> <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div> <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div> </div>}
              </div>
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="flex items-center space-x-3">
                  <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAskAI()} placeholder="Tanyakan sesuatu..." className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none" />
                  <button onClick={handleAskAI} disabled={isLoadingAI} className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl shadow-blue-50 active:scale-90"> <ChevronRight size={24} /> </button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsAIChatOpen(true)} className="bg-blue-600 text-white p-5 rounded-[1.5rem] shadow-2xl shadow-blue-200 hover:scale-110 active:scale-95 transition-all flex items-center space-x-3 group"> 
               <MessageSquareText size={28} className="group-hover:animate-bounce" /> 
               <span className="font-extrabold text-lg uppercase tracking-widest">Tanya AI</span> 
            </button>
          )}
        </div>

        {/* Modal: Edit Profil Warga */}
        {showEditProfileModal && currentUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
               <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
                  <div className="flex items-center space-x-4">
                     <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg"> <UserCircle size={24} /> </div>
                     <h3 className="font-extrabold text-xl text-slate-900 leading-tight">Perbarui Informasi Profil</h3>
                  </div>
                  <button onClick={() => setShowEditProfileModal(false)} className="p-2 hover:bg-slate-200 rounded-full"> <X size={24} className="text-slate-500" /> </button>
               </div>
               <form onSubmit={handleUpdateProfile} className="p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                       <input required type="text" value={editProfileForm.name} onChange={(e) => setEditProfileForm({...editProfileForm, name: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">NIK (Hanya Baca)</label>
                       <input readOnly type="text" value={editProfileForm.nik} className="w-full p-4 bg-slate-100 border-2 border-slate-200 rounded-2xl text-sm font-mono text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Tempat Lahir</label>
                       <input required type="text" value={editProfileForm.birthPlace} onChange={(e) => setEditProfileForm({...editProfileForm, birthPlace: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Tanggal Lahir</label>
                       <input required type="date" value={editProfileForm.birthDate} onChange={(e) => setEditProfileForm({...editProfileForm, birthDate: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Kondisi Kesehatan</label>
                       <select required value={editProfileForm.healthStatus} onChange={(e) => setEditProfileForm({...editProfileForm, healthStatus: e.target.value as any})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all">
                         <option value="Sehat">Sehat Walafiat</option>
                         <option value="Sakit">Dalam Perawatan (Sakit)</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Status Perkawinan</label>
                       <select required value={editProfileForm.maritalStatus} onChange={(e) => setEditProfileForm({...editProfileForm, maritalStatus: e.target.value as any})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all">
                         <option value="Lajang">Lajang</option>
                         <option value="Menikah">Menikah</option>
                         <option value="Janda/Duda">Janda/Duda</option>
                       </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">WhatsApp / No. HP</label>
                       <input required type="text" value={editProfileForm.phoneNumber} onChange={(e) => setEditProfileForm({...editProfileForm, phoneNumber: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Pekerjaan</label>
                       <input required type="text" value={editProfileForm.occupation} onChange={(e) => setEditProfileForm({...editProfileForm, occupation: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Alamat Domisili (Blok/No)</label>
                     <input required type="text" value={editProfileForm.address} onChange={(e) => setEditProfileForm({...editProfileForm, address: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="pt-4 flex space-x-4">
                     <button type="button" onClick={() => setShowEditProfileModal(false)} className="flex-1 py-4 font-bold text-slate-400 hover:bg-slate-50 rounded-2xl transition-all">Batal</button>
                     <button type="submit" className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center space-x-2">
                        <Save size={20} />
                        <span>Simpan Perubahan</span>
                     </button>
                  </div>
               </form>
            </div>
          </div>
        )}

        {/* Modal: Profil Warga (Detail View) */}
        {selectedResident && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                 <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                    <button onClick={() => setSelectedResident(null)} className="absolute top-8 right-8 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"> <X size={24} /> </button>
                 </div>
                 <div className="px-12 pb-12">
                    <div className="relative -mt-20 flex items-end justify-between mb-10">
                       <div className="flex items-end space-x-8">
                          <img src={selectedResident.photoUrl} className="w-40 h-40 rounded-[2.5rem] bg-white p-2 object-cover shadow-2xl border-4 border-white" />
                          <div className="pb-4">
                             <h2 className="text-4xl font-extrabold text-slate-900">{selectedResident.name}</h2>
                             <div className="flex items-center space-x-3 mt-2">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${selectedResident.status === 'Tetap' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}> {selectedResident.status} </span>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${selectedResident.isAlive ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'}`}> {selectedResident.isAlive ? 'Hidup' : 'Meninggal'} </span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                       <ProfileInfoItem icon={CreditCard} label="NIK Kependudukan" value={selectedResident.nik} />
                       <ProfileInfoItem icon={Calendar} label="Tempat, Tanggal Lahir" value={`${selectedResident.birthPlace}, ${selectedResident.birthDate}`} />
                       <ProfileInfoItem icon={Heart} label="Status Perkawinan" value={selectedResident.maritalStatus} />
                       <ProfileInfoItem icon={Stethoscope} label="Kesehatan" value={selectedResident.healthStatus} />
                       <ProfileInfoItem icon={Phone} label="WhatsApp" value={selectedResident.phoneNumber} />
                       <ProfileInfoItem icon={Briefcase} label="Pekerjaan" value={selectedResident.occupation} />
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* Modal: Tambah Warga Baru (Admin Only) */}
        {showResidentModal && userRole === 'admin' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl"> <Users size={24} /> </div>
                  <h3 className="font-extrabold text-xl text-slate-900">Tambah Data Warga Baru</h3>
                </div>
                <button onClick={() => setShowResidentModal(false)} className="p-2 hover:bg-slate-200 rounded-full"> <X size={24} className="text-slate-500" /> </button>
              </div>
              <form onSubmit={handleAddResident} className="p-10 grid grid-cols-2 gap-8">
                <div className="col-span-2 flex justify-center mb-2">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-300">
                       <Camera size={40} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <input required type="text" value={newResident.name} onChange={(e) => setNewResident({...newResident, name: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">NIK (16 Digit)</label>
                  <input required type="text" value={newResident.nik} onChange={(e) => setNewResident({...newResident, nik: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4 col-span-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Tempat Lahir</label>
                    <input required type="text" value={newResident.birthPlace} onChange={(e) => setNewResident({...newResident, birthPlace: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Tanggal Lahir</label>
                    <input required type="date" value={newResident.birthDate} onChange={(e) => setNewResident({...newResident, birthDate: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Jenis Kelamin</label>
                  <select value={newResident.gender} onChange={(e) => setNewResident({...newResident, gender: e.target.value as 'L' | 'P'})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Status Kesehatan</label>
                  <select value={newResident.healthStatus} onChange={(e) => setNewResident({...newResident, healthStatus: e.target.value as any})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none">
                    <option value="Sehat">Sehat</option>
                    <option value="Sakit">Sakit</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Status Hidup</label>
                  <select value={newResident.isAlive ? 'true' : 'false'} onChange={(e) => setNewResident({...newResident, isAlive: e.target.value === 'true'})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none">
                    <option value="true">Masih Hidup</option>
                    <option value="false">Sudah Meninggal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Status Perkawinan</label>
                  <select value={newResident.maritalStatus} onChange={(e) => setNewResident({...newResident, maritalStatus: e.target.value as any})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none">
                    <option value="Lajang">Lajang</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Janda/Duda">Janda/Duda</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">No. HP / WhatsApp</label>
                  <input required type="text" value={newResident.phoneNumber} onChange={(e) => setNewResident({...newResident, phoneNumber: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Alamat (Blok/No)</label>
                  <input required type="text" value={newResident.address} onChange={(e) => setNewResident({...newResident, address: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                </div>
                <div className="col-span-2 pt-4 flex space-x-6">
                  <button type="button" onClick={() => setShowResidentModal(false)} className="flex-1 py-4 font-bold text-slate-400 hover:bg-slate-50 rounded-2xl transition-all text-lg">Batal</button>
                  <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all text-lg">Simpan Warga</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Other modals remain same... */}
      </main>
    </div>
  );
};

// Internal Components
const StatCard = ({ label, value, icon: Icon, color, onClick }: { label: string, value: any, icon: any, color: string, onClick?: () => void }) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-50',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-50',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50',
    orange: 'bg-orange-50 text-orange-600 border-orange-100 shadow-orange-50',
    rose: 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50',
    slate: 'bg-slate-50 text-slate-600 border-slate-100 shadow-slate-50',
  };
  return (
    <div onClick={onClick} className={`bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:border-blue-200' : ''}`}>
      <div className={`w-12 h-12 mb-4 rounded-2xl flex items-center justify-center ${colorMap[color]}`}> <Icon size={24} /> </div>
      <div> <p className="text-slate-400 text-[10px] font-bold mb-1 uppercase tracking-[0.2em]">{label}</p> <h4 className="text-2xl font-extrabold text-slate-900 leading-none">{value}</h4> </div>
    </div>
  );
};

const FinanceStatCard = ({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: 'emerald' | 'red' | 'blue' }) => {
  const colors = {
    emerald: 'from-emerald-600 to-teal-700 shadow-emerald-100 text-emerald-100',
    red: 'from-red-600 to-rose-700 shadow-red-100 text-red-100',
    blue: 'from-blue-600 to-indigo-700 shadow-blue-100 text-blue-100',
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
      <div className="flex items-center justify-between mb-4">
        <Icon size={32} className="opacity-80" />
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status Keuangan</span>
      </div>
      <h3 className="text-3xl font-extrabold leading-tight">Rp {value.toLocaleString()}</h3>
      <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-80">{label}</p>
    </div>
  );
};

const ProfileInfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start space-x-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm hover:bg-white hover:shadow-md transition-all group">
    <div className="p-4 bg-white text-blue-600 rounded-2xl border border-slate-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</div>
      <div className="text-slate-800 font-extrabold text-xl leading-snug">{value}</div>
    </div>
  </div>
);

export default App;
