---
title: "Sử dụng enum cho các kiểu dữ liệu type"
date: 2018-05-15T16:19:16+08:00
tags: 
    - dotnet
---

Một cách đơn giản để code chúng ta dễ đọc hơn. Giả sử chúng ta có bảng `product` với filed `type` kiểu int định nghĩa loại của sản phẩm.


``` js
// product table
1 - "tivi"
2 - "tu lanh"
3 - "may lanh"

```

Thay vì
``` csharp
// Khi thêm 
_productRepo.Add(new Product {
    Type = 1 // Tivi
})

// Khi update
var pd = _productRepo.FindOne(x => x.RowId == ...);
pd.Type = 1;

// Khi query
_productRepo.Where(x => x.Type == 1)
```

Thì code như thế này có phải dễ đọc hơn không.
``` csharp
public enum ProductType {
    Tivi = 1,
    TuLanh = 2,
    MayLanh = 3
}


// Khi thêm 
_productRepo.Add(new Product {
    Type = (int)ProductType.Tivi
})

// Khi update
var pd = _productRepo.FindOne(x => x.RowId == ...);
pd.Type = (int)ProductType.Tivi;

// Khi query
_productRepo.Where(x => x.Type == (int)ProductType.Tivi)
```

Thanks.