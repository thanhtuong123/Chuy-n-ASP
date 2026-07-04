# API Samples

## GET `/api/CategoryProductsApi`

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "May tinh xach tay"
  }
]
```

## GET `/api/ProductsApi`

```json
[
  {
    "id": 1,
    "name": "Laptop hoc lap trinh",
    "description": "Laptop cau hinh co ban",
    "price": 15000000,
    "stockQuantity": 10,
    "imageUrl": "/uploads/products/demo.jpg",
    "categoryProductId": 1
  }
]
```

## GET `/api/PostsApi`

```json
[
  {
    "id": 1,
    "title": "Lo trinh hoc ASP.NET Core",
    "content": "<p>Noi dung bai viet</p>",
    "createdDate": "2026-01-01T08:00:00",
    "categoryId": 1
  }
]
```

## POST `/api/OrdersApi`

```json
{
  "fullName": "Le Thanh Tuong",
  "phone": "0900123456",
  "address": "Thu Duc, TP HCM",
  "email": "tuong@example.com",
  "note": "Giao gio hanh chinh",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```
