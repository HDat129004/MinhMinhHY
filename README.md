# Hướng Dẫn Sử Dụng & Vận Hành — Website Minh Minh Hưng Yên

Chào mừng bạn đến với tài liệu hướng dẫn sử dụng hệ thống website giới thiệu sản phẩm, dịch vụ và quản lý bán hàng của **Công ty TNHH Minh Minh Hưng Yên**. 

Hệ thống được phát triển thuần bằng **HTML5, CSS3 (Vanilla), JavaScript (ES6)** và chạy hoàn chỉnh dưới máy khách (Client-side) sử dụng **LocalStorage** làm cơ sở dữ liệu. Thiết kế website đạt chuẩn Responsive (tự động tối ưu hiển thị trên Máy tính và Điện thoại), tích hợp **PWA (Progressive Web App)** giúp cài đặt trực tiếp lên màn hình điện thoại như ứng dụng chính thức.

---

## 📂 Cấu trúc dự án
```
Minh Minh Web/
├── index.html            # Trang chủ chính (Landing Page gốc tích hợp sản phẩm động)
├── products.html         # Trang danh sách sản phẩm (Bao gồm tìm kiếm, lọc danh mục, giá, thương hiệu)
├── product.html          # Trang chi tiết sản phẩm (Mô tả, cấu hình kĩ thuật, sản phẩm liên quan)
├── cart.html             # Giỏ hàng & Điền thông tin đặt hàng (Tích hợp auto-copy & chat Zalo xác nhận)
├── booking.html          # Đặt lịch hẹn khảo sát/tư vấn (Tích hợp auto-copy & chat Zalo xác nhận)
├── contact.html          # Trang liên hệ trực tiếp, vị trí Google Maps & gửi lời nhắn
├── survey.html           # Trang khảo sát ý kiến khách hàng (Thiết kế gốc)
├── compare.html          # TRANG SO SÁNH: So sánh tối đa 3 sản phẩm side-by-side
├── sw.js                 # Service Worker xử lý Cache ngoại tuyến (Offline Caching)
├── manifest.json         # Tệp cấu hình ứng dụng PWA (Tên, màu sắc, biểu tượng tải)
├── assets/
│   └── images/           # Thư mục chứa các hình ảnh tĩnh, logo MM (logo-192, logo-512)
├── css/
│   ├── main.css          # Design System và CSS dùng chung cho giao diện khách hàng (Light Theme)
│   └── admin.css         # CSS định dạng riêng cho trang quản trị Admin
├── js/
│   ├── app.js            # Logic giỏ hàng, nạp sản phẩm mẫu, render navbar/footer động, so sánh sản phẩm
│   └── admin.js          # Logic quản lý sản phẩm (CRUD), đơn hàng, và danh sách đặt lịch
└── admin/
    ├── login.html        # Trang đăng nhập quản trị (Tài khoản: admin / mật khẩu: minhminh2024)
    ├── dashboard.html    # Bảng điều khiển tổng quan thống kê doanh thu & đơn hàng
    ├── products.html     # Trang quản lý danh sách sản phẩm (Thêm/Sửa/Xóa)
    ├── orders.html       # Trang quản lý đơn đặt hàng từ giỏ hàng
    └── bookings.html     # Trang quản lý lịch hẹn tư vấn/khảo sát
```

---

## 🌟 Các tính năng nổi bật (Giai đoạn 3 — Nâng cao)

### 1. Công cụ So sánh sản phẩm (compare.html)
- Khách hàng có thể tích chọn nút **"So sánh"** ngay trên các thẻ sản phẩm tại Trang chủ hoặc Trang danh sách sản phẩm.
- Hệ thống hỗ trợ so sánh tối đa **3 sản phẩm** cùng lúc.
- Khi nhấn **"So sánh ngay"**, người dùng sẽ được chuyển tới trang [compare.html](compare.html) hiển thị một bảng so sánh trực quan, hiển thị các thông tin: *Ảnh, tên, giá bán, thương hiệu, danh mục* cùng tất cả các thuộc tính kỹ thuật động (như *Độ phân giải, CPU, RAM, Ổ cứng...*) được sắp xếp song song side-by-side.

### 2. Xác nhận đơn hàng & lịch hẹn qua Zalo
Do hệ thống chạy hoàn toàn ở phía Client (không cần server backend phức tạp), chúng tôi đã phát triển tính năng chuyển đổi đơn hàng sang tin nhắn **Zalo** cực kì thuận tiện cho người dùng Việt Nam:
- **Đặt hàng:** Sau khi điền form thanh toán COD thành công, hệ thống hiển thị popup kèm nút **"Xác nhận đơn qua Zalo"**. Khi nhấn nút này, trình duyệt sẽ tự động sao chép toàn bộ thông tin đơn hàng (Mã đơn, Tên khách hàng, SĐT, Địa chỉ, sản phẩm đã mua, tổng tiền) vào clipboard của khách hàng và mở Zalo Chat kết nối thẳng tới số Hotline **0939191060** của bạn. Khách hàng chỉ cần nhấn **Dán (Ctrl + V)** và gửi là xong.
- **Đặt lịch tư vấn:** Tương tự, thông tin đặt lịch hẹn (Họ tên, SĐT, Dịch vụ muốn tư vấn, Ngày hẹn, Giờ hẹn) sẽ được tự động sao chép để khách hàng dán trực tiếp gửi qua Zalo cho cửa hàng.

### 3. Bộ lọc thương hiệu động (Brand Filter)
- Bộ lọc trong trang danh sách sản phẩm tự động quét dữ liệu sản phẩm mẫu và sản phẩm bạn đăng trong trang admin để tạo ra danh sách thương hiệu chọn lọc tương ứng (như *Dell, Canon, Hikvision...*).
- Khách hàng có thể lọc kết hợp cùng lúc: từ khóa tìm kiếm + danh mục + khoảng giá + thương hiệu.

### 4. Cài đặt ứng dụng di động (PWA)
- Nhờ có cấu hình `manifest.json` và Service Worker `sw.js` đăng ký trong `js/app.js`, khi truy cập trang web bằng Google Chrome/Edge (trên máy tính) hoặc Safari/Chrome (trên điện thoại), người dùng sẽ thấy tuỳ chọn **"Thêm vào màn hình chính" / "Install App"**.
- Sau khi cài đặt, website sẽ hoạt động độc lập dưới dạng một app di động có logo biểu tượng `MM` riêng, không có thanh địa chỉ trình duyệt, và nạp dữ liệu cực kì nhanh chóng nhờ lưu bộ nhớ đệm (offline cache).

---

## 🔑 Hướng dẫn sử dụng trang Quản trị (Admin Panel)

1. **Đường dẫn đăng nhập:** Truy cập [admin/login.html](admin/login.html) trên trình duyệt.
2. **Thông tin đăng nhập:**
   - **Tài khoản (Username):** `admin`
   - **Mật khẩu (Password):** `minhminh2024`
3. **Các phân hệ chính:**
   - **Dashboard (dashboard.html):** Xem thống kê tổng doanh thu từ các đơn hàng hoàn thành, tổng số đơn đặt, tổng số sản phẩm trong kho, đơn hàng mới đặt và các sản phẩm sắp hết hàng (tồn kho dưới 5).
   - **Quản lý sản phẩm (products.html):**
     - Bấm **"Thêm sản phẩm"** để mở form nhập thông tin: Tên sản phẩm, Thương hiệu, Giá bán, Mô tả, Tồn kho, và thuộc tính kĩ thuật dạng chữ (Ví dụ: `CPU: Core i5, RAM: 8GB`). Do không dùng server lưu file, bạn hãy nhập các kí tự **Emoji** (như 📷, 💻, 🖨️) vào trường biểu tượng để thay thế ảnh sản phẩm một cách trực quan nhất.
     - Cho phép chỉnh sửa thông tin hoặc xóa sản phẩm (hệ thống sẽ hỏi xác nhận trước khi xóa).
   - **Quản lý đơn hàng (orders.html):** Theo dõi toàn bộ đơn hàng khách đặt. Người quản trị có thể nhấp vào từng hàng để xem chi tiết sản phẩm khách mua và địa chỉ nhận. Có menu thả xuống để cập nhật trạng thái đơn: *Chờ xử lý, Đã xác nhận, Đang giao, Hoàn thành, Đã hủy*.
   - **Quản lý lịch hẹn (bookings.html):** Hiển thị danh sách khách đặt lịch tư vấn, hỗ trợ lọc theo ngày hẹn hoặc loại dịch vụ, đổi trạng thái cuộc hẹn.

---

## 🚀 Hướng dẫn vận hành & Triển khai (Hosting)

### 1. Chạy thử nghiệm cục bộ (Local)
Vì đây là website tĩnh thuần túy, bạn chỉ cần tải thư mục dự án về máy tính và:
- **Cách đơn giản nhất:** Click đúp chuột trực tiếp vào file [index.html](index.html) hoặc bất kì file nào để mở trên trình duyệt web.
- **Cách khuyến nghị (để hoạt động đầy đủ tính năng PWA):** Chạy một local web server nhỏ:
  - Nếu đã cài Node.js: Mở terminal tại thư mục dự án và chạy `npx live-server` hoặc `npx http-server .`
  - Nếu đã cài Python: Chạy lệnh `python -m http.server 8000` rồi truy cập địa chỉ `http://localhost:8000`.

### 2. Đưa lên Internet (Hosting miễn phí)
Bạn có thể đưa toàn bộ mã nguồn này lên các dịch vụ hosting tĩnh hoàn toàn miễn phí và bảo mật cao:
- **GitHub Pages:** Do mã nguồn đã được tải lên Github, bạn chỉ cần truy cập vào mục **Settings > Pages** của repository `MinhMinhHY`, tại mục *Build and deployment*, chọn nhánh `main` và thư mục `/ (root)` rồi bấm **Save**. Chờ 1-2 phút, GitHub sẽ cấp cho bạn một đường dẫn dạng `https://HDat129004.github.io/MinhMinhHY/` hoạt động trực tiếp.
- **Vercel / Netlify:** Kết nối tài khoản với GitHub của bạn, chọn repo `MinhMinhHY` và nhấn Deploy. Hệ thống sẽ tự động cấp tên miền miễn phí và cập nhật trang web mỗi khi bạn cập nhật code trên GitHub.
