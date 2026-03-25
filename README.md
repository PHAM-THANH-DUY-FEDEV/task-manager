# Task Manager SPA - ReactJS

Một ứng dụng quản lý công việc (Single Page Application) hiện đại, tập trung vào trải nghiệm người dùng mượt mà trên cả máy tính và thiết bị di động. Dự án sử dụng React Context API để quản lý trạng thái và Tailwind CSS cho giao diện đáp ứng (responsive).

## Tính năng chính

- Quản lý Task toàn diện: Thêm mới, xem chi tiết, và xóa công việc một cách nhanh chóng.
- Thống kê trực quan: Thanh tiến độ (Progress Bar) tự động cập nhật số lượng lệ các công việc theo trạng thái: Vừa tạo, Đang làm, và Hoàn thành.
- Tìm kiếm & Bộ lọc: Hệ thống lọc theo trạng thái và tìm kiếm theo tiêu đề giúp tối ưu hóa việc quản lý.
- Giao diện Responsive: Tối ưu hóa hoàn toàn cho Mobile với layout dạng cột và Desktop với layout dàn hàng ngang.
- Chỉnh sửa: Xem và chỉnh sửa ngay trong giao diện Popup (Popup hiện thị thông tin).
- Cảnh báo Deadline: Tự động nhận diện các công việc sắp đến hạn hoặc quá hạn.

## Công nghệ sử dụng

- Frontend: ReactJS
- Style: Tailwind CSS
- Icons: Lucied React
- Storage: LocalStorage (lưu dữ liệu ngay trên trình duyệt)

## Hướng dẫn cài đặt

Mở terminal và chạy các lệnh sau

### 1. clone dự án

```bash
git clone [https://github.com/PHAM-THANH-DUY-FEDEV/task-manager.git](https://github.com/PHAM-THANH-DUY-FEDEV/task-manager.git)
cd task-manager
```

### 2. Cài đặt thư viện và chạy dự án

```bash
npm install
npm run dev
```

## Các quyết định kỹ thuật trong dự án

### 1. Quản lý state với Context API

Chọn sử dụng Context API để dữ liệu Task được đồng bộ xuyên suốt từ Dashboard, Filter cho đến Statis một cách nhẹ nhàng và tạo cảm giác liền mạch.

### 2. Cơ chế Reponsive

Hạn chế sử dụng những chỉ số fix cứng để tránh ảnh hưởng đến layout trên các thiết bị mobile hay desktop

### 3. Thiết kế dạng các task dạng Sticky Notes

Thay vì sử dụng dạng danh sách hàng ngang (rows) truyền thống như các ứng dụng Todo list thông thường, lựa chọn thiết kế dạng các thẻ ghi chú (Sticky Notes). Tương tự như khi chúng ta dán một giấy note lên bảng ở đời thực tạo cảm giác thân thuộc, gẫn gũi và không bị rối hay nhầm lẫn với các hàng.

### 4. Chỉnh sửa thông tin tức thì

Rút gọn thao tác chỉnh sửa và lưu thông thường là Mở Modal -> Nhấn Sửa -> Nhập liệu -> Nhấn Lưu thành cơ chế cập nhật trực tiếp. Người dùng có thể chỉnh sửa Tiêu đề hoặc Nội dung ngay trên giao diện hiện tại. Mọi thay đổi về phím gõ đều được phản hồi tức thì vào State của ứng dụng sau đó lưu vào local, lược bỏ được các thao tác không cần thiết.

## Những điểm cần cải thiện

### 1. Áp dụng kỹ thuật Debouncing

đợi người dùng ngừng gõ một khoảng thời gian ngắn rồi mới gửi yêu cầu lưu để tránh quá tải Server nếu kết nối với Backend trong tương lai

### 2. Thêm các tính năng mới

- Gắn link.
- Gắn ảnh.
- Link đến các task con.
- Hộp chỉnh sửa văn bản (in đậm, màu sắc, font, kích thước...).
- Tích hợp calendar dựa vào dealine.

### 3. Tối ưu UI/UX
