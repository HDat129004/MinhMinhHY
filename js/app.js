/**
 * MINH MINH STORE — Core Application JS
 * Handles: Products, Cart, Storage, Utilities
 */

// =============================================
//   DATA STORE (localStorage)
// =============================================
const Store = {
  KEYS: {
    PRODUCTS: 'mm_products',
    ORDERS:   'mm_orders',
    CART:     'mm_cart',
    SETTINGS: 'mm_settings',
  },

  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch { return false; }
  },

  // Products
  getProducts()  { return this.get(this.KEYS.PRODUCTS) || []; },
  setProducts(p) { return this.set(this.KEYS.PRODUCTS, p); },

  getProduct(id) {
    return this.getProducts().find(p => p.id === id) || null;
  },

  addProduct(product) {
    const products = this.getProducts();
    products.unshift(product);
    this.setProducts(products);
  },

  updateProduct(id, updates) {
    const products = this.getProducts().map(p =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    this.setProducts(products);
  },

  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.setProducts(products);
  },

  // Orders
  getOrders()  { return this.get(this.KEYS.ORDERS) || []; },
  setOrders(o) { return this.set(this.KEYS.ORDERS, o); },

  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.setOrders(orders);
    return order;
  },

  updateOrderStatus(id, status) {
    const orders = this.getOrders().map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
    );
    this.setOrders(orders);
  },

  // Cart
  getCart()  { return this.get(this.KEYS.CART) || []; },
  setCart(c) { return this.set(this.KEYS.CART, c); },

  // Settings
  getSettings()  { return this.get(this.KEYS.SETTINGS) || { storeName: 'Minh Minh Hưng Yên', phone: '0368 386 357', address: 'Đường Huyện Đội, Yên Mỹ, Hưng Yên' }; },
};

// =============================================
//   SAMPLE DATA (seed on first visit)
// =============================================
const SAMPLE_PRODUCTS = [
  // Camera
  {
    id: 'prod_cam_001',
    name: 'Camera Dome Hikvision 2MP',
    category: 'Camera',
    brand: 'Hikvision',
    price: 650000,
    originalPrice: 850000,
    description: 'Camera quan sát Dome hồng ngoại 2MP chuẩn HD, góc nhìn rộng, lắp đặt ốp trần thẩm mỹ cho văn phòng, hộ gia đình.',
    specs: { 'Độ phân giải': '2.0 Megapixel', 'Tầm xa hồng ngoại': '20m', 'Tiêu chuẩn': 'IP66', 'Chất liệu': 'Nhựa cao cấp', 'Hỗ trợ': 'Bù sáng BLC, chống ngược sáng DWDR' },
    images: ['📷'],
    stock: 25,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_cam_002',
    name: 'Camera Thân Dahua 4MP ngoài trời',
    category: 'Camera',
    brand: 'Dahua',
    price: 1200000,
    originalPrice: 1550000,
    description: 'Camera thân trụ ngoài trời độ nét cao 4MP, vỏ kim loại chống nước chuẩn IP67, tích hợp mic thu âm.',
    specs: { 'Độ phân giải': '4.0 Megapixel', 'Hồng ngoại': '30m', 'Kháng nước': 'IP67', 'Tính năng': 'Tích hợp Mic, hỗ trợ PoE', 'Vỏ': 'Kim loại' },
    images: ['📹'],
    stock: 18,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_cam_003',
    name: 'Camera PTZ 360 Dahua Zoom 25x',
    category: 'Camera',
    brand: 'Dahua',
    price: 4500000,
    originalPrice: 5500000,
    description: 'Camera quay quét thông minh 360 độ, zoom quang học 25x tầm xa hồng ngoại 100m, bám đuổi mục tiêu AI.',
    specs: { 'Độ phân giải': '2.0 MP', 'Zoom quang': '25x', 'Hồng ngoại': '100m', 'Quay quét': 'Ngang 360°, dọc 90°', 'Tính năng AI': 'Phân biệt người/xe, bám đuổi thông minh' },
    images: ['📡'],
    stock: 5,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_cam_004',
    name: 'Đầu ghi hình Dahua 16 kênh chuẩn 4K',
    category: 'Camera',
    brand: 'Dahua',
    price: 2800000,
    originalPrice: 3500000,
    description: 'Đầu ghi hình camera 16 cổng hỗ trợ camera độ phân giải đến 8MP, chuẩn nén H.265+ tiết kiệm ổ cứng.',
    specs: { 'Số kênh': '16 Kênh', 'Độ phân giải hỗ trợ': 'Tối đa 8MP (4K)', 'Chuẩn nén': 'H.265+', 'Ổ cứng hỗ trợ': '1 ổ SATA lên đến 8TB', 'Cổng xuất hình': 'HDMI 4K, VGA' },
    images: ['📦'],
    stock: 10,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
  },

  // Mạng & Viễn thông
  {
    id: 'prod_net_001',
    name: 'Router Wi-Fi 6 Ruijie Reyee RG-EW3200GX',
    category: 'Mạng & Viễn thông',
    brand: 'Ruijie',
    price: 2450000,
    originalPrice: 3100000,
    description: 'Router Wi-Fi 6 tốc độ 3200Mbps chuyên dụng chịu tải lớn 100+ user, hỗ trợ công nghệ Mesh Wi-Fi.',
    specs: { 'Chuẩn Wi-Fi': 'Wi-Fi 6 (802.11ax)', 'Tốc độ': '3200 Mbps', 'Chịu tải': 'Lên đến 120 user', 'Ăng-ten': '8 Ăng-ten ngoài 6dBi', 'Cổng mạng': '1 WAN, 4 LAN Gigabit' },
    images: ['📶'],
    stock: 15,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_net_002',
    name: 'Switch POE Dahua 24 Cổng Gigabit',
    category: 'Mạng & Viễn thông',
    brand: 'Dahua',
    price: 3850000,
    originalPrice: 4600000,
    description: 'Switch chuyên dụng cho hệ thống camera POE, 24 cổng POE Gigabit cấp nguồn & truyền tín hiệu xa 250m.',
    specs: { 'Số cổng': '24 cổng POE + 2 cổng Uplink', 'Tốc độ': '10/100/1000 Mbps', 'Công suất POE': 'Tối đa 240W', 'Khoảng cách cấp nguồn': 'Lên đến 250m (ở chế độ Extend)' },
    images: ['🔌'],
    stock: 12,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_net_003',
    name: 'Cáp mạng Cat6 UTP Commscope chính hãng',
    category: 'Mạng & Viễn thông',
    brand: 'Commscope',
    price: 950000,
    originalPrice: 1250000,
    description: 'Cuộn cáp mạng Cat6 UTP 305m lõi đồng nguyên chất truyền tải băng thông Gigabit chuẩn xác.',
    specs: { 'Loại cáp': 'Cat6 UTP', 'Chiều dài': '305m/cuộn', 'Chất liệu lõi': 'Đồng nguyên chất 100%', 'Tốc độ truyền': '1 Gbps', 'Vỏ ngoài': 'PVC xanh lá' },
    images: ['🔗'],
    stock: 45,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
  },

  // IT & Máy chủ
  {
    id: 'prod_it_001',
    name: 'Thiết bị lưu trữ NAS Synology DS224+',
    category: 'IT & Máy chủ',
    brand: 'Synology',
    price: 8900000,
    originalPrice: 10500000,
    description: 'Thiết bị lưu trữ dữ liệu trung tâm NAS 2 khay cho văn phòng, hỗ trợ phân quyền, backup dữ liệu tự động.',
    specs: { 'Số khay ổ cứng': '2 khay SATA', 'CPU': 'Intel Celeron J4125 4-core', 'RAM': '2GB DDR4 (nâng cấp tối đa 6GB)', 'Cổng kết nối': '2 cổng LAN 1GbE', 'Hệ điều hành': 'DSM Synology' },
    images: ['🖥️'],
    stock: 8,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_it_002',
    name: 'PC Đồng Bộ Dell Optiplex 3000 SFF',
    category: 'IT & Máy chủ',
    brand: 'Dell',
    price: 10500000,
    originalPrice: 12500000,
    description: 'Máy tính để bàn đồng bộ Dell nhỏ gọn bền bỉ, cấu hình văn phòng Intel Core i3 thế hệ mới.',
    specs: { 'CPU': 'Intel Core i3-12100', 'RAM': '8GB DDR4', 'Ổ cứng': 'SSD 256GB NVMe', 'Hệ điều hành': 'Windows 11 Home', 'Kèm theo': 'Bàn phím & Chuột Dell' },
    images: ['💻'],
    stock: 14,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_it_003',
    name: 'Laptop Dell Latitude 3540 Core i5',
    category: 'IT & Máy chủ',
    brand: 'Dell',
    price: 13900000,
    originalPrice: 16500000,
    description: 'Laptop học tập & làm việc văn phòng màn hình lớn 15.6 inch FHD, chip Intel Core i5 mạnh mẽ.',
    specs: { 'CPU': 'Intel Core i5-1335U', 'RAM': '8GB DDR4', 'SSD': '512GB NVMe', 'Màn hình': '15.6" FHD IPS', 'Trọng lượng': '1.8 kg' },
    images: ['💻'],
    stock: 20,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
  },

  // Máy in & Thiết bị
  {
    id: 'prod_prn_001',
    name: 'Máy in Laser Đa năng Canon MF264dw',
    category: 'Máy in & Thiết bị',
    brand: 'Canon',
    price: 4800000,
    originalPrice: 5800000,
    description: 'Máy in đa năng đen trắng 3 trong 1: In, Copy, Scan. Hỗ trợ in 2 mặt tự động và kết nối Wi-Fi/LAN.',
    specs: { 'Chức năng': 'In, Copy, Scan màu', 'Tốc độ in': '28 trang/phút', 'In 2 mặt': 'Tự động', 'Kết nối': 'Wi-Fi, LAN, USB', 'Hộp mực': 'Cartridge 051 (~1.700 trang)' },
    images: ['🖨️'],
    stock: 7,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_prn_002',
    name: 'Máy chiếu Epson EB-E01 XGA',
    category: 'Máy in & Thiết bị',
    brand: 'Epson',
    price: 9800000,
    originalPrice: 11500000,
    description: 'Máy chiếu văn phòng, lớp học độ sáng cao 3400 Ansi Lumens, độ phân giải XGA hiển thị văn bản cực rõ.',
    specs: { 'Độ sáng': '3400 Ansi Lumens', 'Độ phân giải': 'XGA (1024x768)', 'Độ tương phản': '15.000:1', 'Tuổi thọ bóng đèn': 'Lên đến 12.000 giờ', 'Cổng kết nối': 'HDMI, VGA, USB' },
    images: ['🎥'],
    stock: 6,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
  }
];

function seedData() {
  const currentProducts = Store.getProducts();
  const validCategories = ['Camera', 'Mạng & Viễn thông', 'IT & Máy chủ', 'Máy in & Thiết bị', 'Văn phòng phẩm'];
  const hasOldCategories = currentProducts.some(p => !p.category || !validCategories.includes(p.category));

  if (currentProducts.length === 0 || hasOldCategories) {
    Store.setProducts(SAMPLE_PRODUCTS);
  }
}

const CATEGORIES = [
  { id: 'all',                name: 'Tất cả',             icon: '🏪' },
  { id: 'Camera',             name: 'Camera giám sát',    icon: '📷' },
  { id: 'Mạng & Viễn thông',  name: 'Mạng & Viễn thông', icon: '📶' },
  { id: 'IT & Máy chủ',       name: 'IT & Máy chủ',       icon: '💻' },
  { id: 'Máy in & Thiết bị',  name: 'Máy in & Thiết bị',  icon: '🖨️' },
  { id: 'Văn phòng phẩm',     name: 'Văn phòng phẩm',     icon: '📁' },
];

// =============================================
//   CART MANAGEMENT
// =============================================
const Cart = {
  getItems() { return Store.getCart(); },

  addItem(product, qty = 1) {
    const cart = this.getItems();
    const existingIdx = cart.findIndex(i => i.productId === product.id);
    if (existingIdx >= 0) {
      cart[existingIdx].qty += qty;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images?.[0] || '📦',
        qty,
      });
    }
    Store.setCart(cart);
    this.updateBadge();
  },

  updateQty(productId, qty) {
    if (qty <= 0) { this.removeItem(productId); return; }
    const cart = this.getItems().map(i =>
      i.productId === productId ? { ...i, qty } : i
    );
    Store.setCart(cart);
    this.updateBadge();
  },

  removeItem(productId) {
    const cart = this.getItems().filter(i => i.productId !== productId);
    Store.setCart(cart);
    this.updateBadge();
  },

  clear() {
    Store.setCart([]);
    this.updateBadge();
  },

  getTotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  updateBadge() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.toggle('visible', count > 0);
    });
  },
};

// =============================================
//   PRODUCT COMPARISON MANAGEMENT
// =============================================
const Compare = {
  getKeys() {
    try {
      const raw = localStorage.getItem('mm_compare');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  },

  setKeys(keys) {
    localStorage.setItem('mm_compare', JSON.stringify(keys));
    this.updateStickyBar();
  },

  isAdded(id) {
    return this.getKeys().includes(id);
  },

  toggle(id) {
    let keys = this.getKeys();
    const idx = keys.indexOf(id);
    if (idx >= 0) {
      keys.splice(idx, 1);
    } else {
      if (keys.length >= 3) {
        UI.toast('Chỉ có thể so sánh tối đa 3 sản phẩm!', 'warning');
        return false;
      }
      keys.push(id);
    }
    this.setKeys(keys);
    return true;
  },

  updateStickyBar() {
    const keys = this.getKeys();
    
    // Skip rendering sticky bar on compare.html itself
    if (window.location.pathname.includes('compare.html')) return;

    const bar = document.getElementById('compare-sticky-bar') || (() => {
      const el = document.createElement('div');
      el.id = 'compare-sticky-bar';
      el.style.cssText = 'position: fixed; bottom: 30px; left: 30px; right: 30px; max-width: 650px; margin: 0 auto; background: #ffffff; border: 2px solid var(--orange); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; z-index: 10000; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); transform: translateY(150%); gap: 16px; flex-wrap: wrap;';
      document.body.appendChild(el);
      return el;
    })();

    if (keys.length === 0) {
      bar.style.transform = 'translateY(150%)';
      return;
    }

    const products = keys.map(id => Store.getProduct(id)).filter(Boolean);

    bar.style.transform = 'translateY(0)';
    bar.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px; flex-grow:1;">
        <span style="font-size:13px; font-weight:800; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.5px;">So sánh (${keys.length}/3):</span>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          ${products.map(p => `
            <div style="display:flex; align-items:center; gap:6px; background:var(--bg-hover); padding:4px 10px; border-radius:6px; font-size:12px; border:1px solid var(--border);">
              <span>${p.images?.[0] || '📦'}</span>
              <span style="max-width:90px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:700; color:var(--text-primary);">${p.name}</span>
              <button onclick="event.stopPropagation(); removeCompareProduct('${p.id}')" style="background:none; border:none; color:var(--error); font-weight:800; cursor:pointer; font-size:14px; padding-left:4px;">×</button>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <button onclick="clearCompareProducts()" style="background:var(--bg-hover); border:1px solid var(--border); color:var(--text-secondary); font-size:12px; font-weight:700; padding:8px 14px; border-radius:8px; cursor:pointer; transition:0.2s;">Xóa tất cả</button>
        <button onclick="goToComparisonPage()" style="background:var(--orange); color:white; font-size:12px; font-weight:800; padding:8px 18px; border-radius:8px; cursor:pointer; box-shadow:0 6px 16px rgba(234,88,12,0.25); border:none; text-transform:uppercase; transition:0.2s;">So sánh ngay</button>
      </div>
    `;

    // Sync state to all inputs
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
      cb.checked = keys.includes(cb.dataset.id);
    });
  }
};

window.toggleCompareProduct = (id, el) => {
  const success = Compare.toggle(id);
  if (!success) {
    el.checked = !el.checked;
  }
};

window.removeCompareProduct = (id) => {
  Compare.toggle(id);
};

window.clearCompareProducts = () => {
  Compare.setKeys([]);
};

window.goToComparisonPage = () => {
  window.location.href = 'compare.html';
};

// =============================================
//   UI UTILITIES
// =============================================
const UI = {
  // Toast notification
  toast(message, type = 'default', duration = 3000) {
    const container = document.getElementById('toast-container')
      || (() => {
        const c = document.createElement('div');
        c.id = 'toast-container';
        c.className = 'toast-container';
        document.body.appendChild(c);
        return c;
      })();

    const icons = { default: '⭐', success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.default}</span>
      <span class="toast-text">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Format currency
  formatPrice(amount) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  },

  // Format date
  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },

  // Format datetime
  formatDateTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  },

  // Discount percent
  discountPercent(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round((1 - price / originalPrice) * 100);
  },

  // Generate ID
  genId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  },

  // Generate order ID
  genOrderId() {
    const n = Store.getOrders().length + 1;
    return `MM${String(n).padStart(5, '0')}`;
  },

  // Scroll to top button
  initScrollTop() {
    const btn = document.querySelector('.scroll-top-btn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  // Confirm dialog
  confirm(message) {
    return window.confirm(message);
  },
};

// =============================================
//   PRODUCT RENDERING
// =============================================
function renderProductCard(product) {
  const discount = UI.discountPercent(product.price, product.originalPrice);
  const imgContent = product.imageUrl
    ? `<img src="${product.imageUrl}" alt="${product.name}" loading="lazy">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:60px;">${product.images?.[0] || '📦'}</div>`;

  return `
    <div class="product-card animate-fadeInUp" onclick="window.location='product.html?id=${product.id}'">
      <div class="product-img-wrapper" style="position: relative;">
        ${imgContent}
        ${discount > 0 ? `<div class="product-badge-sale">-${discount}%</div>` : ''}
        <div style="position: absolute; top: 12px; right: 12px; z-index: 10; background: rgba(255, 255, 255, 0.95); padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.12); border: 1px solid var(--border);" onclick="event.stopPropagation();">
          <input type="checkbox" class="compare-checkbox" data-id="${product.id}" onchange="toggleCompareProduct('${product.id}', this)" ${Compare.isAdded(product.id) ? 'checked' : ''} style="width:14px; height:14px; accent-color: var(--orange); cursor: pointer; margin: 0;">
          <span style="color: var(--text-primary); user-select: none;">So sánh</span>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-brand">${product.brand}</div>
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-price">
          <span class="price-current">${UI.formatPrice(product.price)}</span>
          ${product.originalPrice > product.price ? `<span class="price-original">${UI.formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-card-footer">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); addToCartFromCard('${product.id}')">
            🛒 Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  `;
}

function addToCartFromCard(productId) {
  const product = Store.getProduct(productId);
  if (!product) return;
  Cart.addItem(product);
  UI.toast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
}

// =============================================
//   NAVBAR INIT
// =============================================
function initNavbar() {
  // Scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Cart badge
  Cart.updateBadge();
}

// =============================================
//   SHARED NAVBAR HTML
// =============================================
function renderNavbar() {
  const prefix = window.location.pathname.includes('/admin/') ? '../' : '';
  return `
    <nav class="navbar">
      <div class="container nav-inner">
        <a href="${prefix}index.html" class="nav-logo" style="display:flex;align-items:center;">
          <div style="font-size: 2rem; font-weight: 900; letter-spacing: -2px; line-height: 1; display:flex; align-items:center;">
            <span style="color: var(--orange);">M</span><span style="color: var(--green);">M</span>
          </div>
          <div style="border-left: 2px solid #cbd5e1; margin-left: 8px; padding-left: 8px; line-height: 1.1;">
            <span style="display:block; font-size: 8px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Công Ty TNHH</span>
            <strong style="font-size: 14px; color: var(--text-primary); font-family: var(--font-ui); font-weight: 800; letter-spacing: -0.3px;">MINH MINH HƯNG YÊN</strong>
          </div>
        </a>
        <div class="nav-links">
          <a href="${prefix}index.html"    class="nav-link">Trang chủ</a>
          <a href="${prefix}products.html" class="nav-link">Sản phẩm</a>
          <a href="${prefix}projects.html" class="nav-link">Dự án</a>
          <a href="${prefix}booking.html"  class="nav-link">Đặt lịch</a>
          <a href="${prefix}contact.html"  class="nav-link">Liên hệ</a>
        </div>
        <div class="nav-actions">
          <a href="${prefix}cart.html" class="cart-btn" id="cart-btn-nav" aria-label="Giỏ hàng">
            🛒
            <span class="cart-badge" id="cart-badge">0</span>
          </a>
          <button class="nav-mobile-toggle" onclick="toggleMobileMenu()" aria-label="Menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const prefix = window.location.pathname.includes('/admin/') ? '../' : '';
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand-name" style="display:flex;align-items:center;margin-bottom:16px;">
              <div style="font-size: 2rem; font-weight: 900; letter-spacing: -2px; line-height: 1; display:flex;">
                <span style="color: var(--orange);">M</span><span style="color: var(--green);">M</span>
              </div>
              <div style="border-left: 2px solid #cbd5e1; margin-left: 8px; padding-left: 8px; line-height: 1.1;">
                <span style="display:block; font-size: 8px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Công Ty TNHH</span>
                <strong style="font-size: 14px; color: var(--text-primary); font-family: var(--font-ui); font-weight: 800; letter-spacing: -0.3px;">MINH MINH HƯNG YÊN</strong>
              </div>
            </div>
            <p class="footer-desc">Đồng hành cùng doanh nghiệp tối ưu chi phí vận hành, nâng cấp hiệu suất làm việc với hệ thống thiết bị và giải pháp công nghệ chuẩn mực.</p>
            <div class="footer-social">
              <a href="#" class="social-btn" title="Facebook">f</a>
              <a href="https://zalo.me/0368386357" target="_blank" class="social-btn" title="Zalo" style="padding:0;">
                <img src="${prefix}assets/images/zalo-icon.png" alt="Zalo" style="width:20px;height:20px;object-fit:contain;border-radius:4px;">
              </a>
            </div>
          </div>
          <div>
            <div class="footer-title">Sản phẩm</div>
            <div class="footer-links">
              <a href="${prefix}products.html?cat=Camera" class="footer-link">Camera giám sát</a>
              <a href="${prefix}products.html?cat=Mạng & Viễn thông" class="footer-link">Mạng & Viễn thông</a>
              <a href="${prefix}products.html?cat=IT & Máy chủ" class="footer-link">IT & Máy chủ</a>
              <a href="${prefix}products.html?cat=Máy in & Thiết bị" class="footer-link">Máy in & Thiết bị</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Dịch vụ</div>
            <div class="footer-links">
              <a href="${prefix}booking.html" class="footer-link">Đặt lịch tư vấn</a>
              <a href="${prefix}projects.html" class="footer-link">Dự án tiêu biểu</a>
              <a href="${prefix}survey.html" class="footer-link">Khảo sát ý kiến</a>
              <a href="#" class="footer-link">Bảo trì hệ thống IT</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Liên hệ</div>
            <div class="footer-links">
              <span class="footer-link">📞 0368 386 357</span>
              <span class="footer-link">✉️ minhminhhungyenco.ltd@gmail.com</span>
              <span class="footer-link">📍 Đường Huyện Đội, Yên Mỹ, Hưng Yên</span>
              <span class="footer-link">🕐 MST: 0901197922</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Bản quyền © 2026 thuộc về Công Ty TNHH Minh Minh Hưng Yên</span>
          <span>Thiết kế bởi Minh Minh Team ❤️</span>
        </div>
      </div>
    </footer>
    <button class="scroll-top-btn" aria-label="Lên đầu trang">↑</button>
    <a href="https://zalo.me/0368386357" target="_blank" class="zalo-pulse">
      <img src="${prefix}assets/images/zalo-icon.png" alt="Zalo">
      <span>Chat Zalo Tư Vấn</span>
    </a>
    <div id="toast-container" class="toast-container"></div>
  `;
}

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.cssText = isOpen
    ? ''
    : 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(255,255,255,0.98);padding:24px;gap:16px;border-bottom:1px solid rgba(0,0,0,0.08);backdrop-filter:blur(20px);z-index:999;color:#0f172a;';
}

document.addEventListener('DOMContentLoaded', () => {
  seedData();

  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = renderNavbar();
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = renderFooter();
  }

  initNavbar();
  UI.initScrollTop();
  Compare.updateStickyBar();

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('PWA Service Worker registered:', reg.scope))
      .catch(err => console.error('PWA Service Worker registration failed:', err));
  }
});
