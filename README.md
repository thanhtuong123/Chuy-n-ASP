# Buổi 5: Đăng nhập và phân quyền

**Sinh viên:** Lê Thanh Tường  
**MSSV:** 2123110128  
**Môn học:** Chuyên đề ASP.NET  
**Project:** CMS ASP.NET Core MVC

---

## 1. Mục tiêu

Buổi 5 tập trung xây dựng chức năng đăng nhập, đăng xuất và phân quyền người dùng trong hệ thống CMS bằng Cookie Authentication.

---

## 2. Nội dung đã thực hiện

- Cấu hình Cookie Authentication trong `Program.cs`.
- Tạo `AccountController` để xử lý đăng nhập và đăng xuất.
- Tạo giao diện đăng nhập cho Admin.
- Kiểm tra tài khoản người dùng trong database.
- Lưu thông tin đăng nhập bằng Claims.
- Phân quyền truy cập bằng `[Authorize]`.
- Yêu cầu đăng nhập khi truy cập trang quản lý danh mục.
- Yêu cầu đăng nhập khi truy cập trang quản lý bài viết.
- Phân quyền Admin cho trang quản lý thành viên.
- Thêm chức năng đăng xuất.
- Thêm liên kết Logout vào giao diện Admin.

---

## 3. Các file chính

```text
CMS.Backend/Controllers/AccountController.cs
CMS.Backend/Views/Account/Login.cshtml
CMS.Backend/Program.cs
CMS.Backend/Controllers/CategoryController.cs
CMS.Backend/Controllers/PostController.cs
CMS.Backend/Controllers/UserController.cs
CMS.Backend/Views/Shared/_LayoutAdmin.cshtml
CMS.Data/Entities/User.cs
```

---

## 4. Kết quả đạt được

Sau buổi 5, hệ thống có chức năng đăng nhập và phân quyền. Người dùng phải đăng nhập để truy cập trang quản trị. Chỉ tài khoản có quyền Admin mới được truy cập chức năng quản lý thành viên.
