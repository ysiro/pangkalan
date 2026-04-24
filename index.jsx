import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Heart, 
  MessageSquare, 
  History, 
  Receipt, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight, 
  Plus, 
  Minus, 
  Wallet, 
  MapPin, 
  PlusCircle,
  Edit2,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  ShoppingCart,
  Menu as MenuIcon,
  TrendingUp,
  Users
} from 'lucide-react';

// --- CONFIGURATION ---
const API_URL = "https://script.google.com/macros/s/AKfycbx6ICN5u1Dam4jTKojAea_5QvX1PKWxmWEymcVjzHvRF0mVRH2MxC_AeEMXVeTzFlqkrw/exec"; 
const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WA outlet

const CATEGORIES = [
  { id: 'makanan', name: 'Makanan', icon: <UtensilsCrossed size={18} /> },
  { id: 'segeran', name: 'Segeran', icon: <PlusCircle size={18} /> },
  { id: 'wedangan', name: 'Wedangan', icon: <PlusCircle size={18} /> },
  { id: 'camilan', name: 'Camilan', icon: <PlusCircle size={18} /> }
];

const INITIAL_DATA = [
  { id: "001", name: "Ayam Penyet Pangkalan", price: 25000, category: "makanan", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", rating: 4.8, discount: "10% Off" },
  { id: "002", name: "Es Jeruk Peras", price: 10000, category: "segeran", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd", rating: 4.5, discount: null },
  { id: "003", name: "Wedang Jahe Merah", price: 12000, category: "wedangan", image: "https://images.unsplash.com/photo-1544787210-2827443cb69b", rating: 4.9, discount: "15% Off" }
];

// --- MODAL COMPONENT ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-lime-100 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center bg-lime-50/30">
          <h3 className="font-black text-2xl text-lime-900 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-3 hover:bg-lime-200/50 rounded-full transition-colors text-lime-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCategory, setSelectedCategory] = useState('makanan');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState(INITIAL_DATA);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // Sync Data
  useEffect(() => {
    if (API_URL) fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?action=read`);
      const data = await res.json();
      if (data && data.length > 0) {
        setMenuItems(data.map(item => ({
          ...item,
          id: String(item.id),
          price: Number(item.price),
          rating: Number(item.rating || 4.5)
        })));
      }
    } catch (err) {
      showNotification("Gagal terhubung ke Sheets. Menggunakan data lokal.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Logic: Search & Filter
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    showNotification(`Ditambahkan: ${item.name}`);
  };

  const removeFromCart = (id) => {
    const item = cart.find(c => c.id === id);
    if (item.qty > 1) {
      setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const totalBill = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const orderList = cart.map(item => `- ${item.name} (${item.qty}x)`).join('%0A');
    const total = (totalBill + 5000).toLocaleString('id-ID');
    const text = `Halo RM PANGKALAN!%0A%0ASaya ingin memesan:%0A${orderList}%0A%0ATotal Pembayaran: *Rp ${total}*%0AMohon diproses ya. Terima kasih!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: editingItem?.id || String(Date.now()).slice(-3).padStart(3, '0'),
      name: formData.get('name'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      image: formData.get('image'),
      rating: editingItem?.rating || 4.5,
      discount: formData.get('discount') || null
    };

    setLoading(true);
    // Optimistic Update
    if (editingItem) setMenuItems(menuItems.map(m => m.id === newItem.id ? newItem : m));
    else setMenuItems([...menuItems, newItem]);

    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: editingItem ? 'update' : 'create', data: newItem })
      });
      showNotification("Data berhasil disinkronkan ke Sheets");
      setTimeout(fetchData, 1000);
    } catch (err) {
      showNotification("Gagal sinkron ke Sheets", "error");
    } finally {
      setModalOpen(false);
      setEditingItem(null);
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm("Hapus item ini selamanya?")) return;
    setLoading(true);
    setMenuItems(menuItems.filter(m => m.id !== id));
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: 'delete', id })
      });
      showNotification("Item telah dihapus");
      setTimeout(fetchData, 1000);
    } catch (err) {
      showNotification("Gagal menghapus di Sheets", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAF5] font-sans text-stone-800 overflow-hidden selection:bg-lime-200">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-80 bg-white border-r border-stone-100 flex flex-col hidden lg:flex">
        <div className="p-10">
          <h1 className="text-3xl font-black text-lime-600 flex items-center gap-2 tracking-tighter">
            PANGKALAN<span className="text-stone-300">.</span>
          </h1>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Sistem Management v2.0</p>
        </div>

        <nav className="flex-1 px-6 space-y-1">
          {[
            { id: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'Order Menu', icon: <UtensilsCrossed size={20} /> },
            { id: 'Riwayat', icon: <History size={20} /> },
            { id: 'Tagihan', icon: <Receipt size={20} /> },
            { id: 'Pengaturan', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 font-bold ${
                activeTab === item.id 
                ? 'bg-lime-500 text-white shadow-xl shadow-lime-100' 
                : 'text-stone-400 hover:bg-lime-50 hover:text-lime-600'
              }`}
            >
              {item.icon}
              {item.id}
            </button>
          ))}
        </nav>

        <div className="p-8">
          <div className="bg-stone-900 rounded-[32px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <TrendingUp size={64} className="text-lime-400" />
            </div>
            <p className="relative z-10 text-white font-black text-lg mb-1">Dukung Kami!</p>
            <p className="relative z-10 text-stone-400 text-xs mb-6 font-medium">Berikan rating bintang 5 di Google Maps.</p>
            <button className="w-full bg-lime-500 text-white py-4 rounded-2xl font-black hover:bg-lime-400 transition-all shadow-lg active:scale-95">
              Review Outlet
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <header className="px-6 lg:px-12 py-8 flex items-center justify-between sticky top-0 bg-white/80 z-20 backdrop-blur-xl border-b border-stone-50">
          <div className="flex items-center gap-4 lg:gap-0">
             <button className="lg:hidden p-3 bg-stone-100 rounded-2xl text-stone-600">
                <MenuIcon size={24} />
             </button>
             <div>
                <h2 className="text-2xl lg:text-3xl font-black text-stone-900 leading-tight">Halo, Juragan Zack! 🍜</h2>
                <p className="text-stone-400 font-medium text-sm hidden lg:block">Cek ketersediaan menu di RM Pangkalan hari ini.</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative flex items-center group hidden md:flex">
              <Search className="absolute left-5 text-stone-400 group-focus-within:text-lime-500 transition-colors" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari menu..."
                className="pl-14 pr-8 py-4 bg-stone-100/50 rounded-[24px] border-none focus:ring-4 focus:ring-lime-100 outline-none w-64 lg:w-96 shadow-inner transition-all font-bold"
              />
            </div>
            <button 
              onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}
              className="lg:hidden p-4 bg-lime-500 text-white rounded-2xl shadow-lg relative"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-2 border-white font-black">{cart.length}</span>}
            </button>
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl overflow-hidden ring-4 ring-lime-50 shadow-lg hidden sm:block">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
            </div>
          </div>
        </header>

        <section className="p-6 lg:p-12 space-y-10 max-w-[1600px] mx-auto w-full pb-32">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: 'Total Menu', val: menuItems.length, icon: <UtensilsCrossed className="text-lime-600" /> },
              { label: 'Kategori', val: CATEGORIES.length, icon: <LayoutDashboard className="text-orange-500" /> },
              { label: 'Rating', val: '4.8/5', icon: <Heart className="text-rose-500" /> },
              { label: 'Staff', val: '12 Orang', icon: <Users className="text-blue-500" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-stone-50 shadow-xl shadow-stone-100/50 flex items-center gap-5 hover:scale-105 transition-transform cursor-default">
                <div className="p-4 bg-stone-50 rounded-2xl">{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-black text-stone-800">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo */}
          <div className="relative rounded-[40px] lg:rounded-[60px] overflow-hidden h-64 lg:h-80 flex items-center px-10 lg:px-20 group shadow-2xl shadow-lime-200/50">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/40 to-transparent" />
            <div className="relative z-10 text-white max-w-xl">
              <span className="inline-block bg-lime-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Ramadan Kareem</span>
              <h3 className="text-4xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight">Paket Bukber <br/>Pangkalan!</h3>
              <p className="text-stone-300 mb-8 text-sm lg:text-base opacity-80 font-medium hidden sm:block">Dapatkan gratis Takjil Segeran untuk setiap pemesanan minimal 4 porsi menu utama.</p>
              <button className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-black hover:bg-lime-50 transition-all shadow-xl flex items-center gap-2">
                Lihat Paket <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="sticky top-[100px] lg:top-[120px] z-10 bg-[#F8FAF5]/80 backdrop-blur-md py-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-lime-500 rounded-full" />
                <h3 className="text-2xl font-black">Menu Hari Ini</h3>
              </div>
              <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all shadow-lg uppercase tracking-wider ${isAdmin ? 'bg-rose-500 text-white ring-8 ring-rose-100' : 'bg-stone-800 text-white hover:bg-black'}`}
              >
                {isAdmin ? '🔴 Exit Admin' : '⚙️ Kelola Menu'}
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-3 whitespace-nowrap px-8 py-5 rounded-[28px] transition-all font-black text-sm border-2 ${
                    selectedCategory === cat.id 
                    ? 'bg-lime-500 border-lime-500 text-white shadow-2xl shadow-lime-200 -translate-y-1' 
                    : 'bg-white border-transparent text-stone-400 hover:border-lime-100 shadow-sm'
                  }`}
                >
                  {cat.icon}
                  {cat.name.toUpperCase()}
                </button>
              ))}
              {isAdmin && (
                <button 
                  onClick={() => { setEditingItem(null); setModalOpen(true); }}
                  className="flex items-center gap-3 whitespace-nowrap px-8 py-5 rounded-[28px] border-2 border-dashed border-lime-300 text-lime-600 hover:bg-white transition-all font-black text-sm"
                >
                  <Plus size={20} /> TAMBAH MENU
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredItems.length === 0 ? (
               <div className="col-span-full py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-stone-200">
                  <div className="bg-stone-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={40} className="text-stone-300" />
                  </div>
                  <p className="text-stone-400 font-black text-lg">Menu tidak ditemukan.</p>
                  <button onClick={() => {setSearchQuery(''); setSelectedCategory('makanan')}} className="mt-4 text-lime-600 font-bold hover:underline">Tampilkan semua menu</button>
               </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-[48px] p-6 shadow-2xl shadow-stone-200/50 border border-stone-50 group hover:shadow-lime-100 hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full">
                  {item.discount && (
                    <div className="absolute top-8 left-8 z-10 bg-orange-500 text-white text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-widest shadow-xl ring-4 ring-orange-100">
                      Diskon {item.discount}
                    </div>
                  )}
                  
                  {isAdmin && (
                    <div className="absolute top-8 right-8 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => { setEditingItem(item); setModalOpen(true); }}
                        className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}

                  <div className="h-52 rounded-[36px] overflow-hidden mb-6 bg-stone-100 relative shadow-inner">
                    <img 
                      src={item.image} 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.name}
                    />
                    <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-stone-800 flex items-center gap-1 shadow-sm">
                      ⭐ {item.rating}
                    </div>
                  </div>
                  
                  <div className="px-2 flex-1 flex flex-col">
                    <h4 className="font-black text-xl mb-1 text-stone-800 line-clamp-2 uppercase tracking-tight group-hover:text-lime-600 transition-colors leading-tight">{item.name}</h4>
                    <p className="text-stone-400 text-[10px] font-bold mb-6 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-lime-500 rounded-full" />
                       ID: {item.id}
                    </p>
                    
                    <div className="mt-auto pt-4 flex justify-between items-center border-t border-stone-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Harga</span>
                        <span className="text-2xl font-black text-stone-900 tracking-tighter">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-lime-500 text-white p-5 rounded-[28px] shadow-2xl shadow-lime-200 hover:bg-lime-600 hover:scale-110 active:scale-95 transition-all"
                      >
                        <Plus size={24} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Mobile Nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-stone-100 flex items-center justify-around py-4 lg:hidden z-40 px-6">
          {[
            { id: 'Dashboard', icon: <LayoutDashboard size={24} /> },
            { id: 'Order Menu', icon: <UtensilsCrossed size={24} /> },
            { id: 'Favorite', icon: <Heart size={24} /> },
            { id: 'Settings', icon: <Settings size={24} /> },
          ].map(m => (
            <button 
              key={m.id} 
              onClick={() => setActiveTab(m.id)}
              className={`p-3 rounded-2xl transition-all ${activeTab === m.id ? 'bg-lime-500 text-white shadow-xl shadow-lime-100' : 'text-stone-400'}`}
            >
              {m.icon}
            </button>
          ))}
        </nav>
      </main>

      {/* --- RIGHT SIDEBAR (CART) --- */}
      <aside className={`fixed inset-y-0 right-0 w-full md:w-[500px] lg:w-[450px] bg-white border-l border-stone-100 flex flex-col z-[60] transition-transform duration-500 shadow-2xl lg:relative lg:translate-x-0 ${isMobileCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 lg:p-10 pb-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-4">
                <div className="bg-lime-100 text-lime-600 p-4 rounded-3xl shadow-inner">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Saldo PangkalanPay</p>
                  <p className="font-black text-2xl tracking-tighter">Rp 12.000.000</p>
                </div>
             </div>
             <button onClick={() => setIsMobileCartOpen(false)} className="lg:hidden p-3 bg-stone-100 rounded-full text-stone-500">
                <X size={20} />
             </button>
          </div>

          <div className="bg-stone-900 rounded-[40px] p-8 mb-10 text-white relative overflow-hidden group shadow-2xl shadow-stone-200">
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-lime-500 rounded-full blur-3xl opacity-20" />
             <div className="flex items-center gap-5 relative z-10">
                <div className="bg-white/10 p-4 rounded-[20px] text-lime-400 backdrop-blur-md">
                  <MapPin size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Kirim ke:</p>
                  <p className="font-bold text-sm line-clamp-1">Meja No. 12, Area Outdoor</p>
                </div>
                <button className="text-[10px] font-black text-lime-400 hover:underline">UBAH</button>
             </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-stone-900">List Pesanan</h3>
            <span className="bg-lime-100 text-lime-600 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">{cart.reduce((a,b) => a+b.qty, 0)} Items</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-10">
                <div className="bg-stone-50 p-12 rounded-full mb-6">
                  <ShoppingCart size={80} className="text-stone-300" />
                </div>
                <p className="text-stone-400 font-black text-sm uppercase tracking-widest">Perut lapar? <br/>Yuk tambahkan pesanan!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-5 group animate-in slide-in-from-right-10 duration-300">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden bg-stone-100 flex-shrink-0 shadow-lg border-4 border-white ring-1 ring-stone-100">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-black text-base text-stone-800 truncate mb-1 uppercase tracking-tight">{item.name}</h5>
                    <p className="text-lime-600 font-black text-lg tracking-tighter">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex flex-col items-center bg-stone-50 rounded-[20px] p-2">
                    <button onClick={() => addToCart(item)} className="p-2 text-stone-400 hover:text-lime-600 transition-colors"><Plus size={16} strokeWidth={4} /></button>
                    <span className="font-black text-stone-800 my-1">{item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-stone-400 hover:text-rose-500 transition-colors"><Minus size={16} strokeWidth={4} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-8 lg:p-10 border-t border-stone-100 bg-white space-y-6 pb-24 lg:pb-10">
          <div className="space-y-4">
            <div className="flex justify-between text-stone-400 font-bold text-sm">
              <span>Subtotal Pesanan</span>
              <span className="text-stone-900">Rp {totalBill.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-stone-400 font-bold text-sm">
              <span>Ongkos Kirim & Layanan</span>
              <span className="text-stone-900">Rp {cart.length > 0 ? '5.000' : '0'}</span>
            </div>
            <div className="flex justify-between pt-6 border-t border-stone-100">
              <span className="font-black text-xl text-stone-900">Total Pembayaran</span>
              <span className="font-black text-4xl text-lime-600 tracking-tighter">Rp {(totalBill + (cart.length > 0 ? 5000 : 0)).toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-lime-500 text-white py-6 rounded-[32px] font-black text-xl shadow-2xl shadow-lime-200 hover:bg-lime-600 hover:-translate-y-2 active:translate-y-0 transition-all disabled:opacity-30 disabled:translate-y-0 flex items-center justify-center gap-4 uppercase tracking-widest ring-8 ring-lime-50"
          >
            <Share2 size={24} /> Kirim ke WhatsApp
          </button>
        </div>
      </aside>

      {/* --- NOTIFICATIONS --- */}
      {notification && (
        <div className={`fixed bottom-24 lg:bottom-12 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-[28px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-20 duration-500 border-2 border-white/40 backdrop-blur-2xl ${notification.type === 'error' ? 'bg-rose-600 text-white' : 'bg-stone-900 text-white'}`}>
          {notification.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle2 size={24} className="text-lime-400" />}
          <span className="font-black text-sm uppercase tracking-widest">{notification.msg}</span>
        </div>
      )}

      {/* --- CRUD MODAL --- */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editingItem ? "Edit Produk Menu" : "Tambah Menu Baru"}
      >
        <form onSubmit={handleSaveItem} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Nama Menu</label>
            <input 
              name="name" 
              defaultValue={editingItem?.name} 
              required 
              className="w-full px-6 py-5 rounded-[24px] bg-stone-100 border-2 border-transparent focus:border-lime-500 focus:bg-white focus:ring-8 focus:ring-lime-50 outline-none font-bold text-stone-800 transition-all"
              placeholder="Misal: Sate Kambing Muda"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Kategori</label>
              <select 
                name="category" 
                defaultValue={editingItem?.category || selectedCategory}
                className="w-full px-6 py-5 rounded-[24px] bg-stone-100 border-none focus:ring-8 focus:ring-lime-50 outline-none font-bold text-stone-800 appearance-none bg-no-repeat"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Harga (Rp)</label>
              <input 
                name="price" 
                type="number"
                defaultValue={editingItem?.price} 
                required 
                className="w-full px-6 py-5 rounded-[24px] bg-stone-100 border-none focus:ring-8 focus:ring-lime-50 outline-none font-bold text-stone-800"
                placeholder="20000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">URL Gambar (lh3/Unsplash)</label>
            <div className="relative">
              <ImageIcon className="absolute left-6 top-5 text-stone-400" size={20} />
              <input 
                name="image" 
                defaultValue={editingItem?.image} 
                required 
                className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-stone-100 border-none focus:ring-8 focus:ring-lime-50 outline-none font-bold text-stone-800"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Promo / Diskon</label>
            <input 
              name="discount" 
              defaultValue={editingItem?.discount} 
              className="w-full px-6 py-5 rounded-[24px] bg-stone-100 border-none focus:ring-8 focus:ring-lime-50 outline-none font-bold text-stone-800"
              placeholder="Misal: Buy 1 Get 1"
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-stone-900 text-white py-6 rounded-[28px] font-black text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl uppercase tracking-widest shadow-stone-200"
            >
              {loading ? <div className="w-6 h-6 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" /> : <><Save size={24} /> Simpan Produk</>}
            </button>
          </div>
        </form>
      </Modal>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #84cc16; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @media print {
          aside, nav, header, button { display: none !important; }
          main { background: white !important; width: 100% !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}
