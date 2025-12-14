---
status: 'Idea'
createdBy: 'Black Comet'
createdAt: 'May 5, 2025 4:00 AM'
locale: 'en'
slug: 'system-design-consistent-hashing-20251211'
readMin: 10
updatedAt: 'December 11, 2025 10:11 PM'
publishedAt: '2025-12-11T01:00:00.000'
---

# Giới thiệu về Consistent Hashing

**Consistent Hashing** là một kỹ thuật phân tán dữ liệu giúp giảm thiểu việc phải di chuyển lại dữ liệu (rebalancing) khi thêm hoặc xóa các máy chủ (node) trong một hệ thống phân tán. Đây là thuật toán nền tảng cho nhiều hệ thống lưu trữ lớn như Amazon DynamoDB, Apache Cassandra, và các hệ thống Caching.

---

## 1. Vấn đề của Hashing truyền thống (Modulo Hashing)

Trong cách chia tải thông thường, chúng ta dùng công thức:
`server_index = hash(key) % N`
*(Trong đó N là số lượng máy chủ)*

* **Ưu điểm:** Đơn giản, phân phối đều.
* **Nhược điểm:** Khi **N thay đổi** (thêm hoặc bớt server), kết quả của phép tính `% N` sẽ thay đổi hoàn toàn đối với hầu hết các key.
  * **Hậu quả:** Gần như toàn bộ dữ liệu phải di chuyển sang server mới. Hệ thống cache sẽ bị "miss" hàng loạt (cache stampede), gây quá tải cho Database gốc.

---

## 2. Cách hoạt động của Consistent Hashing

Thay vì chia theo số lượng server, Consistent Hashing ánh xạ cả dữ liệu và server lên một **vòng tròn ảo (Hash Ring)** có giá trị từ $0$ đến $2^{32}-1$ (hoặc lớn hơn).

### Các bước thực hiện

1. **Dựng Hash Ring:** Tưởng tượng một vòng tròn khép kín của các giá trị băm.
2. **Đặt Server lên Ring:** Băm IP hoặc ID của server để đặt nó tại một vị trí trên vòng tròn.
3. **Đặt Key dữ liệu lên Ring:** Băm key của dữ liệu (ví dụ: `user_id`, `image_name`) để đặt nó lên vòng tròn.
4. **Gán Key cho Server:** Để biết key thuộc về server nào, ta đi theo chiều kim đồng hồ từ vị trí của Key. Server đầu tiên gặp phải sẽ là nơi chứa Key đó.

---

## 3. Ưu điểm vượt trội

### Khi thêm một Server mới (Scale Out)

* Chỉ các key nằm trong khoảng giữa server mới và server liền kề trước đó bị ảnh hưởng.
* **Ví dụ:** Thêm `Server C` vào giữa `Server A` và `Server B`. Chỉ một phần dữ liệu từ `Server B` sẽ được chuyển sang `Server C`. Các dữ liệu khác giữ nguyên.

### Khi xóa một Server (Scale In / Failure)

* Nếu `Server B` bị hỏng, các key đang thuộc về nó sẽ tự động được chuyển sang server kế tiếp theo chiều kim đồng hồ (ví dụ: `Server D`).
* Dữ liệu ở các server khác không bị ảnh hưởng.

---

## 4. Kỹ thuật Virtual Nodes (Node ảo)

Trong thực tế, việc phân bố các server vật lý có thể không đều trên vòng tròn, dẫn đến việc một server phải gánh quá nhiều dữ liệu (Data skew).

**Giải pháp:** Sử dụng **Virtual Nodes**.

* Một server vật lý (ví dụ: `Server A`) được băm nhiều lần với các tên khác nhau (`A1`, `A2`, `A3`...) để xuất hiện tại nhiều vị trí trên vòng tròn.
* **Lợi ích:** Giúp phân phối dữ liệu đều hơn và cân bằng tải tốt hơn giữa các server vật lý có cấu hình khác nhau.

---

## 5. Bảng so sánh Hashing thường vs. Consistent Hashing

| Đặc điểm | Hashing truyền thống (`% N`) | Consistent Hashing |
| :--- | :--- | :--- |
| **Phụ thuộc vào số lượng Node** | Rất cao. Thay đổi N làm đảo lộn tất cả. | Thấp. Không phụ thuộc trực tiếp vào N. |
| **Khi thêm/xóa Node** | Di chuyển gần như 100% dữ liệu. | Chỉ di chuyển khoảng `1/N` lượng dữ liệu. |
| **Khả năng mở rộng (Scalability)** | Kém. Gây gián đoạn hệ thống lớn. | Rất tốt. Mở rộng linh hoạt (Elastic). |
| **Ứng dụng** | Load balancing đơn giản, quy mô nhỏ cố định. | Distributed Cache, Distributed DB, CDN. |

---

## 6. Tổng kết

> **Consistent Hashing giải quyết bài toán "Rebalancing" trong hệ thống phân tán.**

Nó đảm bảo rằng khi cấu trúc mạng thay đổi, sự xáo trộn dữ liệu là **tối thiểu**, giúp hệ thống ổn định và dễ dàng mở rộng.
