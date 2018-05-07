---
title:  "Javascrip Tips - Những điều có thể hay trong JS (ep2)"
date:   2016-06-09 01:00:00
tags:   ["javascript","jstip"]
---

<!-- ![Imgur](http://i.imgur.com/nWiqhTN.png) -->
Những điều có thể bạn đã biết hoặc chưa, những kinh nghiệm của mình chia sẽ khi lập trình Javascript (ep2). Các bạn có thể xem phần 1 [tại đây](http://jinhduong.github.io/javascripts/2016/06/05/js-tips.html).

<!-- more -->

### Tạo 1 plugin bằng javascript hoặc xài jquery 
Cái này thì những bạn nào hay xài libary của javascript thì hay gặp cái này, thật ra cách tạo 1 cái plugin hay 1 component mà xài nhiều lần với các config khác nhau trong 1 dự án lớn thì khá là cần thiết cũng như code rõ ràng sạch đẹp, clearly, usable, maintainable,... các kiểu. Mình sẽ code để tạo một plugin đơn giản cho việc tạo một grid đơn giản kiểu kiểu như **`kendo Grid`**. Mình sẽ viết một cách đơn giản nhất, tập trung để những bạn chưa biết format của một plugin hay component.Và cho cái nhìn sơ qua để dễ hiểu hơn.

Thường thì một component sẽ có cách khai báo như này.

```js

$('#grid').yourGrid({
    data: [{id:1, name:'Jason'}, {id:2, name:'Kanu'}],
    column : [
        {title: 'ID', field: 'id'},
        {title: 'Name', field: 'name'}
    ],
    loaded: function(e){
        console.log('The grid created');
    },
    ... // Những config và settings nữa nữa gì đó dưới đây
})

```

Bắt đầu nào, nếu mà component của bạn sẽ là một plugin của jQuery thì bạn sẽ xài cú pháp được jQuery cung cấp **`$.fn.yourGrid = function(settings)`** (*yourGrid* là tên component của bạn), còn nếu bạn chỉ sài javascript thuần thì chỉ cần là một function bình thường thôi **`function YourGrid(settings)`**, bạn cũng có thể đưa nó vào một module nào đó của bạn **`yourModule.youGrid = function(settings)`**.Ở đây mình follow theo plugin của jQuery nhé.

Xác định format component định viết. Mình sẽ viết theo cái kiểu này.

```js

$('#grid').sTable({
    // data từ đâu đó, một array or json gì đó,
    // có thể support cho direct url lấy data
    source: [],
    
    //mảng chứa những format column cho grid
    cols: [
            //field: property để lấy data từ item bất kì
            //title: string cho title hiển thị lên trên UI
            {
                field: 'email',
                title: 'Email'
            },
            {
                field: 'pass',
                title: 'Password'
            },
            //template: template cho một item bất kì nào
            //event: xử lý khi user bấm vào cell này với:
            //$tr là jQuery element đang tương tác, curItem là item hiện tại
            {
                field: 'remove',
                title: '',
                template: '<span class="glyphicon glyphicon-remove"</span>',
                event: function ($tr, curItem) {
                    $tr.remove();
                }
            },
    ],
    //xử lý gì đó sau khi grid load xong
    loaded: function(){
        console.log('loaded');
    }

})

```

Code thôi nào, mình show code mình rồi giải thích sơ qua nhé, nó cũng đơn giản, đọc qua là hiểu ngay ý mà :3.

```js
'use strict';
$.fn.sTable = function (config) {
    //ở đây mình tạo 2 element của <table> là tbody và thead,
    //tách biệt như vậy sau này khi cần thêm gì vào phần nào của table
    //cho nó rõ ràng, code nhìn cũng gọn gàng hơn nữa.
    var $tHead = $('<thead>').append('<tr></tr>'),
        $tBody = $('<tbody>');

    //List thead > th
    //Tạo list th trong thead, chúng ta dùng hàm map
    //để tạo ra môt list mới từ property 'cols'
    //mà người dùng đã define. 'field' vs 'idx' trong
    //element <th> thì để sau này có xài gì gì thì dựa zô cái này :D
    var ths = config.cols.map(function (col, idx) {
        return $('<th>', {
            field: col.field,
            idx: idx
        }).text(col.title);
    });

    //List tbody > tr
    //Cũng như cái ths nhưng là tạo ra 1 list <tr> cho tbody
    //Quang trọng cái hàm _createTR thôi
    var trs = config.source.map(function (item, idx) {
        return _createTR(item);
    });
    
    //Thêm ths vào thead và trs vào tbody thôi, so simply :D
    $tHead.find('tr').html(ths);
    $tBody.html(trs);
    
    //Thêm thead và tbody vào cho table, cũng so simply luôn :D
    $(this).html([$tHead, $tBody]).addClass('table table-striped');
    
    //Support functions
    //Hàm này để tạo ra từng thẻ <tr> biểu hiện cho mỗi dòng data
    //và hàm này nó cũng chỉ nằm trong scope của component này nên mình
    //cho cái `_` trước để làm màu mè kiểu là private này nọ thôi :D.
    //Nó sẽ nhận vào 1 dòng là item data nhé
    
    function _createTR(item) {
    
        //Tạo ra danh sách thẻ <td> cho <tr> này, chúng ta sẽ dựa vào
        //property 'cols' mà người dùng define nhé.Nó sẽ cho ta biết
        //load data gì trên <td> đó.
        var tds = config.cols.map(function (col, idx) {
            
            //Nếu có template thì lấy template đó show lên thôi, còn người lại
            //thì show dữ liệu tương ứng ng dùng define thôi.
            //Sau này bạn cũng có thể cập nhật template sẽ là 1 function
            //nhận đầu vào là item và return về một chuỗi nào đó sau khi xử lý
            //qua hàm đó.
            var $show = col.template ? $(col.template) : item[col.field];

            //Binding custom event
            //Kiểm tra nếu cols nào đc define có sự kiện (event) thì
            //chúng ta bind event click vào cho <td> hiện tại đang đc rendering, 
            if (col.event) {
                $show.click(function (e) {
                    //chúng ta sẽ đưa vào function này nhiều thông tin
                    //để người dùng có thể sử dụng nó túy theo mục đích
                    //Vì khi define ở đâu đó họ không có thông tin của 
                    //những data hay element hiện tại, bạn có thể thêm những gì
                    //mà bạn nghĩ người dùng có thể cần phải dùng khi gọi hàm này
                    col.event($tr, item, e);
                });
            }

            return $('<td>').html($show);
        });
        
        //khởi tạo một <tr> có 1 field 'uid', thật ra để kết nối 2 chiều
        //giữa data của bạn và dòng <tr> trên UI ta cần một uid để liên lạc
        //với nhau, biết data này là của dòng nào trên UI. Cần cho bạn ở nhiều
        //khía cạnh, tùy cách bạn sử dụng, như là khi làm mô hình MVVM chẳng hạn,...
        //Chúng ta uid cho một item bất kì nào đó lúc thêm mới chẳng hạng hay là
        //lúc each đọc data người dùng đưa vào,... nói chung khi nào cũng đc tùy bạn.
        var $tr = $('<tr>', {
            uid: item.uid
        }).html(tds);

        return $tr;
    };
};

```

OK mong là những dòng giải thích của mình dễ hiểu (y), run thử nào.

```js

$('#grid').sTable({
        cols: [
            {
                field: 'email',
                title: 'Email'
            },
            {
                field: 'pass',
                title: 'Password'
            },
            {
                field: 'remove',
                title: '',
                template: '<span class="glyphicon glyphicon-remove"</span>',
                event: function ($tr, curItem) {
                    $tr.remove();
                    //remove this item
                }
            },
        ],
        source: data || [ {email:'123@gmail.com', pass:'12312321'},
                            {email:'lekia@gmail.com', pass:'12323432@}' ]
    });

```

Thật ra nói về component grid thì nó là một trong những component lắm thứ nhất quả đất, nhiêu đây khá là cơ bản về nó, nhưng từ đây bạn có thể phát triển thêm tính năng cho nó, những tính năng hay ho có thể được tạo ra từ bạn. Nhiều khi cần một cái hàm tạo grid đơn giản thôi mà phải down những library to tướng dư thừa cũng ko đc hay lắm, đơn giản mà cứ nhỏ nhỏ vừa đủ xài và biết 100% về nó vẫn là phê hơn :D. Còn những feature lớn cần rất nhiều tính năng phức tạp viết lại tốn time thì cứ xài library nhé, hiểu thì modify lại ko có gì là khó cả ;).

### Define Enum trong javascript (same same Flags in C#)
Đa số các bạn chắc đều biết kiểu **Enum** nhỉ, mình viết cái này lấy cảm hứng từ **[Flags]** bên C# khi đọc code của ai đó mà quên mất rồi :D. Thì trong lập trình có nhiều khi chúng ta cần kiểm tra hai chiều (Flags trong C# là 1 chiều nhé) ví dụ như là:
```js

1 - VietNam
2 - USA
3 - Laos

```

Thì để tìm những giá trị như VIETNAM, USA, LAOS,... mình cần một hàm đưa vào một `id` và sau đó tìm ra một `value` tương ứng, cũng như ngược lại, nhập cái giá trị `value` để tìm lại `id`. Thử nào.

```js

var Flags = function(src) {
    var _enum = function(key) {
        return src[key];
    }
    Object.keys(src).forEach(function(prop) {
        //Bạn có thể phải validate giá trị 'val' này 
        //(có khoảng trắng, kí tự đặc biệt,...)
        var val = src[prop].toUpperCase();
        _enum[val] = prop;
    });
    return _enum;
}

```

Giờ thì test nào.

```js

var Countries = Flags({
    1: 'VietNam',
    2: 'Laos',
    3: 'USA',
    4: 'Thailand',
    6: 'Malaysia'
});

var Foods = Flags({
    1: 'Beef',
    2: 'Chicken',
    15: 'Carrot'
});

console.log(Countries(1)); //Vietnam
console.log(Countries.VIETNAM); //1

console.log(Foods(1)); //Beef
console.log(Foods.BEEF); //1

```

Mình thêm một cái `object Foods` nữa là để thể hiện cái hàm `_enum` nó sẽ được khởi tạo mỗi lần user instance hàm Flags nên sẽ không bị **override** lên nhau thôi. Với lại dù _enum là 1 function không có nghĩa là nó không có quyền được có property, các bạn biết đó function bản chất cũng là object mà thôi. 

![Imgur](http://i.imgur.com/U5HxMfv.png)

**(1)** `__proto__` của nó là function nhưng nó kế thừa `prototype` **(2)** từ object nên nó có tất cả các thứ của object. 

Và có một điều nữa là là object ko còn kết thừa bất kì một `prototype` nào nữa, nó là cái root của mọi thứ rầu ;).

### .html() và array trong jQuery

Không biết cái này nhiều bạn biết không nhỉ? Đọc trên documents của jQuery mình cũng ko thấy nói, chỉ thử thôi coi nó có support không thôi, trong đầu cũng nghỉ chắc nó phải support chứ nhỉ, cuối cùng thì nó có support :D.

```js
var $target = $('#id');

var $list = ['title1','title2','title3'].map(function(tit){
    return $('<span>').text(tit);
})

$target.html($list);
```

Bạn cũng có thể thêm một list con cho một element theo trình tự trái qua phải của 1 array bằng cách này.

```js

var $table = $('table')
  , $tbody = $('tbody')
  , $thead = $('thead');
  
$table.html([$thead, $tbody]);//thead sẽ được thêm trước tbody

```

### Tạo một collection jQuery

Từ một list data bạn có thể tạo ra danh sách các `jQuery object` bằng cách dùng hàm `map` của javascript. Nó cũng khá gọn gàng cho công việc tạo một list con, mình thấy nhiều bạn cộng chuỗi nhìn code không được đẹp lắm.

```js

var $list = ['title1','title2','title3'].map(function(tit){
    return $('<span>').text(tit);
})

```

4h chiều rồi ah, nhanh vãi nồi, lại hết mịa ngày T7 rồi, thôi tới đây dừng thôi về nhà ăn cơm thôi, mấy em cafe rót nước cũng chắc cũng 10 lần rồi =)).Euro may mắn nhé anh em ;).Out out gấp.