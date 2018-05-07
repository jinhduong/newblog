---
title: Wappalyzer-extension xác định công nghệ webapp
author: Dinh Duong
excerpt: true
date: 2018-04-03 09:52:47
tags: 
    - sharing
    - extension
---

# Giới thiệu

Đây là một extension (có cả trên Chrome và Firefox) khá là hữu ích cho dev như chúng mình, nó giúp chúng ta biết được những "bí mật" công nghệ đằng sau của trang web mà chúng ta đang xem, nó đã giúp mình khá nhiều trong việc biết thêm những nền tảng công nghệ mới ví dụ như là Netlify, Heap, Intercom,... cũng như khi thấy những trang web rất chạy rấy là good, tò mò xem nó đã được viết bằng những công nghệ nào React, Vue hay Angular hay đơn giản là js thuần... cũng như xem nó được host trên server gì, các thư viện đang sử dụng là gì... Từ những thứ mới mẻ đó chúng ta có thể học thêm nhiều thứ.

<!-- more -->

Với bản thân mình, nó là một extension giúp chúng ta học được nhiều thứ mà ngay cả khi chúng ta đã subscribe nhiều blog hay những trang công nghệ nổi tiếng cũng không thể nào bao quát nổi cả khối nền tảng rộng lớn trên môi trường số ngày nay, với internet nói chung và lãnh vực web nói riêng. Mình đã học và tim hiểu được rất nhiều từ extension này :D.

Cũng có nhiều trang mà nó không detect được công nghệ đằng sau như Facebook, Google homepage,... đơn giản vì những trang lớn họ không để lộ ra quá rõ cộng nghệ đằng sau, hiểu nôm na thì extension đọc request, response đọc source html, đọc variable của những gì web đó trả về để detect công nghệ nên khi những thứ đó không còn theo qui chuẩn thì nó cũng không detect được.

Hy vọng nó sẽ giúp ích cho những dev chưa biết :D.

![Stack công nghệ của Webtask, khá là lộn xộn](https://i.imgur.com/BiAFLGf.png)

Link chrome: https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg?hl=en


