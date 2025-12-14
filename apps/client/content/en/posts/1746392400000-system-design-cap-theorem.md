---
status: 'Idea'
createdBy: 'Black Comet'
createdAt: 'May 5, 2025 4:00 AM'
locale: 'en'
slug: '1746392400000-system-design-cap-theorem'
readMin: 10
updatedAt: 'December 11, 2025 10:11 PM'
publishedAt: '2025-12-11T00:00:00.000'
---

# Giới thiệu về Định lý CAP (CAP Theorem)

Định lý CAP (còn gọi là Định lý Brewer) là một nguyên lý cơ bản trong thiết kế hệ thống phân tán. Định lý này phát biểu rằng một hệ thống máy tính phân tán không thể đồng thời đảm bảo cả ba thuộc tính sau:

1. **Consistency (Tính nhất quán)**
2. **Availability (Tính sẵn sàng)**
3. **Partition Tolerance (Khả năng chịu lỗi phân vùng)**

Bạn chỉ có thể chọn **hai trong ba** thuộc tính này tại một thời điểm.

---

## 1. Các thành phần của CAP

### **C - Consistency (Tính nhất quán)**

- **Định nghĩa:** Mọi lần đọc dữ liệu (read) đều trả về dữ liệu mới nhất được ghi (write) hoặc trả về lỗi.
- **Ý nghĩa:** Tất cả các node trong hệ thống đều nhìn thấy cùng một dữ liệu tại cùng một thời điểm. Nếu bạn ghi dữ liệu vào Node A, ngay lập tức Node B cũng phải có dữ liệu đó.

### **A - Availability (Tính sẵn sàng)**

- **Định nghĩa:** Mọi yêu cầu (request) gửi tới một node đang hoạt động đều nhận được phản hồi (response), nhưng không đảm bảo phản hồi đó chứa dữ liệu mới nhất.
- **Ý nghĩa:** Hệ thống luôn hoạt động và phản hồi người dùng, ngay cả khi một số node gặp sự cố.

### **P - Partition Tolerance (Khả năng chịu lỗi phân vùng)**

- **Định nghĩa:** Hệ thống vẫn tiếp tục hoạt động dù cho có sự cố về đường truyền mạng làm mất kết nối giữa các node (network partition).
- **Ý nghĩa:** Trong môi trường phân tán thực tế, lỗi mạng là điều không thể tránh khỏi. Do đó, **P** thường là thuộc tính bắt buộc phải có, và chúng ta phải đánh đổi giữa **C** và **A**.

---

## 2. **Sự đánh đổi** (Trade-offs)

Vì Partition Tolerance (P) là thực tế bắt buộc trong hệ thống phân tán (mạng có thể bị đứt), chúng ta thường phải chọn giữa:

### **Chiến lược CP (Consistency + Partition Tolerance)**

- **Ưu tiên:** Dữ liệu luôn đúng.
- **Đánh đổi:** Nếu xảy ra lỗi mạng (partition), hệ thống sẽ chặn các yêu cầu đọc/ghi hoặc trả về lỗi cho đến khi dữ liệu được đồng bộ hóa, chấp nhận hy sinh tính sẵn sàng (Availability).
- **Ứng dụng:** Hệ thống ngân hàng, giao dịch tài chính (nơi sai lệch số dư là không thể chấp nhận).
- **Ví dụ:** MongoDB (mặc định), HBase, Redis.

### **Chiến lược AP (Availability + Partition Tolerance)**

- **Ưu tiên:** Hệ thống luôn trả lời.
- **Đánh đổi:** Nếu xảy ra lỗi mạng, hệ thống vẫn cho phép đọc/ghi ở các node riêng lẻ. Khi mạng kết nối lại, dữ liệu sẽ được đồng bộ sau. Người dùng có thể đọc phải dữ liệu cũ trong một khoảng thời gian ngắn (được gọi là *Eventual Consistency* - Tính nhất quán cuối cùng).
- **Ứng dụng:** Mạng xã hội (News feed), sàn thương mại điện tử (hiển thị số lượng hàng tồn kho).
- **Ví dụ:** Cassandra, Amazon DynamoDB, CouchDB.

### **Chiến lược CA (Consistency + Availability)**

- **Đặc điểm:** Chỉ tồn tại trên lý thuyết hoặc trong hệ thống không phân tán (Monolithic, Single Node). Vì nếu bỏ qua P (Partition Tolerance), tức là ta giả định mạng không bao giờ hỏng – điều này không thực tế trong hệ thống phân tán.
- **Ví dụ:** RDBMS truyền thống (MySQL, PostgreSQL) chạy trên một máy chủ duy nhất.

---

## 3. Bảng Tóm Tắt (Summary Table)

Dưới đây là bảng so sánh chi tiết giữa các chiến lược CAP:

| Chiến lược                                  | Đặc điểm chính                                                                  | Ưu điểm                                                                       | Nhược điểm                                                                     | Ví dụ điển hình                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| **CP** (Consistency + Partition Tolerance)  | Chấp nhận ngừng phục vụ hoặc chờ đợi để đảm bảo dữ liệu đồng nhất.              | Dữ liệu luôn chính xác tuyệt đối ở mọi node.                                  | Có thể bị timeout hoặc lỗi nếu mạng gặp sự cố. Độ trễ cao hơn do phải đồng bộ. | **Ngân hàng, Tài chính**, Redis, MongoDB, HBase.                            |
| **AP** (Availability + Partition Tolerance) | Chấp nhận trả về dữ liệu cũ (eventual consistency) để giữ hệ thống luôn online. | Hệ thống luôn phản hồi nhanh, trải nghiệm người dùng tốt, không bị gián đoạn. | Dữ liệu có thể không nhất quán tạm thời giữa các node.                         | **Mạng xã hội (News feed), TMĐT (Giỏ hàng)**, Cassandra, DynamoDB, CouchDB. |
| **CA** (Consistency + Availability)         | Đảm bảo toàn vẹn và sẵn sàng nhưng không chịu được lỗi mạng.                    | Dữ liệu đúng và luôn có phản hồi.                                             | Không thể mở rộng (scale) tốt. Hệ thống sập nếu mạng đứt.                      | **RDBMS truyền thống** (MySQL, PostgreSQL ở chế độ single node).            |

---

## 4. Kết luận

Không có "viên đạn bạc" (silver bullet) nào cho mọi bài toán. Việc lựa chọn giữa CP hay AP phụ thuộc hoàn toàn vào yêu cầu nghiệp vụ:

- Nếu bạn làm ứng dụng **chuyển tiền**, bạn cần **CP** (thà lỗi giao dịch còn hơn sai số dư).
- Nếu bạn làm ứng dụng **lướt Facebook**, bạn cần **AP** (thà xem tin cũ một chút còn hơn không load được trang).
