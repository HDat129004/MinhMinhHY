/**
 * MINH MINH STORE — Admin Panel JS
 * Handles: Auth, Products CRUD, Orders Management
 */

// =============================================
//   AUTH GUARD
// =============================================
function requireAuth() {
  const isAuth = localStorage.getItem('mm_admin_auth') === 'true';
  if (!isAuth) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function adminLogout() {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    localStorage.removeItem('mm_admin_auth');
    window.location.href = 'login.html';
  }
}

function initAdminNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && href !== '#') {
      const pageName = href.split('/').pop();
      if (currentPath === pageName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  });
}

// =============================================
//   ADMIN SIDEBAR
// =============================================
function renderAdminSidebar(activePage) {
  const pages = [
    { id: 'dashboard', href: 'dashboard.html', icon: '📊', label: 'Tổng quan' },
    { id: 'products',  href: 'products.html',  icon: '📦', label: 'Sản phẩm' },
    { id: 'orders',    href: 'orders.html',    icon: '🛒', label: 'Đơn hàng' },
    { id: 'bookings',  href: 'bookings.html',  icon: '📅', label: 'Đặt lịch' },
  ];

  const pendingOrders = (Store.getOrders() || []).filter(o => o.status === 'pending').length;

  return `
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="admin-sidebar-logo">
        <div class="admin-logo-icon">⚡</div>
        <div>
          <div class="admin-logo-text">Minh <span>Minh</span></div>
          <div class="admin-logo-sub">Quản trị hệ thống</div>
        </div>
      </div>
      <nav class="admin-nav">
        <div class="admin-nav-section">
          <div class="admin-nav-label">Menu chính</div>
          ${pages.map(p => `
            <a href="${p.href}" class="admin-nav-item ${activePage === p.id ? 'active' : ''}">
              <span class="admin-nav-icon">${p.icon}</span>
              <span>${p.label}</span>
              ${p.id === 'orders' && pendingOrders > 0 ? `<span class="admin-nav-badge">${pendingOrders}</span>` : ''}
            </a>
          `).join('')}
        </div>
        <div class="admin-nav-section">
          <div class="admin-nav-label">Khác</div>
          <a href="../index.html" class="admin-nav-item" target="_blank">
            <span class="admin-nav-icon">🌐</span>
            <span>Xem website</span>
          </a>
        </div>
      </nav>
      <div class="admin-sidebar-footer">
        <div class="admin-user-info">
          <div class="admin-avatar">A</div>
          <div>
            <div class="admin-user-name">Quản trị viên</div>
            <div class="admin-user-role">Administrator</div>
          </div>
        </div>
        <button class="admin-logout-btn" onclick="adminLogout()">
          🚪 Đăng xuất
        </button>
      </div>
    </aside>
  `;
}

// =============================================
//   STATUS HELPERS
// =============================================
const STATUS_LABELS = {
  pending:   { label: 'Chờ xử lý',    cls: 'status-pending'   },
  confirmed: { label: 'Đã xác nhận',  cls: 'status-confirmed' },
  shipping:  { label: 'Đang giao',    cls: 'status-shipping'  },
  done:      { label: 'Hoàn thành',   cls: 'status-done'      },
  cancelled: { label: 'Đã hủy',       cls: 'status-cancelled' },
};

function statusBadge(status) {
  const s = STATUS_LABELS[status] || { label: status, cls: '' };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}

// =============================================
//   PRODUCT FORM
// =============================================
let editingProductId = null;

function openProductModal(productId = null) {
  editingProductId = productId;
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const form = document.getElementById('product-form');
  form.reset();

  if (productId) {
    const p = Store.getProduct(productId);
    if (!p) return;
    document.getElementById('pf-name').value      = p.name || '';
    document.getElementById('pf-category').value  = p.category || '';
    document.getElementById('pf-brand').value     = p.brand || '';
    document.getElementById('pf-price').value     = p.price || '';
    document.getElementById('pf-original').value  = p.originalPrice || '';
    document.getElementById('pf-stock').value     = p.stock || 0;
    document.getElementById('pf-icon').value      = p.images?.[0] || '📦';
    document.getElementById('pf-description').value = p.description || '';
    document.getElementById('pf-specs').value     = JSON.stringify(p.specs || {}, null, 2);
    document.getElementById('pf-active').checked  = p.active !== false;
    document.getElementById('pf-featured').checked = p.featured === true;
    document.querySelector('#product-modal .modal-title').textContent = 'Chỉnh sửa sản phẩm';
  } else {
    document.getElementById('pf-icon').value = '📦';
    document.getElementById('pf-active').checked = true;
    document.querySelector('#product-modal .modal-title').textContent = 'Thêm sản phẩm mới';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  editingProductId = null;
}

function saveProduct() {
  const name = document.getElementById('pf-name')?.value.trim();
  const price = parseFloat(document.getElementById('pf-price')?.value);

  if (!name) { UI.toast('Vui lòng nhập tên sản phẩm', 'error'); return; }
  if (!price || price <= 0) { UI.toast('Vui lòng nhập giá hợp lệ', 'error'); return; }

  let specs = {};
  try {
    const specsStr = document.getElementById('pf-specs')?.value.trim();
    if (specsStr) specs = JSON.parse(specsStr);
  } catch {
    UI.toast('Thông số kỹ thuật không đúng định dạng JSON', 'error');
    return;
  }

  const data = {
    name,
    category:      document.getElementById('pf-category')?.value || '',
    brand:         document.getElementById('pf-brand')?.value.trim() || '',
    price,
    originalPrice: parseFloat(document.getElementById('pf-original')?.value) || 0,
    stock:         parseInt(document.getElementById('pf-stock')?.value) || 0,
    images:        [document.getElementById('pf-icon')?.value.trim() || '📦'],
    description:   document.getElementById('pf-description')?.value.trim() || '',
    specs,
    active:        document.getElementById('pf-active')?.checked ?? true,
    featured:      document.getElementById('pf-featured')?.checked ?? false,
  };

  if (editingProductId) {
    Store.updateProduct(editingProductId, data);
    UI.toast('Đã cập nhật sản phẩm!', 'success');
  } else {
    Store.addProduct({ ...data, id: UI.genId('prod'), createdAt: new Date().toISOString() });
    UI.toast('Đã thêm sản phẩm mới!', 'success');
  }

  closeProductModal();
  if (typeof loadProducts === 'function') loadProducts();
}

function deleteProduct(productId) {
  const product = Store.getProduct(productId);
  if (!product) return;
  if (!confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) return;
  Store.deleteProduct(productId);
  UI.toast('Đã xóa sản phẩm!', 'success');
  if (typeof loadProducts === 'function') loadProducts();
}

function toggleProductActive(productId) {
  const product = Store.getProduct(productId);
  if (!product) return;
  Store.updateProduct(productId, { active: !product.active });
  UI.toast(product.active ? 'Đã ẩn sản phẩm' : 'Đã hiện sản phẩm', 'success');
  if (typeof loadProducts === 'function') loadProducts();
}

// =============================================
//   ORDERS
// =============================================
function updateOrderStatus(orderId, newStatus) {
  Store.updateOrderStatus(orderId, newStatus);
  UI.toast(`Đã cập nhật trạng thái đơn hàng thành "${STATUS_LABELS[newStatus]?.label || newStatus}"`, 'success');
  if (typeof loadOrders === 'function') loadOrders();
}

// =============================================
//   BOOKINGS
// =============================================
const AdminBookings = {
  get() {
    try {
      const raw = localStorage.getItem('mm_bookings');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  },

  updateStatus(id, status) {
    const bookings = this.get().map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem('mm_bookings', JSON.stringify(bookings));
  },
};

// =============================================
//   DASHBOARD STATS
// =============================================
function getDashboardStats() {
  const products = Store.getProducts();
  const orders   = Store.getOrders();

  const totalRevenue = orders
    .filter(o => o.status === 'done')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingCount  = orders.filter(o => o.status === 'pending').length;
  const lowStock      = products.filter(p => p.active && p.stock < 5);
  const recentOrders  = orders.slice(0, 10);

  return {
    totalProducts: products.filter(p => p.active).length,
    totalOrders: orders.length,
    pendingOrders: pendingCount,
    totalRevenue,
    lowStock,
    recentOrders,
  };
}

// =============================================
//   PRODUCT MODAL HTML
// =============================================
function getProductModalHTML() {
  const categories = [
    'Camera', 'Mạng & Viễn thông', 'IT & Máy chủ', 'Máy in & Thiết bị', 'Văn phòng phẩm',
  ];

  return `
    <div class="modal-overlay" id="product-modal" onclick="handleModalOverlayClick(event)">
      <div class="modal" style="max-width:640px;">
        <div class="modal-header">
          <h2 class="modal-title">Thêm sản phẩm mới</h2>
          <button class="modal-close" onclick="closeProductModal()">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;">
          <form id="product-form" onsubmit="event.preventDefault(); saveProduct();">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tên sản phẩm *</label>
                <input type="text" id="pf-name" class="form-control" placeholder="Nhập tên sản phẩm..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Thương hiệu</label>
                <input type="text" id="pf-brand" class="form-control" placeholder="TP-Link, Dell, ASUS...">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Danh mục</label>
              <select id="pf-category" class="form-control">
                ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Giá bán (VNĐ) *</label>
                <input type="number" id="pf-price" class="form-control" placeholder="0" min="0" required>
              </div>
              <div class="form-group">
                <label class="form-label">Giá gốc (VNĐ)</label>
                <input type="number" id="pf-original" class="form-control" placeholder="0 (để trống nếu không giảm giá)" min="0">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tồn kho</label>
                <input type="number" id="pf-stock" class="form-control" value="0" min="0">
              </div>
              <div class="form-group">
                <label class="form-label">Icon / Emoji đại diện</label>
                <input type="text" id="pf-icon" class="form-control" placeholder="📦" value="📦">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Mô tả sản phẩm</label>
              <textarea id="pf-description" class="form-control" rows="3" placeholder="Mô tả ngắn về sản phẩm..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Thông số kỹ thuật (JSON)</label>
              <textarea id="pf-specs" class="form-control" rows="4" placeholder='{"RAM": "8GB", "CPU": "Intel Core i5", "SSD": "512GB"}'></textarea>
              <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Nhập dạng {"Tên thông số": "Giá trị"}</p>
            </div>
            <div style="display:flex;gap:24px;align-items:center;margin-top:8px;">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-secondary);">
                <input type="checkbox" id="pf-active" checked style="accent-color:var(--gold);width:16px;height:16px;">
                Hiển thị (Active)
              </label>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-secondary);">
                <input type="checkbox" id="pf-featured" style="accent-color:var(--gold);width:16px;height:16px;">
                Sản phẩm nổi bật
              </label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeProductModal()">Hủy</button>
          <button class="btn btn-primary" onclick="saveProduct()">💾 Lưu sản phẩm</button>
        </div>
      </div>
    </div>
  `;
}

function handleModalOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeProductModal();
  }
}

// Keyboard shortcut: Escape to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});
