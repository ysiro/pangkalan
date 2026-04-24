<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#84cc16">
    <meta name="description" content="Dashboard RM PANGKALAN - Pesan makanan jadi lebih mudah.">
    <title>RM PANGKALAN - Dashboard Turbo Hero</title>

    <!-- PWA Manifest -->
    <link rel="manifest" href="data:application/json;base64,ewogICJuYW1lIjogIlJNIFBBTkdLQUxBTiIsCiAgInNob3J0X25hbWUiOiAiUEFOR0tBTEFOIiwKICAic3RhcnRfdXJsIjogIi4iLAogICJkaXNwbGF5IjogInN0YW5kYWxvbmUiLAogICJiYWNrZ3JvdW5kX2NvbG9yIjogIiNmOGZhZjUiLAogICJ0aGVtZV9jb2xvciI6ICIjODRjYzE2IiwKICAiaWNvbnMiOiBbCiAgICB7CiAgICAgICJzcmMiOiAiaHR0cHM6Ly9pY29ucy5pY29uYXJjaGl2ZS5jb20vaWNvbnMvZ29vZ2xlL25vdG8tZW1vamktZm9vZC1kcmluay8xMjgvNDA3NjEtYm93bC13aXRoLXNwb29uLWljb24ucG5nIiwKICAgICAgInR5cGUiOiAiaW1hZ2UvcG5nIiwKICAgICAgInNpemVzIjogIjEyOHgxMjgiCiAgICB9CiAgXQp9">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #84cc16; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        
        @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-up { animation: slideUp 0.4s ease-out forwards; }
        
        .glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); }
        
        @media (max-width: 1024px) {
            .mobile-cart-active { transform: translateX(0) !important; }
        }
        
        .card-image-container { position: relative; padding-top: 75%; overflow: hidden; border-radius: 2rem; }
        .card-image-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
        
        .nav-active { background-color: #84cc16; color: white; box-shadow: 0 15px 30px -5px rgba(132, 204, 22, 0.3); }
        
        svg { flex-shrink: 0; }
    </style>
</head>
<body class="bg-[#F9FBF6] text-slate-800 overflow-hidden">

    <div class="flex h-screen w-full overflow-hidden">
        
        <!-- SIDEBAR (Desktop) -->
        <aside class="w-72 bg-white border-r border-lime-100 hidden lg:flex flex-col flex-shrink-0 shadow-sm z-30">
            <div class="p-10">
                <h1 class="text-3xl font-extrabold text-lime-600 tracking-tighter uppercase">Pangkalan<span class="text-lime-200">.</span></h1>
            </div>
            <nav class="flex-1 px-6 space-y-2">
                <button class="w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-bold nav-active transition-all">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg> Dashboard
                </button>
                <button class="w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-bold text-slate-400 hover:bg-lime-50 hover:text-lime-600 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25c.938-.33 1.948-.512 3-.512.162 0 .324.012.484.035L12 18V6.042zm0 0A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25c-.938-.33-1.948-.512-3-.512-1.052 0-2.062.18-3 .512v-14.25z"/></svg> Menu Order
                </button>
                <button class="w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-bold text-slate-400 hover:bg-lime-50 hover:text-lime-600 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg> Favorit
                </button>
                <button class="w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-bold text-slate-400 hover:bg-lime-50 hover:text-lime-600 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/></svg> Laporan
                </button>
            </nav>
            <div class="p-8">
                <div class="bg-stone-900 rounded-[32px] p-6 text-white relative overflow-hidden group shadow-lg">
                    <div class="absolute -right-4 -top-4 w-20 h-20 bg-lime-500 rounded-full blur-2xl opacity-20 group-hover:scale-150 transition-all"></div>
                    <p class="relative z-10 font-bold mb-1">Butuh Bantuan?</p>
                    <p class="relative z-10 text-[10px] text-stone-400 mb-4 font-medium uppercase tracking-widest leading-none">Pangkalan CS 24/7</p>
                    <button class="w-full bg-lime-500 text-white py-3 rounded-2xl font-bold text-sm hover:bg-lime-400 transition-all shadow-lg flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 2.01.59 3.87 1.61 5.44L2.01 22l4.73-1.55c1.47.8 3.14 1.25 4.9 1.25 5.52 0 9.99-4.47 9.99-9.99S17.53 2.01 12.01 2.01zm5.55 13.91c-.24.68-1.2 1.25-1.65 1.33-.45.08-.9.16-2.58-.5-2.18-.86-3.59-3.08-3.7-3.22-.11-.14-.88-1.17-.88-2.24s.55-1.6.75-1.81c.2-.21.43-.27.57-.27s.28.01.41.02c.14.01.32-.05.51.41.19.46.66 1.6.72 1.72.06.12.1.26.02.43-.08.17-.12.27-.24.42-.12.15-.26.33-.37.45-.12.13-.25.27-.11.51.14.24.62 1.03 1.33 1.66.91.82 1.68 1.07 1.92 1.19.24.12.38.1.51-.05.13-.15.58-.68.74-.91.16-.24.32-.2.54-.12.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.11.06.63-.18 1.31z"/></svg> Chat Admin
                    </button>
                </div>
            </div>
        </aside>

        <!-- MAIN AREA -->
        <main class="flex-1 flex flex-col min-w-0 bg-[#F9FBF6] overflow-hidden relative">
            <!-- Header -->
            <header class="px-6 lg:px-12 py-6 lg:py-8 flex items-center justify-between sticky top-0 glass z-20 border-b border-stone-100 lg:border-none flex-shrink-0">
                <div class="flex items-center gap-4 flex-shrink-0">
                    <button onclick="toggleMobileCart()" class="lg:hidden p-3 bg-lime-500 text-white rounded-2xl shadow-lg relative flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                        <span id="cartCountMobile" class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black hidden">0</span>
                    </button>
                    <div class="min-w-0">
                        <h2 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight truncate">Halo, Zack! 👋</h2>
                        <p class="text-slate-400 text-sm hidden lg:block font-medium truncate tracking-wide">Selamat datang kembali di RM Pangkalan.</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3 lg:gap-6 ml-4 flex-shrink-0">
                    <div class="relative hidden md:flex items-center group">
                        <svg class="w-5 h-5 absolute left-5 text-slate-400 group-focus-within:text-lime-600 transition-colors" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                        <input type="text" id="searchInput" placeholder="Cari menu..." class="pl-14 pr-6 py-4 bg-white border border-stone-100 rounded-[24px] outline-none w-48 xl:w-80 font-bold shadow-sm focus:ring-4 focus:ring-lime-100 transition-all placeholder:text-slate-300">
                    </div>
                    <button onclick="toggleAdmin()" id="adminToggleBtn" class="px-5 py-3 lg:px-7 lg:py-4 rounded-2xl font-extrabold text-[10px] lg:text-xs tracking-widest transition-all bg-slate-800 text-white hover:bg-black shadow-lg flex items-center gap-2 uppercase">
                        <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg> Admin
                    </button>
                    <div class="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl overflow-hidden shadow-lg border-2 lg:border-4 border-white flex-shrink-0 ring-1 ring-stone-100">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Profile" class="w-full h-full object-cover">
                    </div>
                </div>
            </header>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto px-6 lg:px-12 pb-24 lg:pb-12 space-y-10 custom-scrollbar">
                
                <!-- Promo Hero -->
                <div class="relative rounded-[40px] lg:rounded-[50px] overflow-hidden h-48 lg:h-64 flex items-center px-8 lg:px-16 group shadow-xl shadow-lime-100 mt-4 flex-shrink-0 animate-up">
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Hero">
                    <div class="absolute inset-0 bg-gradient-to-r from-lime-950/85 via-lime-900/35 to-transparent"></div>
                    <div class="relative z-10 text-white max-w-md">
                        <span class="inline-block bg-lime-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 shadow-lg ring-1 ring-white/20">Special Promo</span>
                        <h3 class="text-3xl lg:text-4xl font-black mb-2 leading-tight tracking-tight">Kenyang Hemat <br>Diskon 20%!</h3>
                        <p class="text-lime-50 mb-4 text-xs lg:text-sm opacity-90 hidden sm:block font-medium">Syarat & Ketentuan Berlaku. Khusus menu Segeran.</p>
                        <button class="bg-white text-lime-900 px-7 py-3.5 rounded-2xl font-black hover:bg-lime-50 transition-all shadow-xl text-[10px] uppercase flex items-center gap-2">
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg> Ambil Sekarang
                        </button>
                    </div>
                </div>

                <!-- Categories -->
                <div>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-1.5 h-6 bg-lime-500 rounded-full"></div>
                        <h3 class="text-xl font-extrabold text-slate-900 uppercase tracking-widest text-sm">Kategori Menu</h3>
                    </div>
                    <div id="categoryList" class="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        <!-- JS Render -->
                    </div>
                </div>

                <!-- Product Grid -->
                <div class="pb-10">
                    <div class="flex justify-between items-center mb-8">
                        <h3 id="categoryTitle" class="text-xl font-black text-slate-900 uppercase tracking-tighter">MAKANAN TERBAIK</h3>
                        <div class="flex gap-2">
                            <button class="p-3 bg-white rounded-xl border border-stone-100 shadow-sm text-slate-400 hover:text-lime-600 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg></button>
                            <button class="p-3 bg-white rounded-xl border border-stone-100 shadow-sm text-lime-600 hover:bg-lime-50 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></button>
                        </div>
                    </div>
                    <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                        <!-- JS Render -->
                    </div>
                </div>
            </div>

            <!-- Bottom Navigation (Mobile) -->
            <nav class="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-stone-100 flex justify-around py-4 z-40 px-6">
                <button class="p-2 text-lime-600"><svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/></svg></button>
                <button class="p-2 text-slate-300"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25c.938-.33 1.948-.512 3-.512.162 0 .324.012.484.035L12 18V6.042zm0 0A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25c-.938-.33-1.948-.512-3-.512-1.052 0-2.062.18-3 .512v-14.25z"/></svg></button>
                <button class="p-2 text-slate-300"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></button>
                <button class="p-2 text-slate-300"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg></button>
            </nav>
        </main>

        <!-- CART SIDEBAR -->
        <aside id="cartSidebar" class="fixed inset-y-0 right-0 w-full md:w-[450px] lg:w-[380px] xl:w-[420px] 2xl:w-[450px] bg-white border-l border-lime-50 flex flex-col z-[60] transition-transform duration-500 translate-x-full lg:translate-x-0 lg:relative shadow-2xl lg:shadow-none flex-shrink-0">
            <div class="p-8 xl:p-10 flex-1 flex flex-col overflow-hidden">
                <div class="flex justify-between items-center mb-8">
                    <div class="flex items-center gap-4">
                        <div class="bg-lime-100 text-lime-600 p-4 rounded-3xl shadow-inner flex items-center justify-center">
                            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H5.25zm9.45 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm-3.375 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z"/></svg>
                        </div>
                        <div>
                            <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Saldo Pangkalan</p>
                            <p class="font-black text-xl xl:text-2xl text-slate-900 tracking-tighter">Rp 12.000.000</p>
                        </div>
                    </div>
                    <button onclick="toggleMobileCart()" class="lg:hidden p-3 bg-stone-100 rounded-full text-stone-500 flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
                </div>

                <div class="bg-stone-900 rounded-[32px] p-6 xl:p-8 mb-8 text-white relative overflow-hidden shadow-xl">
                    <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-lime-500 rounded-full blur-3xl opacity-30"></div>
                    <div class="flex items-center gap-4 relative z-10">
                        <div class="bg-white/10 p-3 rounded-xl text-lime-400 backdrop-blur-md flex items-center justify-center ring-1 ring-white/10">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-[10px] text-stone-400 font-black uppercase tracking-widest">Antar ke:</p>
                            <p class="font-bold text-xs xl:text-sm truncate">Area Kantin, Meja 12</p>
                        </div>
                        <button class="text-[10px] font-black text-lime-400 hover:underline flex-shrink-0 uppercase">Ubah</button>
                    </div>
                </div>

                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-black text-slate-900 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg> Pesanan Saya
                    </h3>
                    <span id="cartCountBadge" class="bg-lime-100 text-lime-600 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">0 ITEMS</span>
                </div>

                <div id="cartItemsContainer" class="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                    <!-- JS Render -->
                </div>
            </div>

            <div class="p-8 xl:p-10 border-t border-stone-50 bg-white space-y-6 pb-24 lg:pb-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] flex-shrink-0">
                <div class="space-y-3">
                    <div class="flex justify-between text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span id="subtotalText" class="text-slate-900 font-black">Rp 0</span>
                    </div>
                    <div class="flex justify-between text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <span>Biaya Parkir</span>
                        <span id="serviceText" class="text-slate-900 font-black">Rp 0</span>
                    </div>
                    <div class="flex justify-between pt-5 border-t border-stone-100 items-baseline">
                        <span class="font-black text-sm text-slate-900 uppercase tracking-tighter">Total Akhir</span>
                        <span id="totalText" class="font-black text-3xl text-lime-600 tracking-tighter leading-none">Rp 0</span>
                    </div>
                </div>
                <button onclick="checkoutWhatsApp()" id="checkoutBtn" disabled class="w-full bg-lime-500 text-white py-5 rounded-[28px] font-black text-lg shadow-xl shadow-lime-100 hover:bg-lime-600 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-30 disabled:translate-y-0 flex items-center justify-center gap-3 uppercase tracking-widest group">
                    <svg class="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 2.01.59 3.87 1.61 5.44L2.01 22l4.73-1.55c1.47.8 3.14 1.25 4.9 1.25 5.52 0 9.99-4.47 9.99-9.99S17.53 2.01 12.01 2.01zm5.55 13.91c-.24.68-1.2 1.25-1.65 1.33-.45.08-.9.16-2.58-.5-2.18-.86-3.59-3.08-3.7-3.22-.11-.14-.88-1.17-.88-2.24s.55-1.6.75-1.81c.2-.21.43-.27.57-.27s.28.01.41.02c.14.01.32-.05.51.41.19.46.66 1.6.72 1.72.06.12.1.26.02.43-.08.17-.12.27-.24.42-.12.15-.26.33-.37.45-.12.13-.25.27-.11.51.14.24.62 1.03 1.33 1.66.91.82 1.68 1.07 1.92 1.19.24.12.38.1.51-.05.13-.15.58-.68.74-.91.16-.24.32-.2.54-.12.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.11.06.63-.18 1.31z"/></svg> Bayar Via WA
                </button>
            </div>
        </aside>
    </div>

    <!-- ADMIN MODAL -->
    <div id="adminModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md hidden opacity-0 transition-all duration-300">
        <div class="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-lime-100 flex flex-col max-h-[90vh]">
            <div class="p-8 border-b flex justify-between items-center bg-lime-50/30">
                <h3 id="modalTitle" class="font-black text-2xl text-lime-900 tracking-tight flex items-center gap-2 uppercase">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg> Data Menu
                </h3>
                <button onclick="toggleModal(false)" class="p-3 hover:bg-lime-200/50 rounded-full text-lime-700 transition-colors flex items-center justify-center"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>
            <div class="p-8 overflow-y-auto">
                <form id="menuForm" class="space-y-5">
                    <input type="hidden" id="formId">
                    <div class="space-y-1">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Menu Lengkap</label>
                        <input type="text" id="formName" required class="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-lime-500 focus:bg-white outline-none font-bold text-slate-800 transition-all">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</label>
                            <select id="formCategory" class="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-slate-800 appearance-none">
                                <option value="makanan">Makanan</option>
                                <option value="segeran">Segeran</option>
                                <option value="wedangan">Wedangan</option>
                                <option value="camilan">Camilan</option>
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga Dasar (Rp)</label>
                            <input type="number" id="formPrice" required class="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-slate-800">
                        </div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Gambar (lh3 / Unsplash)</label>
                        <input type="text" id="formImage" required class="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-slate-800" placeholder="https://...">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Label Promo / Diskon</label>
                        <input type="text" id="formDiscount" class="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-slate-800" placeholder="Misal: Beli 2 Gratis 1">
                    </div>
                    <div class="pt-4">
                        <button type="submit" id="submitBtn" class="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-base hover:bg-black transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"/></svg> Simpan Data Menu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-12 left-1/2 -translate-x-1/2 z-[150] px-8 py-4 rounded-full shadow-2xl bg-stone-900 text-white font-black text-xs uppercase tracking-widest opacity-0 translate-y-10 transition-all pointer-events-none flex items-center gap-3">
        <svg id="toastIcon" class="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> <span id="toastMsg">Berhasil!</span>
    </div>

    <script>
        const API_URL = "https://script.google.com/macros/s/AKfycbx6ICN5u1Dam4jTKojAea_5QvX1PKWxmWEymcVjzHvRF0mVRH2MxC_AeEMXVeTzFlqkrw/exec";
        const WA_PHONE = "6281234567890";
        
        let allMenu = [];
        let cart = [];
        let currentCategory = 'makanan';
        let isAdmin = false;
        let searchQuery = '';

        const categories = [
            { id: 'makanan', name: 'Makanan', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25c.938-.33 1.948-.512 3-.512.162 0 .324.012.484.035L12 18V6.042zm0 0A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25c-.938-.33-1.948-.512-3-.512-1.052 0-2.062.18-3 .512v-14.25z"/>` },
            { id: 'segeran', name: 'Segeran', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v1.244c0 .892-.567 1.686-1.392 2.043a5.25 5.25 0 00-3.108 4.807v7.57a3 3 0 003 3h.75m9-18.664v1.244c0 .892.567 1.686 1.392 2.043a5.25 5.25 0 013.108 4.807v7.57a3 3 0 01-3 3h-.75m-12-3.375h12m-9-1.5h6m-7.5-1.5h9l-1.125 1.125a4.5 4.5 0 00-1.125 3.187v.338c0 .621.504 1.125 1.125 1.125h1.5a1.125 1.125 0 011.125 1.125v.338a4.5 4.5 0 01-1.125 3.187L12 21M7.5 15h9"/>` },
            { id: 'wedangan', name: 'Wedangan', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>` },
            { id: 'camilan', name: 'Camilan', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5v2.25m0-2.25l2.25 1.313m0 9v2.25m0-2.25l2.25 1.313M3 16.5l2.25-1.313M21 16.5l-2.25-1.313M21 16.5v2.25m0-2.25l-2.25 1.313m-13.5 0h13.5"/>` }
        ];

        async function fetchMenu() {
            try {
                const res = await fetch(`${API_URL}?action=read`);
                const data = await res.json();
                allMenu = data.map(item => ({
                    ...item,
                    id: String(item.id),
                    price: Number(item.price),
                    rating: Number(item.rating || 4.8)
                }));
                renderMenu();
            } catch (err) {
                console.error("Gagal sinkron Sheets, menggunakan data cadangan.");
                allMenu = [
                    { id: "001", name: "Ayam Penyet Pangkalan", price: 25000, category: "makanan", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", rating: 4.8, discount: "10% OFF" },
                    { id: "002", name: "Es Jeruk Segar", price: 10000, category: "segeran", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd", rating: 4.5 }
                ];
                renderMenu();
            }
        }

        function renderCategories() {
            const container = document.getElementById('categoryList');
            container.innerHTML = categories.map(cat => `
                <button onclick="setCategory('${cat.id}')" class="flex items-center gap-3 whitespace-nowrap px-8 py-4 rounded-[24px] transition-all font-black text-[11px] border-2 uppercase tracking-wider ${currentCategory === cat.id ? 'bg-lime-500 border-lime-500 text-white shadow-xl -translate-y-1' : 'bg-white border-stone-50 text-slate-400 hover:border-lime-200 shadow-sm'}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">${cat.icon}</svg> ${cat.name}
                </button>
            `).join('');
        }

        function renderMenu() {
            const grid = document.getElementById('productGrid');
            const title = document.getElementById('categoryTitle');
            title.innerText = `${currentCategory.toUpperCase()} TERBAIK`;

            const filtered = allMenu.filter(m => 
                m.category === currentCategory && 
                m.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filtered.length === 0) {
                grid.innerHTML = `<div class="col-span-full py-20 text-center font-black text-slate-300 uppercase tracking-widest text-sm animate-up">Menu Kosong</div>`;
                return;
            }

            grid.innerHTML = filtered.map(item => `
                <div class="bg-white rounded-[40px] p-5 shadow-lg border border-stone-50 group hover:shadow-lime-100 hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full animate-up">
                    ${item.discount ? `<div class="absolute top-6 left-6 z-10 bg-orange-500 text-white text-[8px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.964 2.815a.75.75 0 01.023 1.06L11.114 5.75h1.211a.75.75 0 01.75.75v1.211l1.875-1.873a.75.75 0 111.06 1.06l-1.873 1.875h1.211a.75.75 0 01.75.75v1.211l1.875-1.873a.75.75 0 111.06 1.06l-1.873 1.875h1.211a.75.75 0 01.75.75v1.211l1.875-1.873a.75.75 0 111.06 1.06l-1.873 1.875h1.211a.75.75 0 01.75.75v1.211l1.875-1.873a.75.75 0 111.06 1.06l-1.873 1.875h1.211a.75.75 0 01.75.75v1.211l1.875-1.873a.75.75 0 111.06 1.06l-1.873 1.875h1.211a.75.75 0 01.75.75v1.211l1.875-1.873a.75.75 0 111.06 1.06l-1.873 1.875h1.211a.75.75 0 01.75.75v.352a.75.75 0 01-.75.75h-10.5a.75.75 0 01-.75-.75V3.375c0-.621.504-1.125 1.125-1.125h1.125c.621 0 1.125.504 1.125 1.125V3h10.5v-.185a.75.75 0 011.5 0v.185h.375a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H3.375A2.25 2.25 0 011.125 18.75V5.25a2.25 2.25 0 012.25-2.25h.375V2.815a.75.75 0 011.06-.023z" clip-rule="evenodd" /></svg> ${item.discount}</div>` : ''}
                    
                    ${isAdmin ? `
                    <div class="absolute top-6 right-6 z-20 flex gap-2">
                        <button onclick="openEdit('${item.id}')" class="bg-white p-2.5 rounded-xl shadow-lg text-amber-500 hover:bg-amber-500 hover:text-white transition-all scale-90 hover:scale-100 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg></button>
                        <button onclick="deleteItem('${item.id}')" class="bg-white p-2.5 rounded-xl shadow-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-all scale-90 hover:scale-100 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg></button>
                    </div>` : ''}

                    <div class="card-image-container mb-5 shadow-sm ring-1 ring-stone-100">
                        <img src="${item.image}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'" class="group-hover:scale-110 transition-transform duration-1000" alt="${item.name}">
                        <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-[9px] font-black text-slate-800 shadow-sm flex items-center gap-1"><svg class="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg> ${item.rating}</div>
                    </div>
                    
                    <div class="px-1 flex-1 flex flex-col">
                        <h4 class="font-black text-lg mb-1 text-slate-800 line-clamp-1 uppercase tracking-tight group-hover:text-lime-600 transition-colors leading-none tracking-tighter">${item.name}</h4>
                        <p class="text-slate-400 text-[9px] font-bold mb-5 tracking-widest uppercase opacity-70">ID: #${item.id}</p>
                        
                        <div class="mt-auto flex justify-between items-center pt-4 border-t border-stone-100">
                            <div class="flex flex-col">
                                <span class="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Harga</span>
                                <span class="text-xl font-black text-slate-900 tracking-tighter leading-none">Rp ${item.price.toLocaleString('id-ID')}</span>
                            </div>
                            <button onclick="addToCart('${item.id}')" class="bg-lime-500 text-white p-4 rounded-[22px] shadow-lg shadow-lime-100 hover:bg-lime-600 hover:scale-110 transition-all active:scale-95 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderCart() {
            const container = document.getElementById('cartItemsContainer');
            const badge = document.getElementById('cartCountBadge');
            const badgeMobile = document.getElementById('cartCountMobile');

            const count = cart.reduce((a, b) => a + b.qty, 0);
            badge.innerText = `${count} ITEMS`;
            badgeMobile.innerText = count;
            badgeMobile.classList.toggle('hidden', count === 0);

            if (cart.length === 0) {
                container.innerHTML = `<div class="h-64 flex flex-col items-center justify-center opacity-20 text-center"><svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg><p class="font-black text-[10px] uppercase tracking-widest">Kosong...</p></div>`;
                updateTotals(0);
                document.getElementById('checkoutBtn').disabled = true;
                return;
            }

            document.getElementById('checkoutBtn').disabled = false;
            container.innerHTML = cart.map(item => `
                <div class="flex items-center gap-4 group animate-up">
                    <div class="w-16 h-16 rounded-[22px] overflow-hidden bg-stone-50 flex-shrink-0 shadow-md border-2 border-white ring-1 ring-stone-100">
                        <img src="${item.image}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h5 class="font-black text-xs text-slate-800 truncate uppercase mb-0.5 tracking-tight leading-none">${item.name}</h5>
                        <p class="text-lime-600 font-black text-base tracking-tighter leading-none mt-1">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</p>
                    </div>
                    <div class="flex items-center bg-stone-100 rounded-xl p-1 shadow-inner flex-shrink-0">
                        <button onclick="changeQty('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-rose-500 font-bold transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"/></svg></button>
                        <span class="w-6 text-center font-black text-slate-900 text-xs">${item.qty}</span>
                        <button onclick="changeQty('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-lime-600 font-bold transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg></button>
                    </div>
                </div>
            `).join('');

            updateTotals(cart.reduce((a, b) => a + (b.price * b.qty), 0));
        }

        function setCategory(id) {
            currentCategory = id;
            renderCategories();
            renderMenu();
        }

        function addToCart(id) {
            const item = allMenu.find(m => m.id === id);
            const exist = cart.find(c => c.id === id);
            if (exist) exist.qty += 1;
            else cart.push({ ...item, qty: 1 });
            toast("Siap! Berhasil Ditambahkan");
            renderCart();
        }

        function changeQty(id, delta) {
            const item = cart.find(c => c.id === id);
            item.qty += delta;
            if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
            renderCart();
        }

        function updateTotals(subtotal) {
            const service = subtotal > 0 ? 5000 : 0;
            document.getElementById('subtotalText').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
            document.getElementById('serviceText').innerText = `Rp ${service.toLocaleString('id-ID')}`;
            document.getElementById('totalText').innerText = `Rp ${(subtotal + service).toLocaleString('id-ID')}`;
        }

        function toggleAdmin() {
            isAdmin = !isAdmin;
            const btn = document.getElementById('adminToggleBtn');
            btn.innerHTML = isAdmin ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m2.25 0v10.5a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25V9m-9 0h9"/></svg> EXIT` : `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg> ADMIN`;
            btn.classList.toggle('bg-rose-600', isAdmin);
            btn.classList.toggle('bg-slate-800', !isAdmin);
            renderMenu();
        }

        function toggleMobileCart() {
            document.getElementById('cartSidebar').classList.toggle('mobile-cart-active');
        }

        function toast(msg) {
            const t = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = msg;
            t.style.opacity = '1';
            t.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                t.style.opacity = '0';
                t.style.transform = 'translate(-50%, 40px)';
            }, 2500);
        }

        function toggleModal(show, editData = null) {
            const modal = document.getElementById('adminModal');
            const form = document.getElementById('menuForm');
            if (show) {
                modal.classList.remove('hidden');
                setTimeout(() => modal.style.opacity = '1', 10);
                if (editData) {
                    document.getElementById('formId').value = editData.id;
                    document.getElementById('formName').value = editData.name;
                    document.getElementById('formPrice').value = editData.price;
                    document.getElementById('formCategory').value = editData.category;
                    document.getElementById('formImage').value = editData.image;
                    document.getElementById('formDiscount').value = editData.discount || '';
                } else {
                    form.reset();
                    document.getElementById('formId').value = '';
                }
            } else {
                modal.style.opacity = '0';
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        }

        function openEdit(id) {
            const item = allMenu.find(m => m.id === id);
            toggleModal(true, item);
        }

        async function deleteItem(id) {
            if (!confirm("Yakin ingin menghapus item ini dari Sheets?")) return;
            allMenu = allMenu.filter(m => m.id !== id);
            renderMenu();
            try {
                await fetch(API_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ action: 'delete', id: id })
                });
                toast("Item Dihapus Dari Sheets");
                fetchMenu();
            } catch (e) { toast("Sinkron Gagal"); }
        }

        document.getElementById('menuForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('formId').value;
            const data = {
                id: id || String(Date.now()).slice(-3).padStart(3, '0'),
                name: document.getElementById('formName').value,
                price: Number(document.getElementById('formPrice').value),
                category: document.getElementById('formCategory').value,
                image: document.getElementById('formImage').value,
                discount: document.getElementById('formDiscount').value,
                rating: 4.8
            };

            if (id) allMenu = allMenu.map(m => m.id === id ? data : m);
            else allMenu.push(data);
            
            renderMenu();
            toggleModal(false);
            
            try {
                await fetch(API_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ action: id ? 'update' : 'create', data: data })
                });
                toast("Sheets Terupdate!");
                fetchMenu();
            } catch (err) { toast("Sinkron Gagal"); }
        });

        function checkoutWhatsApp() {
            if (cart.length === 0) return;
            const items = cart.map(i => `- ${i.name} (${i.qty}x)`).join('%0A');
            const total = (cart.reduce((a, b) => a + (b.price * b.qty), 0) + 5000).toLocaleString('id-ID');
            const text = `Halo RM PANGKALAN!%0A Saya ingin memesan:%0A${items}%0A%0A Total: *Rp ${total}*`;
            window.open(`https://wa.me/${WA_PHONE}?text=${text}`, '_blank');
        }

        document.getElementById('searchInput').addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderMenu();
        });

        // INIT
        renderCategories();
        fetchMenu();
        renderCart();
    </script>
</body>
</html>
