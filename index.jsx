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
  AlertCircle
} from 'lucide-react';

// --- CONFIGURATION & API ---
const API_URL = ""; // Masukkan URL Web App GAS Anda di sini
const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'rm-pangkalan-001';

const COLORS = {
  primary: 'bg-lime-500',
  primaryHover: 'hover:bg-lime-600',
  textPrimary: 'text-lime-600',
  light: 'bg-lime-50',
  accent: 'bg-lime-100',
  border: 'border-lime-200'
};

const CATEGORIES = [
  { id: 'makanan', name: 'Makanan', icon: <UtensilsCrossed size={18} /> },
  { id: 'segeran', name: 'Segeran', icon: <PlusCircle size={18} /> },
  { id: 'wedangan', name: 'Wedangan', icon: <PlusCircle size={18} /> },
  { id: 'camilan', name: 'Camilan', icon: <PlusCircle size={18} /> }
];

const INITIAL_DATA = [
  { id: "001", name: "Ayam Penyet Pangkalan", price: 25000, category: "makanan", image: "https://lh3.googleusercontent.com/d/1_xG5f5x5x5x5x5x5x5x5x5x5x5x5x5x5", rating: 4.8, discount: "10% Off" },
  { id: "002", name: "Es Jeruk Peras", price: 10000, category: "segeran", image: "https://lh3.googleusercontent.com/d/1_yG5f5x5x5x5x5x5x5x5x5x5x5x5x5x5", rating: 4.5, discount: null },
  { id: "003", name: "Wedang Jahe Merah", price: 12000, category: "wedangan", image: "https://lh3.googleusercontent.com/d/1_zG5f5x5x5x5x5x5x5x5x5x5x5x5x5x5", rating: 4.9, discount: "15% Off" },
  { id: "004", name: "Mendoan Panas", price: 15000, category: "camilan", image: "https://lh3.googleusercontent.com/d/2_xG5f5x5x5x5x5x5x5x5x5x5x5x5x5x5", rating: 4.7, discount: null }
];

// --- COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b flex justify-between items-center bg-lime-50">
          <h3 className="font-bold text-lg text-lime-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-lime-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCategory, setSelectedCategory] = useState('makanan');
  const [menuItems, setMenuItems] = useState(INITIAL_DATA);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // Sync with GAS API
  useEffect(() => {
    if (API_URL) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?action=read`);
      const data = await res.json();
      if (data && data.length > 0) {
        // Ensure ID with leading zero is string
        const formattedData = data.map(item => ({
          ...item,
          id: String(item.id),
          price: Number(item.price)
        }));
        setMenuItems(formattedData);
      }
    } catch (err) {
      console.error("Gagal sinkronisasi data:", err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existing = cart.find(c => c.id === id);
    if (existing.qty > 1) {
      setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const totalBill = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

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
    if (editingItem) {
      setMenuItems(menuItems.map(m => m.id === newItem.id ? newItem : m));
    } else {
      setMenuItems([...menuItems, newItem]);
    }

    if (API_URL) {
      try {
        await fetch(`${API_URL}`, {
          method: 'POST',
          body: JSON.stringify({ action: editingItem ? 'update' : 'create', data: newItem })
        });
        showNotification("Data berhasil disimpan ke Sheets");
      } catch (err) {
        showNotification("Gagal sinkronisasi ke Sheets", "error");
      }
    }
    
    setModalOpen(false);
    setEditingItem(null);
    setLoading(false);
  };

  const handleDeleteItem = async (id) => {
    setLoading(true);
    setMenuItems(menuItems.filter(m => m.id !== id));
    if (API_URL) {
      try {
        await fetch(`${API_URL}`, {
          method: 'POST',
          body: JSON.stringify({ action: 'delete', id })
        });
        showNotification("Item dihapus");
      } catch (err) {
        showNotification("Gagal menghapus di Sheets", "error");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-stone-50 font-sans text-stone-800 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r flex flex-col hidden lg:flex">
        <div className="p-8">
          <h1 className="text-3xl font-black text-lime-600 flex items-center gap-2 tracking-tighter">
            RM PANGKALAN<span className="text-stone-400">.</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { name: 'Order Menu', icon: <UtensilsCrossed size={20} /> },
            { name: 'Favorit', icon: <Heart size={20} /> },
            { name: 'Pesan', icon: <MessageSquare size={20} /> },
            { name: 'Riwayat', icon: <History size={20} /> },
            { name: 'Tagihan', icon: <Receipt size={20} /> },
            { name: 'Pengaturan', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium ${
                activeTab === item.name 
                ? 'bg-lime-500 text-white shadow-lg shadow-lime-200' 
                : 'text-stone-500 hover:bg-lime-50 hover:text-lime-600'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-lime-50 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-lime-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
            <p className="relative z-10 text-stone-800 font-bold mb-2">Upgrade Akun Premium!</p>
            <p className="relative z-10 text-stone-500 text-xs mb-4">Dapatkan voucher gratis ongkir setiap hari.</p>
            <button className="w-full bg-lime-500 text-white py-3 rounded-xl font-bold hover:bg-lime-600 transition-colors shadow-md">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="p-8 flex items-center justify-between sticky top-0 bg-stone-50 z-20 backdrop-blur-sm bg-opacity-80">
          <div>
            <h2 className="text-2xl font-bold">Halo, Juragan Zack! 👋</h2>
            <p className="text-stone-500">Ayo pilih menu spesial hari ini.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative flex items-center group">
              <Search className="absolute left-4 text-stone-400 group-focus-within:text-lime-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Cari menu kesukaanmu..."
                className="pl-12 pr-6 py-3 bg-white rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent w-80 shadow-sm"
              />
            </div>
            <button className="p-3 bg-white rounded-full border border-stone-200 text-stone-500 hover:text-lime-500 transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-lime-500 shadow-md">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
            </div>
          </div>
        </header>

        <section className="px-8 pb-8 space-y-10 max-w-[1400px] mx-auto w-full">
          
          {/* Promo Banner */}
          <div className="relative rounded-[40px] overflow-hidden h-52 flex items-center px-12 group">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Promo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="relative z-10 text-white max-w-md">
              <h3 className="text-4xl font-black mb-2 leading-tight">Voucher Diskon <br/>S/D 20%</h3>
              <p className="text-stone-200 mb-4 text-sm">Gunakan kode PANGKALANHEMAT untuk setiap pembelian menu Segeran.</p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-bold">Kategori</h3>
              <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-500'}`}
              >
                {isAdmin ? '🔴 Exit Admin Mode' : '⚙️ Manage Menu'}
              </button>
            </div>
            <div className="flex gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center justify-center min-w-[100px] p-6 rounded-3xl transition-all border-2 ${
                    selectedCategory === cat.id 
                    ? 'bg-lime-500 border-lime-500 text-white shadow-xl shadow-lime-200 -translate-y-1' 
                    : 'bg-white border-transparent text-stone-500 hover:border-lime-200 shadow-sm'
                  }`}
                >
                  <div className={`mb-3 p-3 rounded-2xl ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-stone-100'}`}>
                    {cat.icon}
                  </div>
                  <span className="font-bold text-sm">{cat.name}</span>
                </button>
              ))}
              {isAdmin && (
                <button 
                  onClick={() => { setEditingItem(null); setModalOpen(true); }}
                  className="flex flex-col items-center justify-center min-w-[100px] p-6 rounded-3xl border-2 border-dashed border-lime-300 text-lime-500 hover:bg-lime-50 transition-all"
                >
                  <PlusCircle size={32} className="mb-2" />
                  <span className="font-bold text-sm">Tambah</span>
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-bold">Menu Unggulan ({selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)})</h3>
              <button className="text-lime-600 font-bold text-sm flex items-center hover:underline">
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {menuItems.filter(item => item.category === selectedCategory).map((item) => (
                <div key={item.id} className="bg-white rounded-[32px] p-4 shadow-sm border border-stone-100 group hover:shadow-xl transition-all duration-300 relative">
                  {item.discount && (
                    <span className="absolute top-6 left-6 z-10 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {item.discount}
                    </span>
                  )}
                  
                  {isAdmin && (
                    <div className="absolute top-6 right-6 z-10 flex gap-2">
                      <button 
                        onClick={() => { setEditingItem(item); setModalOpen(true); }}
                        className="bg-white p-2 rounded-full shadow-lg text-amber-500 hover:bg-amber-50 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-white p-2 rounded-full shadow-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-stone-100">
                    <img 
                      src={item.image} 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt={item.name}
                    />
                  </div>
                  
                  <div className="px-2">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-amber-400' : 'text-stone-200'}`}>★</span>
                      ))}
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-lime-600 transition-colors">{item.name}</h4>
                    <p className="text-stone-400 text-xs mb-4">Kode Menu: #{item.id}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-stone-800">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-lime-500 text-white p-3 rounded-2xl shadow-lg shadow-lime-200 hover:scale-110 active:scale-95 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- RIGHT SIDEBAR (CART) --- */}
      <aside className="w-96 bg-white border-l flex flex-col hidden xl:flex">
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-lime-500 text-white p-2 rounded-xl shadow-lg">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Saldo Dompet</p>
                <p className="font-black text-lg">Rp 12.000.000</p>
              </div>
            </div>
            <button className="bg-stone-50 border border-stone-200 p-3 rounded-2xl hover:bg-lime-50 transition-colors">
              <Plus size={20} />
            </button>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl text-rose-500 shadow-sm">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Alamat Pengiriman</p>
                <p className="font-bold text-sm line-clamp-1">Jl. Pangkalan No. 23, Sukses Selalu</p>
              </div>
            </div>
            <button className="text-lime-600 text-xs font-bold hover:underline">Ganti</button>
          </div>

          <h3 className="text-xl font-bold mb-6">Menu Pesanan</h3>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center px-8">
                <div className="bg-stone-50 p-6 rounded-full mb-4">
                  <UtensilsCrossed size={40} className="text-stone-300" />
                </div>
                <p className="text-stone-400 font-medium">Keranjang kosong. Yuk mulai belanja!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm truncate">{item.name}</h5>
                    <p className="text-stone-400 text-xs mb-2">x{item.qty}</p>
                    <p className="font-bold text-lime-600 text-sm">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => addToCart(item)}
                      className="p-1 bg-lime-50 text-lime-600 rounded-lg hover:bg-lime-500 hover:text-white transition-all"
                    >
                      <Plus size={14} />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 bg-stone-50 text-stone-400 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-8 border-t bg-stone-50/50 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-stone-500 text-sm">
              <span>Subtotal</span>
              <span className="font-bold">Rp {totalBill.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-stone-500 text-sm">
              <span>Biaya Layanan</span>
              <span className="font-bold">Rp {cart.length > 0 ? '5.000' : '0'}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200">
              <span className="font-bold text-lg">Total</span>
              <span className="font-black text-xl text-lime-600">Rp {(totalBill + (cart.length > 0 ? 5000 : 0)).toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button className="w-full bg-lime-500 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-lime-200 hover:bg-lime-600 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            Checkout Sekarang
          </button>
        </div>
      </aside>

      {/* --- NOTIFICATIONS --- */}
      {notification && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-10 duration-300 ${notification.type === 'error' ? 'bg-rose-500 text-white' : 'bg-lime-800 text-white'}`}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span className="font-bold text-sm">{notification.msg}</span>
        </div>
      )}

      {/* --- CRUD MODAL --- */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editingItem ? "Edit Menu" : "Tambah Menu Baru"}
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-400 mb-1 uppercase tracking-wider">Nama Menu</label>
            <input 
              name="name" 
              defaultValue={editingItem?.name} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-lime-500 outline-none"
              placeholder="Contoh: Ayam Goreng"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-400 mb-1 uppercase tracking-wider">Kategori</label>
              <select 
                name="category" 
                defaultValue={editingItem?.category || selectedCategory}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-lime-500 outline-none appearance-none bg-white"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-400 mb-1 uppercase tracking-wider">Harga (Rp)</label>
              <input 
                name="price" 
                type="number"
                defaultValue={editingItem?.price} 
                required 
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-lime-500 outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 mb-1 uppercase tracking-wider">URL Gambar (lh3 Support)</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 text-stone-400" size={18} />
              <input 
                name="image" 
                defaultValue={editingItem?.image} 
                required 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-lime-500 outline-none"
                placeholder="https://lh3.googleusercontent.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 mb-1 uppercase tracking-wider">Diskon (Opsional)</label>
            <input 
              name="discount" 
              defaultValue={editingItem?.discount} 
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-lime-500 outline-none"
              placeholder="Contoh: 10% Off"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-lime-500 text-white py-4 rounded-xl font-bold hover:bg-lime-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Save size={20} /> Simpan Menu</>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #84cc16; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
