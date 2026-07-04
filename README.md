# TuongCMS Solution

Du an gom 3 tang dung theo cau truc:

- `CMS.Data`: entity, `ApplicationDbContext`, migration.
- `CMS.Backend`: ASP.NET Core MVC + Web API + Swagger + Cookie Authentication.
- `CMS.frontend`: ReactJS + Vite goi du lieu tu Web API.

## Yeu cau moi truong

- .NET SDK 8
- SQL Server LocalDB hoac SQL Server
- Node.js 20+

## Chay Backend

1. Mo solution `Lê Thanh Tường_2123110128.sln` hoac `TuongCMS_Solution.slnx`.
2. Chinh lai connection string trong `CMS.Backend/appsettings.json` neu can.
3. Tao database:

```powershell
dotnet ef database update --project CMS.Data --startup-project CMS.Backend
```

4. Chay backend bang Visual Studio `F5` hoac:

```powershell
dotnet run --project CMS.Backend
```

## Chay Frontend

1. Tao file `CMS.frontend/.env`:

```env
VITE_API_URL=https://localhost:7083
```

2. Cai package va chay:

```powershell
cd CMS.frontend
npm install
npm run dev
```

## Tai khoan admin mau

- `admin / 123456`
- `editor / 123456`
- `user / 123456`

## Tai lieu bo sung

- `docs/Bao-cao-do-an.md`
- `docs/API-Samples.md`

