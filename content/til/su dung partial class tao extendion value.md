---
title: "Sử dụng partial class để tạo ra các extention value"
date: 2018-05-15T14:46:41+08:00
tags: 
    - .net
---

# Hoàn cảnh

Thường thì dữ liệu lấy từ database và trả về dưới client sẽ ít nhiều khác nhau, bởi vì một vài dữ liệu trong database như khóa chính `key, row_id` và các field nhạy cảm sẽ được ignore khi đưa xuống client và cũng như frond-end cũng cần các trường dữ liệu có liên quan đến những trường được ignore. Trong OOP đó là có thể gọi đây là `encapsulation`.

Thường khi một object từ database truyền xuống client sẽ đi qua class gọi là `DTO` *Data Transform Object*. Sau khi convert qua class này, những thuộc tính mà chúng ta không muốn đưa xuống cho front-end sẽ được giữ lại, và chúng ta sẽ cung cấp những thuộc tính khác để thể hiện dữ liệu này dưới một dạng khác.

# Ví dụ
Ta có table tên là `booking` dùng để đặt vé, field `booking_type` dùng để xác định loại đặt vé, có vài loại như `vip` `internal` `promo` `online` `offline`, dùng kiểu `int` để lưu trữ, giả sử online là 1, offline là 2, các kiểu khác thì không cần gửi về cho front-end, thay vì gửi kiểu int xuống cho front-end, tốt nhất chúng ta nên gửi 1 field mới ví dụ như là `isOnline`, `isOffline` cho front-end là đủ.
``` csharp
class Booking {
    public long RowId { get; set; };
    public int BookingType { get; set;};
    ...
}

class BookingDto {
    // Transform các field của class Booking
    ...
}

// Sử dụng 1 file khác như là BookingDto.Ext.cs
partial class BookingDto {
    public isOnline => BookingType == (int)BookingTypeEnum.Online;
    public isOffline => BookingType == (int)BookingTypeEnum.Offline;
}
```

Thanks.

