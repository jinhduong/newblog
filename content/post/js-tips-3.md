---
title:  "Javascrip Tips - Những điều có thể hay trong JS (ep3)"
date:   2017-02-26 02:00:00
tags:   ["javascript","jstip"]
---

<!-- ![js tips 3](http://i.imgur.com/2z2LiZB.png) -->
Những điều có thể bạn đã biết hoặc chưa, những kinh nghiệm của mình chia sẽ khi lập trình Javascript (ep3). Các bạn có thể xem phần 2 [tại đây](https://jinhduong.github.io/javascripts/2016/06/09/js-tips-2.html)

<!-- more -->

### 1.Sử dụng `Anonymously scope` cho những đoạn code chỉ chạy một lần

Với những đoạn code mà các bạn chỉ chạy một lần trong cả app (giống như các flugins của js hay tạo element gì gì đó rồi thôi...) thì chúng ta nên wrap trong một anonymous function kín.

Những benifit của như là tránh global variable, veriable rác, bớt cấp phát memory, toàn vẹn hơn cho client app... 

```` ts
(function(){
    var a = 123;
    console.log(a); //123
})();

console.log(a); //undefined
```` 

### 2.Cache jquery object nếu sử dụng nhiều lần

Mình thấy vài bạn hay viết như này:

```` ts
function initMenu(){
    $('.menu').addClass('menu-abc');
    $('.menu').find('li').append('def');
    $('.menu')...(....);
}
````

Thay vì như vậy chúng ta nên cache lại jquery object `$('.menu')`.

```` ts
function initMenu(){
    var $menu = $('.menu');
    $('.menu').addClass('menu-abc');
    $('.menu').find('li').append('def');
    $('.menu')...(....);
}
````

> Lưu ý: Không cache **ngoài scope** của `function` nếu chỉ sử dụng nội bộ trong `function` thôi nhé. Đó là điều gây lãng phí và 
code khó quản lý hơn.

```` ts
var $menu = $('.menu');//FOREVER

function initMenu(){...}
````

### 3. Sử dụng `namespace pattern` hoặc `global object` nếu phải sử dụng cho toàn bộ app

Thay vì chúng ta define `các function` và `các biến` như thế này:

```` ts
var funcA = function (){};
var funcB = function (){};
var funcC = function (){};
````

Biến `window` sẽ chứa cả 3 function này. Nếu càng nhiều thêm thì càng gây khó quản lý, dễ sinh bug,... với một **app phức tạp** cũng như liên quan đến vấn đề cấp phát nhiều `bộ nhớ`.

![bad practice](http://i.imgur.com/hxdlRzg.png)

-> Do đó húng ta nên sử dụng `namespace pattern` hoặc một `biến toàn cục` để chứa toàn bộ các biến, function,... (gôm các funcion, var,... chung business lại với nhau).

```` ts
var StateManagement = StateManagement || {};
StateManagement.funcA = function (){};
StateManagement.funcB = function (){};
StateManagement.funcC = function (){};

var UserManagement = UserManagement || {};
UserManagement.funcA = function (){};
UserManagement.funcB = function (){};
UserManagement.funcC = function (){};

//OR using global variable 
__yourSite = __yourSite || {};
__yourSite.funcA = function (){};
__yourSite.funcC = function (){};
__yourSite.funcB = function (){};
````

![](http://i.imgur.com/Pv33l93.png)
![](http://i.imgur.com/y6ZlmeV.png)

> Lợi ích rõ ràng của việc này là code rất clear cũng như thoải mái quản lý biến cho toàn bộ dự án. Nếu team nhiều người mỗi người mỗi module thì điều này là không thể thiếu.

## 4.Tận dụng những hàm được support sẵn

Thấy nhiều bạn cứ hay search `for each` `map` `filter`,... kèm với `jquery`. Đúng là `jquery` support chúng ta nhiều thứ nhưng nếu đọc tài liệu của javascript thì thật sự nó support chúng ta khá nhiều thứ để làm việc với object, array, string,... rồi. Ví dụ như `every`, `some`, `unshift`, `keys`, (có nhiều developer hỏi mình ủa? có luôn hả? <i class="em em-anguished"></i> )...  Nhiều khi chúng ta cũng chẳng cần phải sử dụng thirt party cho những vấn đề đó.

Các bạn có thể lên [Molizza Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) để tham khảo cũng như có cái nhìn tổng quan về toàn bộ javascript trước khi làm một `điều gì đó`. Nhiều khi trong native đã có sẵn rồi.

## Kết
Hy vọng những điều này có thể giúp các bạn có thêm chút kinh nghiệm khi lập trình với `javascript` cũng như nhiều ngôn ngữ khác . Nhất là với những lập trình mới chập chững vào nghề <i class="em em-blush"></i>