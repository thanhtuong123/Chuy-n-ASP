# Buổi 3: LINQ và CRUD dữ liệu

**Sinh viên:** Lê Thanh Tường  
**MSSV:** 2123110128  
**Môn học:** Chuyên đề ASP.NET  
**Project:** CMS ASP.NET Core MVC

---

## 1. Mục tiêu

Buổi 3 tập trung xây dựng các chức năng quản lý dữ liệu cơ bản cho hệ thống CMS bằng ASP.NET Core MVC, Entity Framework Core và LINQ.

---

## 2. Nội dung đã thực hiện

- Xây dựng chức năng hiển thị danh sách danh mục.
- Xây dựng chức năng thêm danh mục mới.
- Xây dựng chức năng sửa thông tin danh mục.
- Xây dựng chức năng xóa danh mục.
- Xây dựng chức năng hiển thị danh sách bài viết.
- Hiển thị bài viết kèm thông tin danh mục.
- Xem chi tiết bài viết.
- Sử dụng LINQ để truy vấn dữ liệu từ database.
- Sắp xếp bài viết theo ngày tạo mới nhất.
- Lọc bài viết theo danh mục.

---

## 3. Các file chính

```text
CMS.Backend/Controllers/CategoryController.cs
CMS.Backend/Controllers/PostController.cs
CMS.Backend/Controllers/HomeController.cs
CMS.Backend/Views/Category/
CMS.Backend/Views/Post/
CMS.Backend/Views/Home/Index.cshtml
CMS.Data/ApplicationDbContext.cs
CMS.Data/Entities/
```

---

## 4. Kết quả đạt được

Sau buổi 3, hệ thống có thể quản lý danh mục và bài viết cơ bản. Người dùng có thể thêm, sửa, xóa, xem danh sách và xem chi tiết dữ liệu trong hệ thống CMS.
