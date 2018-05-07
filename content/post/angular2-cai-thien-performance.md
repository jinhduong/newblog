---
title:  "Angular2 - Cải thiện tốc độ của một ứng dụng angular với lazyloading and preloading"
date:   2017-03-25 00:00:00
tags:   
  - angular 2
---

<!-- ![banner](http://i.imgur.com/BIrUDKA.png) -->
Giống như bất cứ một vấn đề gì? Ví dụ như chúng ta phải mua full một bộ dao từ lớn tới nhỏ, từ gọt trái cây cho đến chặt thịt chặt xương, sau đó mỗi khi có công việc gì chúng ta phải nhét hết bỏ bao đem hết đống đó đi để sử dụng. 

<!-- more -->

**Cái hay** ở đây là bất cứ làm việc gì chúng ta đều có dụng cụ phù hợp (1 loại dao nào đó trong bao) để xử lý.

Nhưng **cái dở** là lúc nào chúng ta cũng phải xách trên vai một đống dao dó đi dù thật sự có khi chúng ta lại chả dùng đến một cái nào trong đó cả. 

Tương tự như trong một website chúng ta thường include luôn những thư viện, những module,... mà thật sự chúng ta không xài đến hoặc chỉ thật sự sử dụng trong một trường cụ thể hiếm hoi nào đó thôi. 

Hiện tại có rất nhiều library hõ trợ ta việc load thư viện như: [Webpack loader](https://webpack.github.io/docs/loaders.html), [Browserify](http://browserify.org/) [SystemJS](https://github.com/systemjs/systemjs),... Và với project sử dụng một SPA framework như Angular, React, Vue,... thì vấn đề đó với đánh giá của bản thân mình rất là quan trọng để cái thiện tốc độ tải cũng như UX.

Hôm nay mình sẽ giới thiệu các bạn cách cải thiện tốc độ một dự án Angular2 với nhưng công cụ được Angular cung cấp.
Mình sẽ gọi Angularv2 là Angular nhé. Và Angularv1 sẽ là AngularJS.

### 1. App khi tải toàn bộ
Cấu trúc một simple app của chúng ta sẽ là như thế này. Chúng ta sẽ có một trang `Home` và trang `Elements`. Trang Elements sẽ chứa hết tất cả các components của bootstrap [Bootstrap components](http://getbootstrap.com/components/). Đương nhiên trang Elements sẽ rất nặng, chủ đích đễ dễ thấy dự khác biệt sau khi áp dụng các kĩ thuật thôi ah. ahoho.

**Đây là html của trang `Elements`** (nó nhiều quá nên mình chỉ up tấm hình tượng trưng - mình copy hết html của trang bootstrap components)
![bootstrap components](http://i.imgur.com/YxOUF7n.png)

**Giao diện app** (chỉ có 2 link `Home` và `Elements` để đá qua 2 trang)
![Giao dien app](http://i.imgur.com/LOeWTzm.png)
Ở đây mình sử dụng `Angular CLI` để khởi tạo một Angular App nhé. Bạn có thể xem thông tin ở đây [Phát triển ứng dụng ng2 chưa bao giờ đơn giản hơn thế.](https://jinhduong.github.io/angular2/javascript/2017/02/25/angular-cli-simply-way-to-dev-ng2.html)

Đây là tốc độ khi load toàn bộ app (no cached) : **42.84s** @_@ Lâu kinh. Lí do là bởi angular2 phải parse cái đống html 3000 dòng trong component `Elements`
![toan bo app](http://i.imgur.com/qaQo7rn.png)

Mấu chốt ở đây trang `Elements` không được hiển thị lên khi app được load lên lần đầu. Trong khi vấn đề gây ra chậm là lại do nó => Chỉ load component `Elements` khi người dùng thật sự muốn link tới nó. 

Từ nhu cầu đó và rất vui là Angular đã cung cấp (từ bản rc5 thì phải lúc mình bắt đầu làm thì nó release rùi ^^) cho chúng ta feature `Lazy loading` một module bất kì. 

### 2. Apply lazy load cho Element component

Đầu tiền chúng ta sẽ tách `Elements component` ra là một module riêng (Lưu ý: Một module có thể chứa một hoặc nhiều component nhé). Trong thực tế chúng ta nên module lại nhiều component cùng chung 1 chức năng. 

Ví dụ như module cho thông tin user (các component sửa thông tin, đổi mật khẩu, xem lịch sử,...) nó sẽ không phải lúc nào cũng cần tải lên để người dùng sử dụng. Chúng ta sẽ module nó và chỉ load khi nào người dùng gọi đến nó.

**1. Example code cho `Elements Module`**

````ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent } from './elements.component';

//Định nghĩa router riêng cho module này
const routing: Routes = [
  { path: '', component: ElementsComponent }
];

//forChild -> Vì router này sẽ được load như một router con
//cho nên chúng ta định nghĩa forChild cho router này
const Routing: ModuleWithProviders = RouterModule.forChild(routing);

@NgModule({
  imports: [
    CommonModule,
    Routing
  ],
  declarations: [
    ElementsComponent
  ]
})
export class ElementsModule { }
````

**2. Example code trong `app module`**

Các bạn chú ý chỗ `loadChildren` nhé. Đại loại khi trỏ tới link `elements` nó sẽ load module từ `Elements Module`.

````ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ElementsComponent } from './elements/elements.component';

const routing: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  //Here: Chúng ta sử dụng loadChildren 
  //và đưa đường dẫn đến module mà chúng ta sẽ apply lazyloading
  { path: 'elements', loadChildren: 'app/elements/elements.module#ElementsModule' }
];

const Routing: ModuleWithProviders = RouterModule.forRoot(routing);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ElementsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

````


**3. Sau khi build**
![sau khi build](http://i.imgur.com/esrkVye.png)
Do sử dụng `Angular CLI` và `Angular CLI` sử dụng webpack nên chúng ta có file `0.chunk` chính là file bundled của `Elements module` .

**4. Chạy thử trên browser**
![toc do tai trang](http://i.imgur.com/xtqGDAA.png)
Tốc độ tải trang chỉ còn : **1.80s** (toẹt zời ^^). 

Vì do khi app được load thì thằng `element component` không được load cùng nên => tốc độ được cải thiện. Do đó trong dự án trước khi bắt đầu code chúng ta nên module hóa hết tất cả các chức năng. Và càng chi tiết càng tốt. 

Vì để sau này khi dự án đã lớn gom lại theo module vẫn được nhưng sẽ rất tốn thời gian. Vì khi đó sẽ phát sinh lỗi vì khi dự án lớn các component khá chồng chéo, các services nhiều nơi, các thirt party controls sử dụng cho nhóm chức năng nào,... 

- Còn đây là khi chúng ta click vào link Elements

![khi element module loaded](http://i.imgur.com/wDODHqY.png)
Sau khi chúng ta click vào `link elements` thì nó sẽ download file `0.chunk` và excute `elements module`.

Nhưng việc này sẽ tạo ra một issue khác, đó chính là **khoảng thời gian mà người dùng phải đợi** sau khi click vào `elements module`. Trên hình trên bạn có thể thấy sau khi load xong file `0.chunk` browser cần 1 thời gian khá lâu để execute. Đây là khoảng thời gian chết mà chúng ta đưa cho người dùng.

Từ đó => chúng ta không nên để người dùng phải nhất thiết phải click vào thì chúng ta mới tải và execute chúng. => Khái niệm **preload a module**.

### 3. Áp dụng preload cho một module

Tiếp tục lại rất vui vì Angular đã support cho chúng ta làm việc này một cách thật đơn giản khi dùng chung với `lazyloading`.

**1. Add `PreloadAllModules` từ `@angular/router`**

````ts
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
````

**2. Định nghĩa lại cho router**

````ts
const Routing: ModuleWithProviders = RouterModule.forRoot(routing, { preloadingStrategy: PreloadAllModules });
````

**Toàn bộ code app.module**

````ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routing: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'elements', loadChildren: 'app/elements/elements.module#ElementsModule' }
];

const Routing: ModuleWithProviders = RouterModule.forRoot(routing, { preloadingStrategy: PreloadAllModules });

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
````

> **Chú ý về angular complier**
> Angular2 có hai cách biên dịch là JIT(just-in-time) và AOT(Ahead-of-time). Đại khái JIT sẽ **biên dịch khi runtime** còn AOT sẽ **biên dịch trước** toàn bộ và khi app run thì không cần phải tốn time để execute nữa. 
> AOT được đưa ra sau này để cải thiện performace khi load page và nó được dùng để deploy app lên production. Các bạn có thể xem thêm ở đây [Angular complier](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html#!#aot-jit).

Vì `module elements` rất nặng nên nếu build kiểu JIT thì khi `0.chunk` sẽ tạo ra một khoản thời gian chờ kha khá để đợi load và execute. Ở đây mình sẽ build **= AOT**.

Chúng ta sẽ run với mode production. Các bạn gõ như này.

`ng serve --prod`

Sau khi build
![preloading](http://i.imgur.com/N10qbJD.png)

Và đây là sau khi chạy. Chỉ **985ms**

Không cần tốn time để biên dịch cả trang bootstrap component.
<iframe src="//giphy.com/embed/yHuVJi6wuqbOE" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/yHuVJi6wuqbOE">via GIPHY</a></p>

![khi chay](http://i.imgur.com/72riFSg.png)



Sử dụng `AOT complier` sẽ khiến file như `elements module` này to hơn nhưng thay vào đó file `vendor.xxx.bundle.js` chứa source `angular core` sẽ giảm đi, vì nó ko cần những đoạn source để biên dịch các module khác khi chạy. 

Thật sự angular v4 mới release ngày 23 tháng này. Angular core team đã cái thiện bộ `renderer` và `AOT complier` để giảm bớt dung lượng khi biên dịch. Hiện tại mình thấy cũng khá tốt vì khi dự án thật sự chúng ta không nên để quá nhiều code html để angular2 phải tốn time để biên dịch mà nên chia nhỏ hết mức có thể các components.

Các bạn có thể xem với AOT complier và angular v4 mới release một app angular đơn giản chỉ khoản 78kb khi đã gzipped. Tweet của một người khá có tiếng trong cộng đồng Angular **Todd Motto**.   
[https://twitter.com/toddmotto/status/841261190777057280](https://twitter.com/toddmotto/status/841261190777057280)

Hy vọng sẽ giúp ích cho những bạn đang làm việc `angular2`. Thanks hehe.

### Tham khảo
[https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb](https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb)
[https://angular.io/docs/ts/latest/cookbook/aot-compiler.html#!#aot-jit](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html#!#aot-jit)
[https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html](https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html)
