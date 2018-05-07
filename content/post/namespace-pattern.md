---
title:  "Javascript Design Pattern - Namespace and Revealing Module Pattern, Scope and Closure"
date:   2016-04-14 10:18:00
tags:   
    - javascript
---

- Trong javascript thì có rất nhiều mô hình thiết kế (design pattern) khác nhau, thật ra ai cũng biết là về bản chất Javascript sinh ra đã không phải là một ngôn ngữ chính thống, nó sinh ra ban đầu đơn thuần chỉ dành cho việc xử lý giao diện trên trên browser, bản thân nó không được thiết kế như là một ngôn ngữ lập trình thuần túy với kiểu dữ liệu, access modifiers (private, public, protected,...), kế thừa, class,... 

<!-- more -->

- Nhưng mà rồi theo thời gian công việc của client không đơn giản chỉ còn là vài dòng script lăng quăng chỉnh sửa 1 chút giao diện html từ server trả về (*nói là lăng quăng nhưng thời đó nhìn code javascript mình đã nghĩ nó thật là siêu nhân @@, function lồng nhau búa xua nhìn thật rất là ảo diệu @_@, pro cmnr* ) mà nó đã đảm đương rất nhiều công việc trong sự phát triển của ứng dụng web hiện nay, bây giờ nó có khắp mọi nơi, từ **server** đến **client** rồi tràn sang **database**,... dễ dàng nhìn thấy nhất chính là lượng projects trên github, nơi mà dự án bằng javascript có số lượng áp đảo, những điều này làm mình chợt nhớ về câu nói nổi tiếng (nhưng đúng hay không thì do quan điểm mỗi người thôi !!!) của Jeff Atwood về javascript (Đồng sáng lập trang Stack Overflow) là:  

>Tất cả các ứng dụng mà có thể viết bằng javascript cuối cùng cũng sẽ được viết bằng javascript.

- Do đó khi khối lượng công việc dưới client càng ngày càng nhiều hơn, qui mô những file script ngày càng to lên cả về mặt số lượng lẫn độ phức tạp thì các developer bắt đầu áp dụng những mô hình lập trình để cho việc quản lý, bảo trì, mở rộng và phát triển,... trở nên dễ dàng và qui chuẩn hơn.

Xem xét đoạn code dưới đây
```js
//constructors
function User (){}
function Role (){}

//variables
var userList = [];
var roleList = []

//objects
var defaultUser = {name:'LeThiBe', age:20};
defaultUser.socialId = {fb:'/fb/ltb', google: 'ltb1371'};
var defaultRole = ....
....

```

Bạn có nhận xét như thế nào? Ok chính xác, rõ ràng là số lượng yêu cầu khởi tạo object ở global (toàn cục) có thể khá là nhiều, nó gây cho biến global, ở đây cụ thể là biến `window` rất **không tổ chức**, **khó khăn để quản lý vả cả trong việc đặt tên biến,...** do đó dễ gây lỗi và khó bảo trì. (*tại sao lại nói là **object** vì tất cả mọi loại dữ liệu trong javascript đều là dòng giống của **object** hết* :o ) 

Do đó, chúng ta có thể phải cấu trúc lại là chỉ tạo một object cho ứng dụng của mình, tương tự như này:

```js
var MYAPP = MYAPP || {}; //Chỉ là kiểm tra cho chắc chắn là nếu mà biến này chưa tồn tại thì khởi tạo là object còn đã tồn tại rồi thì đương nhiên là chính nó rồi

MYAPP.User = function(){};
MYAPP.Role = function(){};

MYAPP.userList = [];
MYAPP.roleList = []

MYAPP.defaultUser = {name:'LeThiBe', age:20};
MYAPP.defaultUser.socialId = {fb:'/fb/ltb', google: 'ltb1371'};
MYAPP.defaultRole = ....
....

```
Các bạn có thể thấy, đây chính là cấu trúc của object từ những dòng code bên trên :
![Imgur](http://i.imgur.com/cyg0Y0N.png)
Rõ ràng là nó chỉ còn được quản lý bởi một object duy nhất và đây cũng chính là **Namespace Pattern**, nhưng như bạn thấy, phải code nhiều mã nguồn hơn (MYAPP lặp đi lặp lại rất nhiều lần), và có một bất cập nữa đó chính là kiểm tra sự tồn tại của properties, xem ví dụ dưới đấy

```js
var MYAPP = MYAPP || {};

getDataFromBank(function(bankData){
    var data = bankData || {},
        data['bankACB'] = (data && data['bankACB']) ? data['bankACB']  : [],
        data['bankACB']['finance'] = (data['bankACB'] && data['bankACB']['finance']) 
            ? data['bankACB']['finance'] : [];
        calcFinance(data['bankACB']['finance']);
        .......
});

function calcFinance (financeData){
    ................
}

```

Như các bạn thấy chúng ta phải tốn khá nhiều công sức cho việc kiểm tra ngay khi cần phải xử lý một việc nào đó từ dữ liệu trả về, cho nên chúng ta cần một function để xử lý cho việc gọi namespace (namespacing function). Ví dụ như thế này:

```js

var namespace = function(ns_string) {
    var parts = ns_string.split('.'), 
    parent = this, 
    i;
    
    //Bỏ qua nếu là root (vd là MYAPP)
    if (window[parts[0]] === this) {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // khởi tạo nếu property chưa tồn tại
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

//Khởi tạo namespace cho 1 object bất kỳ
var YOURAPP = YOURAPP || {};
YOURAPP.namespace = namespace;
var item2 = YOURAPP.namespace('YOURAPP.item.item1.item2');

//Hoặc bạn cũng có thể viết ngắn hơn chút
var YOURAPP = YOURAPP || {['namespace'] : namespace};
var item2 = YOURAPP.namespace('YOURAPP.item.item1.item2');
item2['say'] = 'hello everybody';

```
![Imgur](http://i.imgur.com/qkB8UF4.png)

OK, thật ra Namespace là một mô hình khá cơ bản dễ hình dung, đơn giản dễ hiểu, dù nó có một chút khiếm khuyết như là nếu như biến lồng nhau quá nhiều sẽ gây chậm một chút khi truy xuất, là 1 public object nên các thành phần có thể bị thay đổi,...nhưng nó vẫn là 1 pattern đơn giản nhưng hiệu quả.

### Revealing Module Pattern
Trước khi vào nội dung chính của pattern này, mình xin nói về phần access modifiers trong javascript cho bạn nào chưa biết hoặc chưa rõ, javascript không cung cấp những syntax như những ngôn ngữ lập trình truyền thống, nhưng trong javascript vẫn có thể định nghĩa được điều này, đó là khi chúng ta nhắc đến khái niệm **closure** (bao đóng), xem ví dụ dưới đây
```js
function User(){
    //private
    var id='1371';
    var role = 'Admin';
    
    //public
    this.getId = function(){
        return id;
    }
}

```
![Imgur](http://i.imgur.com/8g5Dwoa.png)

- *Hình bên trái*: rõ ràng chúng ta chỉ lấy được giá trị `id` bằng hàm `getId()` chứ không thể truy cập trực tiếp vào `id`, đó chính là private trong javascript.  
- *Hình bên phải*: Nó chỉ rõ hai khái niệm **scope** và **closure** mà interview hay hỏi :D , đó là trong scope của object user chỉ chưa duy nhất là function `getId()`, và trong scope của function `getId()` lại chứa 1 **closure**, mà trong đó mới lấy được giá trị của `id`, và vì biến `role` không nằm trong dữ liệu trả về của hàm `getId()` không nằm trong **closure** của function này nên chúng ta không thể truy xuất với biến này được.

Ah còn một khái niệm nữa mình muốn nói nữa là **anonymous immediate function**, tiếng Anh là vậy, tiếng Việt mình không biết, nhưng có thể gọi là *hàm vô định tự gọi* :D. Ví dụ nhé (Hai kiểu này đều như nhau nhé)

```js

(function(){
//DO SOMETHING
 console.log(123);
})();
//123

(function(){
//DO SOMETHING
 console.log(123);
}());
//123
```

Bạn có thể gán cho nó một biến nhận giá trị trả về của nó
```js

var item = (function(){
 console.log(123);
 return {id: '1371'}
})();
console.log(item);
//123
//item: {id: '1371'}

```

Ok, pattern này cũng chỉ dựa trên những giá trị cơ bản được nhắc ở trên, ví dụ nào
```js

var ArrayModule = (function () {
    //private
    var type = {}.toString;

    function isArray(object) {
        return type.call(object) === '[object Array]';
    }

    function isFunction(object) {
        return typeof object === "function";
    }

    //public
    var removeItem = function (array, iterator) {
        if (isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                if (isFunction(iterator) && iterator(array[i])){
                    array.splice(i, 1);
                    i--;
                }
            }
        } else return;//Not array
    }
    return {
        removeItem: removeItem
    }
})();
```

Chạy thử nào
```js
var players = [{
    name: 'Ronaldo',
    overall: 94
}, 
{
    name: 'Messi',
    overall: 97
}, 
{
    nme: 'Vardy',
    overall: 81
}];

ArrayModule.removeItem(players, function(player) {
    return player.overall > 90;
})

console.log(players);
//{name:'Vardy', overall:81}
```

Trong javascript vẫn còn khá nhiều pattern nữa, bạn có thể tham khảo thêm ở đây:  
- [Javascript Pattern](http://shop.oreilly.com/product/9780596806767.do)  
- [JavaScript Design Patterns - Read online](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
http://jstherightway.org/#patterns)


Trong những dự án hoặc những feature lớn thì code theo một pattern nào đó sẽ giúp bạn dể quản lý, dễ hình dung và sau này là bảo trì nữa, code đẹp trong sáng,...**Mong là những kiến thức ít ỏi này sẽ giúp ích cho bạn, những javascript developer**.