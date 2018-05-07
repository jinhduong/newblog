---
title:  'Angular-CLI - Phát triển ứng dụng ng2 chưa bao giờ đơn giản hơn thế'
date:   2017-02-25 10:00:00
tags:   ["angular"]
---

<!-- ![angular-cli](http://i.imgur.com/7svwDWJ.png) -->

## Angular CLI là gì?

Angular CLI là gì? - **Command line interface tool** for Angular2. Được lấy cảm hứng từ Ember-CLI. Nó làm một tool cho những dự án về angular2 để hỗ trợ việc build môi trường để viêc phát triển một dự án angular2 nhanh chóng và dễ dàng hơn. Các chức năng của nó như là <i class="em em---1"></i> :

<!-- more -->

- Structure cho một dự án angular2
- Các command line hỗ trợ việc tạo các loại data,class,... trong angular2 (component,pipe,serive,directive,...)
- Add sẵn các testing framework như karma, jasmine và e2e.
- Tích hợp bundle bằng webpack, auto-live, polyfill,...
- Hỗ trợ quản lý file bằng angular cli config.
- Build production mode, config api enpoint,...
- ...

Các bạn có thể lên trang chủ của nó để xem thêm [Angular CLI](https://cli.angular.io/). Nó cũng thuộc dự án của angular team nên các bạn đừng lo về việc sử dụng nhé.

Nếu bạn là một người mới tiếp xúc với Angular2. Đã và đang làm theo những getting started trên trang chủ của Angular2. Lời khuyên của mình là bạn cứ tiếp tục và mình tin chắc rằng khi bạn thật sự nghiêm túc với dự án về Angular2 của mình thì lúc đó bạn sẽ nhận ra nhiều vấn đề như bên dưới đây <i class="em em-confounded"></i> :

- Phát triển trên 2 mode `deveplopment` và `production`
- Build dự án (sử dụng gulp, grunt, webpack... và config chúng - config nỗi ám ảnh cho người mới bắt đâu @_@)
- Add các plugins như auto-live, tslint, typings...
- Structure của một project
- Những công việc lập đi lập lại (tạo component, serive, pipe, directive,...)
- Những lỗi rất khó chịu khi config nhiều công nghệ mới lại với nhau cũng như khi update version mới.
- Unit test.
- ...

Thời gian đầu cũng do những vấn đề đó nên mình chuyển dự án đang viết qua sử dụng Angular-CLI luôn. Và do đó công việc chúng ta cần làm là chỉ tập trung vào chuyện phát triển chức năng thay cho việc setup môi trường.

Bên cạch những điều tích cực mà nó đem lại thì bên cạnh đó nó cũng có những issue, khuyết điểm mà khi sử dụng mình thấy <i class="em em--1"></i>

- Perfomance khá chậm mỗi khi change file và re-build lại app. (Đã cải thiện từ bản beta28, cảm thấy giờ khá nhanh).
- Nhiều developer không hiểu thật chất những gì nằm dưới tool như webpack,live-reload,addscript...
- Update lại version mới khá tốn thời gian.
- ...

## Setup một dự án mới bằng Angular-CLI

1. Angular-CLI được viết bằng nodejs nên nó yêu cầu máy của bạn cài Node và npm
2. `npm install -g @angular/cli`
3. `ng new demo` tạo mới dự án
4. `cd demo`
5. `ng serve` chạy dự án dưới dev mode.
6. `localhost:4200` 

Các bạn có thể lên [Angular-CLI document](https://github.com/angular/angular-cli) để xem thêm các chức năng cơ bản khác nhé.

## Kết

Thank Angular-CLI team đã tạo ra một công cụ hữu ích cho những angular2 coder và angular2 coding. Chúc các bạn có những dự án thành công. <i class="em em-money_with_wings"></i>

>P/s: Các bạn có thể search `tên công nghệ + CLI` để có những công cụ hỗ trợ tương tự nhé. <i class="em em-grimacing"></i>