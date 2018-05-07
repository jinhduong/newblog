---
title:  "Javascrip Tips - Những điều có thể hay trong JS (ep1)"
date:   2016-06-05 01:00:00
tags:   ["javascript","jstip"]
---

Những điều có thể bạn đã biết hoặc chưa, những kinh nghiệm của mình chia sẽ khi lập trình javascript, mong nó có thể giúp ích cho các bạn đang lập trình ngôn ngữ này :D.

<!-- more -->

### Tránh lỗi khi dùng những default function của array

Các default array function của javascript như **map, forEach, filter,...** sẽ bị lỗi nếu như trường hợp array của bạn null hoặc undefined (vd: nhận dữ liệu từ server), nó khá nguy hiểm nếu bạn nào quên, khiến ứng dụng mình **stop** ngay lập tức. Các bạn nên check trước khi gọi các function đó. Bạn có thể lồng nó vào scope của if hoặc gọn hơn thì viết như này.

```js
var newArr = array && array.map(function(item){
    //DO SOMETHING
});

```

### Sử dụng Ternary Operator cho gọn gàng

**Ternary Operator**, mấy bạn Mễ gọi thế :D, nó là **? :** mà các bạn hay sài thôi. Các bạn có thể sử dụng thay cho if else, nhưng nhiều trường hợp nó tiện hơn rất nhiều.Ví dụ:

```js
//jquery css
$element.css('color', per$.isFirstTab ? 'red' : 'green');

//set value for a variable
var color = per$.isFirstTab ? 'red' : 'green';

//Call a function
removeItem(per$.isFirstTab ? item1 : item2); //input values
module[per$.isFirstTab ? 'remove' : 'add'](item); //methods

```


### Hàm map của javascript và jquery

Hai cái này thì nó khác nhau, bạn nào hay sài thì sẽ thấy, function map native của javascript nó sẽ **return các giá trị undefined** cho những item không thỏa điều kiện, còn jquery thì giúp chúng ta điều đó.

```js
var array = [2, 3, 4, 5, 6, 7, 8];
var map1 = array.map(function(item) {
    if (item > 4)
        return item;
});
var map2 = $.map(array, function(item) {
    if (item > 4)
        return item;
})
console.log(map1); //[undefined, undefined, undefined, 5, 6, 7, 8]
console.log(map2); //[5, 6, 7, 8]

```

Nên nếu viết bằng hàm map của javascript thì bạn có thể viết lại bằng cách **dùng hàm filter** của native như thế này:

```js
var array = [2, 3, 4, 5, 6, 7, 8];
var map1 = array.map(function(item) {
    if (item > 4)
        return item;
}).filter(function(item) {
    return item;
});

console.log(map1); //[5, 6, 7, 8]
```

### Iterator trong javascript

Nếu bạn xử lý nhiều trong javascript thì bạn hay dùng những hàm thông dụng như forEach, map, filter, reduce,... kiểu lập trình như vậy được gọi là **Declarative Proramming** (Bạn tham khảo [ở đây](https://tech.3si.vn/2015/09/19/declarative-programming/), một bài viết rất hay về Declarative Proramming). Mình sẽ viết lại các hàm mà javascript cung cấp đã được liệt kê ở trên để làm ví dụ.

### Hàm forEach
```js
var array = [2, 3, 4, 5, 6, 7, 8];
Array.prototype.foreach = function(iterator) {
    for (var i = 0, len = this.length; i < len; i++) {
        iterator && iterator(this[i]);
    }
}

array.foreach(function(item) {
    if (item > 4)
        console.log(item)
});
//5,6,7,8

```

![Imgur](https://i.imgur.com/UfiAhxV.png)

### Hàm map

```js
var array = [2, 3, 4, 5, 6, 7, 8];
Array.prototype.mapping = function(iterator) {
    var list = [];
    for (var i = 0, len = this.length; i < len; i++) {
        if (iterator)
            list.push(iterator(this[i]));
    }
    return list;
}

var newArr = array.mapping(function(item) {
    return item * item;
});

console.log(newArr);//[4, 9, 16, 25, 36, 49, 64]

```

### Hàm remove
Trong javascript không support chúng ta hàm **remove 1 item theo 1 điều kiện nào đó** nên chúng ta có thể viết lại cho tiện sử dụng, dù chúng ta có thể sử dụng forEach hoặc nhiều cách khác để làm nhưng làm như thể sẽ thấy nó rõ ràng dễ maintain hơn.

```js
var array = [2, 3, 4, 5, 6, 7, 8];
Array.prototype.remove = function(iterator) {
    for (var i = this.length; i >= 0; i--) {
        if (iterator && iterator(this[i]))
            this.splice(i, 1);
    }
}

array.remove(function(item) {
    return item > 4;
});

console.log(array);//2,3,4

```

Kết thúc ep1, nhớ tiếp những gì hay hay mình sẽ chia sẽ tiếp ở series này phần sau.