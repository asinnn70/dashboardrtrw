
export type UserRole = 'admin' | 'user';

export interface Resident {
  id: string;
  name: string;
  nik: string;
  gender: 'L' | 'P';
  age: number;
  address: string;
  occupation: string;
  status: 'Tetap' | 'Kontrak';
  isVoter: boolean;
  phoneNumber: string;
  photoUrl?: string;
  birthPlace: string;
  birthDate: string;
  maritalStatus: 'Lajang' | 'Menikah' | 'Janda/Duda';
  healthStatus: 'Sehat' | 'Sakit';
  isAlive: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Masuk' | 'Keluar';
  category: string;
}

export interface ServiceRequest {
  id: string;
  residentName: string;
  type: string;
  status: 'Pending' | 'Selesai' | 'Ditolak';
  date: string;
}

export interface ServiceDefinition {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Kegiatan' | 'Keamanan' | 'Kesehatan' | 'Umum';
  content: string;
  date: string;
}

export type ViewState = 'dashboard' | 'residents' | 'finances' | 'services' | 'announcements' | 'my-profile';
