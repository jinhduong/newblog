---
title: Bài toán sidebar cho front-end
tags:
  - sharing
  - javascript
  - angular
author: Dinh Duong
excerpt: true
date: 2018-04-17 10:46:56
---

Dạo gần đây đa phần các dự án mới đều được viết bằng các framework SPA như React Vue hoặc là Angular, và một số thư viện khác nữa... 

<!--more-->

# Bối cảnh

Mình nói đa phần vì, không phải dự án cũng buộc phải dùng SPA cả! Kiểu như cứ làm SPA rồi là than làm sao để SEO 😴 dù biết là vẫn có thể SEO được nhưng mà phải làm lằng nhoằng quá, thay vào đó đơn giản hơn có thể dùng ngôn ngữ server side rendering như PHP, RoR, nodejs, .net... và đi kèm SPA cho một số pages internal là được gòi. 😅

Quay lại vấn đề chúng ta có nên **cache** danh sách các chức năng của người dùng nằm ở phía client hay không? Hãy để lại ý kiến của bạn nằm ở dưới nhé.

Theo mình là tùy theo thể trạng dự án, nếu công việc query chức năng và **cache trên server tốn nhiều tài nguyên** cũng như ảnh hưởng nghiêm trọng tới UX của người dùng thì chúng ta nên implement việc này. Và điều quan trọng nhất của việc này là khi nào thì danh sách chức năng nằm phía dưới client kia **được refresh** và làm mới?

# Hướng giải quyết

Có 2 hướng giải quyết ở đây là:
- Tạo ra một **expire time** cho cache.
- Hoặc bắt buộc **server phải làm một hành động** để nhận biết việc là hệ thống cần query lại danh sách chức năng cho người dùng. 

1. Cách đầu tiên nếu dùng **expire time** nó giúp chúng ta tự động làm dữ liệu sau mỗi khoảng thời gian và không cần sự tác động từ server, nhưng điểm yếu là cần một khoảng thời gian để làm mới sau khi dữ liệu bên phía back-end thay đổi (ở đây là người dùng bị thay đổi, thêm bớt các chức năng).

2. Qua cách thứ hai là force server phải refresh lại việc query danh sách chức năng cho người dùng, ở đây chúng ta có thể dùng **static variable** trên server để làm việc này (`Admin` sẽ làm việc này trong trang `settings` chẳng hạn). 
Một vấn đề nữa đó là thay vì refresh lại tất cả các dữ liệu cho mọi người dùng thì chúng ta có implement `danh sách các người dùng cần refresh lại data` và chỉ làm việc nội trên danh sách người dùng đó.

Bài viết lủn củn dựa trên một scenario back-end server lủn củn 😔. Bài toán là như vậy không có gì phức tạp những suy nghĩ như một đứa trẻ mà thôi. Mình sẽ implement bài toán bằng `Angular` và `.net core` hoặc `nodejs` gì đấy cho những bạn mới còn lơ mơ nhé.



