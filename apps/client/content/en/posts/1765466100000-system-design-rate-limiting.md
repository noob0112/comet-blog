---
status: 'Idea'
createdBy: 'Black Comet'
createdAt: 'May 5, 2025 4:00 AM'
locale: 'en'
slug: 'system-design-rate-limiting-1765466100000'
readMin: 10
updatedAt: 'December 11, 2025 10:11 PM'
publishedAt: '2025-12-11T02:00:00.000'
---

# Giới thiệu về Rate Limiting

**Rate Limiting** là một chiến lược quan trọng trong thiết kế hệ thống, dùng để kiểm soát lượng truy cập (traffic) gửi đến hoặc gửi đi từ một mạng lưới. Nó giới hạn số lần một hành động có thể được thực hiện trong một khoảng thời gian nhất định (ví dụ: 100 requests/phút).

---

## 1. Tại sao cần Rate Limiting?

Việc áp dụng Rate Limiting giúp giải quyết các vấn đề sau:

1. **Ngăn chặn tấn công DoS/DDoS:** Hạn chế việc kẻ tấn công làm tràn ngập hệ thống bằng hàng loạt request rác.
2. **Quản lý tài nguyên (Resource Starvation):** Đảm bảo server không bị quá tải, giữ cho tài nguyên (CPU, Memory, DB connection) luôn ở mức an toàn.
3. **Chi phí (Cost Management):** Giới hạn việc gọi các API bên thứ 3 (third-party APIs) có tính phí theo lượt gọi.
4. **Tính công bằng (Fairness):** Ngăn chặn một người dùng (hoặc bot) chiếm dụng toàn bộ tài nguyên, gây ảnh hưởng đến người dùng khác.

---

## 2. Vị trí đặt Rate Limiter

Rate Limiter có thể được triển khai ở nhiều vị trí trong kiến trúc hệ thống:

- **Client-side:** Không đáng tin cậy vì dễ bị giả mạo hoặc chỉnh sửa bởi người dùng.
- **Server-side:** Nằm trực tiếp trong mã nguồn ứng dụng (application code).
- **Middleware / API Gateway:** (Khuyên dùng) Nằm giữa Client và Server (ví dụ: Nginx, Kong, AWS API Gateway). Đây là vị trí lý tưởng để chặn request rác trước khi chúng chạm tới server xử lý logic.

---

## 3. Các thuật toán Rate Limiting phổ biến

Dưới đây là 5 thuật toán thường được sử dụng nhất:

### A. Token Bucket (Thùng chứa Token)

- **Cơ chế:** Có một "thùng" chứa tối đa `N` token. Token được thêm vào thùng với tốc độ không đổi (ví dụ: 10 token/giây). Mỗi request khi đến sẽ phải lấy 1 token để được đi qua. Nếu thùng rỗng, request bị từ chối.
- **Đặc điểm:** Cho phép **lưu lượng đột biến (burst)** ngắn hạn (miễn là còn token trong thùng).

### B. Leaky Bucket (Thùng rò rỉ)

- **Cơ chế:** Tương tự Token Bucket nhưng hoạt động như một hàng đợi (Queue - FIFO). Request đổ vào thùng, và được xử lý (rò rỉ ra) với một tốc độ cố định. Nếu thùng đầy, request mới bị tràn ra ngoài (bị hủy).
- **Đặc điểm:** Làm mượt lưu lượng (traffic smoothing), đảm bảo tốc độ xử lý đầu ra luôn **ổn định**, không có đột biến.

### C. Fixed Window Counter (Cửa sổ cố định)

- **Cơ chế:** Chia thời gian thành các cửa sổ cố định (ví dụ: 1 phút). Mỗi cửa sổ có một bộ đếm. Nếu bộ đếm vượt quá giới hạn, các request tiếp theo trong cửa sổ đó bị từ chối.
- **Đặc điểm:** Đơn giản, nhưng gặp vấn đề ở **ranh giới cửa sổ** (ví dụ: gửi 100 req ở giây 59 và 100 req ở giây 01 của phút tiếp theo => server nhận 200 req trong 2 giây).

### D. Sliding Window Log

- **Cơ chế:** Lưu lại dấu thời gian (timestamp) của mọi request. Khi có request mới, hệ thống xóa các timestamp cũ quá hạn và đếm số lượng timestamp còn lại trong khoảng thời gian quy định.
- **Đặc điểm:** Rất chính xác, nhưng tốn nhiều bộ nhớ để lưu timestamp.

### E. Sliding Window Counter (Cửa sổ trượt kết hợp)

- **Cơ chế:** Kết hợp ưu điểm của Fixed Window và Sliding Log. Nó tính toán số lượng request dựa trên tỉ lệ trọng số của cửa sổ trước và cửa sổ hiện tại.
- **Đặc điểm:** Cân bằng tốt giữa hiệu năng và độ chính xác.

---

## 4. Bảng Tóm tắt & So sánh

| Thuật toán | Ưu điểm | Nhược điểm | Phù hợp cho |
| --- | --- | --- | --- |
| **Token Bucket** | Dễ cài đặt, bộ nhớ thấp. Cho phép traffic đột biến (burst). | Khó tinh chỉnh tham số (kích thước thùng, tốc độ nạp). | Amazon, Stripe (API công cộng cho phép burst nhẹ). |
| **Leaky Bucket** | Output cực kỳ ổn định, bảo vệ DB/Server khỏi quá tải đột ngột. | Không xử lý hiệu quả traffic đột biến (request bị drop nếu queue đầy). | Shopify (e-commerce cần xử lý đơn hàng ổn định). |
| **Fixed Window** | Dễ cài đặt, tốn ít RAM nhất. | **Vấn đề biên (Edge case):** Có thể nhận gấp đôi lượng traffic tại thời điểm giao nhau giữa 2 cửa sổ. | Ứng dụng nội bộ đơn giản, không quá khắt khe. |
| **Sliding Window Log** | Độ chính xác tuyệt đối. Giải quyết được vấn đề biên. | Tốn nhiều bộ nhớ để lưu Log. Tốc độ chậm nếu log quá lớn. | Hệ thống nhỏ, yêu cầu độ chính xác cao tuyệt đối. |
| **Sliding Window Counter** | Chính xác hơn Fixed Window, nhẹ hơn Sliding Log. | Phức tạp hơn để cài đặt. Là một phép tính gần đúng (không chính xác 100% như Log). | **Được sử dụng rộng rãi nhất** (Cloudflare, Rate limiters hiện đại). |

---

## 5. Kết luận

Khi thiết kế Rate Limiter, bạn cần cân nhắc:

1. **Vị trí:** Nên đặt ở API Gateway hay Application?
2. **Lưu trữ:** Dùng Redis (In-memory) là phổ biến nhất để đếm request nhanh chóng.
3. **Phản hồi:** Khi chặn request, nên trả về HTTP Status Code `429 Too Many Requests` và kèm theo Header `Retry-After` để báo cho client biết khi nào được thử lại.
