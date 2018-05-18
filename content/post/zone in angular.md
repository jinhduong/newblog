---
title: "Zone in Angular"
date: 2018-05-18T17:27:31+08:00
draft: true
tags: 
    - angular
---
# Chất vất bản thân

Khi làm việc với `Angular`, bạn có bao giờ hỏi là => thế beep nào mà mình phải cần xài thằng `zone.js` để chạy một ứng dụng Angular? Why why why? Mịa nó chiếm space của ứng dụng bố mà chả hiểu **cần nó làm cái méo gì?** Có thấy `React` hoặc `Vue` có cần cái dependencies nào để chạy chung đâu hè. 
Nói tới đây chắc fan của Vue và React sẽ nháo nhào chê bai Angular là: *đang mệt, Angular như shệt, qua học React hay Vue gì đê bác ưiiiii !!!!!*

**Vậy `zone.js` là gì?** mà các kỹ sư thiên tài ở `Google` phải bắt buộc sử dụng đến cho framework nài. Để trả lời câu hỏi trên chúng ta nên quay lại một chút về các khái niệm thiết kế cơ bản của Angular.

# React, Angular và Vếu... nhầm Vue

Tại đây mình chỉ đề cập đến 3 frameworks này, vì mặc dù có nhiều framework khác làm những việc tương tự, mình chưa chắc là nó không tốt bằng 3 anh này nhưng về độ phổ biến thì 3 anh này không ai bằng, chẳng khác nào bộ 3 huyền ảo `Zara`, `HM` và `Uniqlo`. Còn ánh xạ cho ai thì tùy bạn :D

Như chúng ta đỡ biết, `React` và `Vue` và nhiều framework khác sử dụng **virtual DOM** để detect, và sau khi **tính toán sự thay đổi**, cuối cùng là update lại **những thứ thật sự thay đổi** lên trên `ĐƠM thật`. `ĐƠM ảo` là vậy, dù mấy cái vụ DOM ảo này mình cũng không rành lắm, nhưng cơ bản là như vậy. 

Nhưng Angular **lại không sử dụng thiết kế đó (VDOM)** để phát triển, mà bọn họ lại chọn thiết kế **change detection** để làm cái việc đó.

**Vậy tại sao họ lại lựa chọn thiết kế nài?** Xin trả lời là mình **đếu biết**. 
Mình nghĩ chắc họ có lý do của họ, tìm hiểu nhiều tài liệu nhiều cuộc tranh luận mình cũng không thấy cái nào là rõ ràng và thật sự chính xác. Nhưng có lẽ nói như thế này là đúng nhất
```
Is chocolate ice cream better than vanilla ice cream?
```
Mình cũng ếu biết luôn, mình ghét ăn kem, mình ăn bưởi hơn, vì nó tốt cho sức khỏe? Mình nghĩ ae coder cũng thích ăn bưởi hơn, chắc vậy? còn ai thích ăn kem thì tùy, thế giới giờ cũng thoáng :D

Nhưng có 1 điều mình **chắc chắn** là chạy Angular **sẽ tốn memory** hơn là `React` và `Vue`, mà cũng đơn giản thôi vì nó là 1 framwork hoàn chỉnh từ render đến routing và làm được nhều thứ khác mà không cần đến thirt party.
Mà vấn đề quản lý `memory` ở javascript thì framework nào cũng vậy, không nắm được rõ cái mình đang làm thì `best framework` cũng `out of memory` thôi. `Webpack` là 1 ví dụ, chạy `build build run run` một hồi lâu là out of memory liền.



