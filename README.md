# Buổi 4: Giao diện Admin và Upload ảnh

**Sinh viên:** Lê Thanh Tường  
**MSSV:** 2123110128  
**Môn học:** Chuyên đề ASP.NET  
**Project:** CMS ASP.NET Core MVC

---

## 1. Mục tiêu

Buổi 4 tập trung xây dựng giao diện quản trị cho hệ thống CMS và bổ sung chức năng upload ảnh cho bài viết.

---

## 2. Nội dung đã thực hiện

- Tạo giao diện quản trị riêng cho Admin.
- Xây dựng file layout dùng chung cho trang quản trị.
- Thiết kế sidebar quản lý các chức năng:
  - Bảng điều khiển.
  - Quản lý danh mục.
  - Quản lý bài viết.
  - Quản lý thành viên.
- Áp dụng layout admin cho các trang quản lý danh mục.
- Áp dụng layout admin cho các trang quản lý bài viết.
- Cập nhật giao diện danh sách danh mục.
- Cập nhật giao diện danh sách bài viết.
- Bổ sung chức năng upload ảnh khi tạo bài viết.
- Bổ sung chức năng upload ảnh khi sửa bài viết.
- Lưu ảnh vào thư mục `wwwroot/uploads`.
- Hiển thị ảnh bài viết trên giao diện.

---

## 3. Các file chính

```text
CMS.Backend/Views/Shared/_LayoutAdmin.cshtml
CMS.Backend/Controllers/CategoryController.cs
CMS.Backend/Controllers/PostController.cs
CMS.Backend/Views/Category/
CMS.Backend/Views/Post/
CMS.Backend/wwwroot/
```

---

## 4. Kết quả đạt được

Sau buổi 4, hệ thống có giao diện quản trị rõ ràng hơn. Người dùng có thể quản lý danh mục, quản lý bài viết và upload ảnh cho bài viết.
