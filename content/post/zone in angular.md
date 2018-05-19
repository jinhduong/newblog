---
title: "Zone in Angular và các thiết kế ở front-end framework"
date: 2018-05-18T17:27:31+08:00
tags: 
    - angular
    - javascript
    - front-end framework
---

![zone in angular](https://i.imgur.com/po98H7T.png)

# Chất vất bản thân

Khi làm việc với `Angular`, bạn có bao giờ hỏi là => thế beep nào mà mình phải cần xài thằng `zone.js` để chạy một ứng dụng Angular? Why why why? Mịa nó chiếm space của ứng dụng bố mà chả hiểu **cần nó làm cái méo gì?** Có thấy `React` hoặc `Vue` có cần cái dependencies nào để chạy chung đâu hè. 

Nói tới đây chắc fan của Vue và React sẽ nháo nhào chê bai Angular là: *đang mệt, Angular như shệt, qua học React hay Vue gì đê bác ưiiiii !!!!!*

**Vậy `zone.js` là gì?** mà các kỹ sư thiên tài ở `Google` phải bắt buộc sử dụng đến cho library nài. Để trả lời câu hỏi trên chúng ta nên quay lại một chút về các khái niệm thiết kế cơ bản của Angular.

# React, Angular và Vếu... nhầm Vue

Tại đây mình chỉ đề cập đến 3 frameworks này, vì mặc dù có nhiều framework khác làm những việc tương tự, mình không đề cập không phải là vì nó không tốt bằng 3 anh này, nhưng về độ phổ biến thì 3 anh này không ai bằng, chẳng khác nào bộ 3 huyền ảo `Zara`, `HM` và `Uniqlo`. Còn ánh xạ cho ai thì tùy bạn :D

Như chúng ta đỡ biết, `React` và `Vue` và nhiều framework khác sử dụng **virtual DOM** để detect, và sau khi **tính toán sự thay đổi**, cuối cùng là update lại **những thứ thật sự cần thay đổi** lên trên `ĐƠM thật`. Cơ bản là vậy đó, vì mấy cái zụ `ĐƠM ảo` này mình cũng không rành lắm, biết zậy thôi.

Nhưng Angular **lại không sử dụng thiết kế đó (VDOM)** để phát triển, mà bọn họ lại chọn **change detection** để làm cái việc detect, và render lại view.

**Vậy tại sao họ lại lựa chọn thiết kế nài?** Xin trả lời là mình **đếu biết**. 

Mình nghĩ chắc họ có lý do của họ, tìm hiểu nhiều tài liệu nhiều cuộc tranh luận mình cũng không thấy cái nào là rõ ràng và thật sự chính xác. Nhưng có lẽ nói như thế này là đúng nhất
```
Is chocolate ice cream better than vanilla ice cream?
```
Mình cũng ếu biết kem nào ngon hơn luôn, mình ghét ăn kem, mình ăn bưởi hơn, vì nó tốt cho sức khỏe? Mình nghĩ ae coder cũng thích ăn bưởi hơn, chắc vậy? còn ai thích ăn kem thì tùy, thế giới giờ cũng thoáng. **Mà suy cho cùng thoái mái với cái gì thì mình cứ làm với đó thôi.**

Nhưng có 1 điều mình **chắc chắn** là chạy Angular **sẽ tốn memory** hơn là `React` và `Vue`, mà cũng đơn giản thôi vì nó là 1 framwork hoàn chỉnh từ render đến routing và làm được thêm nhều thứ khác mà không cần đến các 3st party.

Mà vấn đề quản lý `memory` ở javascript thì framework nào cũng vậy, không nắm được rõ cái mình đang làm thì `best framework` cũng `out of memory` thôi. `Webpack` là 1 ví dụ, chạy `build build run run` một hồi lâu là out of memory liền.

Quay lại vấn đề thiết kế, từ các thông tin trên chúng ta có thể **đúc kết lại như này:**

- `React` và `Vue` đều dùng **`VDOM`**. **Lưu ý** dù đều dùng VDOM nhưng 2 fw này lại có cách implement khác nhau nhé. React là `setState` còn Vue là `Object.definedProperty`. Các bác có thể tự tìm hiểu thêm nhóe.
- còn `Angular` thì sử dụng `Change Dectection` và `zone.js` (được implement thành `NgZone` trong Angular)

> https://angular.io/api/core/NgZone <br> 
> https://github.com/angular/zone.js/

## Performance thì sao nhỉ?
Theo như mình tìm hiểu thì bác [`IgorMinar`](https://github.com/IgorMinar) một trong core member của dự án `Angular` sau khi được hỏi là tại sao `Angular` không sử dụng `VDOM`?, cũng như tại sao lại chọn thiết kế như hiện tại thì trả lời đại loại như thế này.

## Igor said
**Um.... ơ hờm... thật khó để so sánh các thiết kế với nhau mấy pa ơi** vì nó giống như bạn ăn tô `bún bò` với tô `phở` vậy, bạn người Bắc có lẽ thích phở hơn, còn nếu bạn là người Trung (miền trung nhé, không phải tung của nhóe) chắc thích bụn bọ huệ hơn. Còn mình mình thích bún bò huệ hơn (kệ cmm -__- => nói tiếp đi anh Igor). Và với lại team chúng tôi vẫn cảm thấy thoải mái với thiết kế này cũng như vẫn thoái mái với hiệu suất thực thi (`runtime performance`) mà chúng tôi mong đợi và chúng tôi cũng đang có những cải tiến để tăng hiệu năng ứng dụng ở các phiên bản tiếp theo...bla bla, nên chọn dùng gì vẫn là **lựa chọn là ở các bạn**.

> Chỗ bún bò vs phở anh `IgorMinar` không cón nói nhé hehe.

Các bạn có thể xem thêm cuộc tranh luận ở đây:
https://github.com/angular/angular/issues/22587

**Bảng so sánh hiệu năng**
![Benchmarks](https://i.imgur.com/r5NU0ey.png)

Xem thêm: https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html

## Tổng kết

Từ bản so sánh hiệu năng ở trên thì ít nhiều chúng ta có thể thấy thì 3 anh này tốc độ cũng same same nhau thôi ah. Nên không thể nói thiết kế nào tốt hơn thiết kế nào cạ. Tùy sở thích mỗi người và dự án yêu cầu thì chơi thôi nhể.

- React, Vue thì `VDOM`
- Angular thì `change detection`

# Vậy `Change Detection` trong Angular là gì? Và tại sao lại cần `zone.js`

Xét đoạn code dưới này nè:
``` js
// <div id="content"></div>
const content = document.getElementById('div#content');
updateText = function () {
    input.innerHTML = text + ": " + Date.now();
}
let text = "Hello";
updateText();
```

Sau khi chạy thì cái cái `div` kia sẽ có giá trị là: `Hello: 1526665390423`. Hàm `updateText` đã update lại text cho input đó. Ok nothing.

Thêm tiếp đoạn này nựa:
``` js
const btn = document.getElementById('btn1');
btn.addEventListener('click', () => {
    text = "Aquanicap";
})
```

Quá rõ ràng là sau khi click button xong thì **chả có cái méo gì xảy ra cả**. Giỏ giàng quá rồi, object đúng là được cập nhật nhưng html của div **thì không biết điều đóa**. Đáng là phải như này mới đúng chớ.

``` js
const btn = document.getElementById('btn1');
btn.addEventListener('click', () => {
    text = "Aquanicap";
    updateText();
})
```

**Đúng !!** bạn đoán y chóc, hàm `updateText` đó chính là mô phỏng cho việc `change detection` trong `Angular`. Và tụi Mẽo gọi đó là `monkey patch` hay là `open heart surgery` gì đó.

Mọe kiếp khó nhớ kinh. Kiu mình search từ khóa `monkey patch` rồi đọc mớ giải thích chắc cũng méo hiểu nó nói gì và chắc lại nghĩ chết mẹ cái gì mà lại cao siêu vậy rồi lại hành hạ, chì chiết bản thân nựa ??? 

Nhưng hông lẽ **Angular implement đơn giản như quại sao?** 

Để trả lời câu hỏi này, chúng ta nên suy nghĩ một chút là **thật sự các sự thay đổi** ở view được thay đổi ở **những trường hợp** nào? Tổng kết nó chỉ nằm trong **3** trường hợp nài:

1. **Events** - User events like click, change, input, submit,...
2. **XMLHttpRequests/fetch** - E.g. when fetching data from a remote service
3. **Timers** - setTimeout(), setInterval()...

Thẩm một chút chúng ta có thể nhận ra: **AH, đang mệt, tụi này nó có gì gì đó chung chung phải không ta?**, chết mẹ đúng rồi đó là **tụi nó toàn là `ASYNCCHRONOUS`** (móa phát hiện vĩ đại quá ha -__-)

Có thể mổ phỏng lại trong `Angular` như nầy nè:
``` js
const btn = document.getElementById('btn1');
btn.addEventListener('click', () => {
    text = "Aquanicap";
    runAngularsChangeDetection(); 
})
```

## Vậy làm cách nào Angular `detect` được khi nào `update lại data và view` trong 3 cái actions này?

Quay lại một chút về thiết kế của Angular một chút để ứng với mỗi action Angular cung cấp các công cụ gì:

1. **Events**: Angular support `(click)`, `(change)`, `(keyup)`...
2. **XMLHttpRequests** : Chính là module `Http` và sau này là `HttpClient`
3. **Timers**: Các hàm từ `rxjs`... cũng như `setTimeout interval` của native.

Thì như trên đa phần các action này đều được Angular wrap bởi khuôn khổ framework của mình, nghĩa là sự kiện `click` không chỉ còn mỗi việc là gọi lại cái `callback` của chúng ta rồi làm mỗi cái việc của chúng ta trong đó.

Mà bản chất là nó sẽ làm thêm những việc như gọi `change detection`, `updade view`, update `life cycle`... sau khi hàm `callback` của chúng ta run xong, nói chung là kiểu kiểu vậy. Người ta (tụi Mẽo) gọi đó là: đang mệt, `monkey patch` hay là `phẩu thuật tim hở` gì gì đó... -__-

**>>> Và để làm cái việc trời đánh này, Angular đã sử dụng thư viện và nó được gọi là `zone.js`**

# Vậy `zone.js` là cái méo gì?

Homepage: https://github.com/angular/zone.js/

**A Zone is an execution context that persists across async tasks. You can think of it as thread-local storage for JavaScript VMs.**

Hiểu nôm na nó sẽ tạo ra một vùng context để thực hiện các thao tác bất đồng bộ (async). Nghĩa là bây giờ các thao tác async sẽ được **chạy trên một vùng** mà chúng ta có thể **quản lý, sờ nắn và tác động được**.

Ví dụ một đoạn code sau:
```js
function bar() {
    console.log('bar')
}
function foo() {
    console.log('foo')
}
function baz() {
    console.log('baz')
}
```

```js
var start,
    time = 0;
    timer = Date.now;

start = timer();
foo();
bar();
baz();
time = timer() - start;

// log time in ms
console.log(Math.floor(time*100) / 100 + 'ms');
```

Sau khi chạy thì chúng ta có thể detect được thời gian mà 3 functions thực thi. Nhưng rõ ràng là không có gì đặc biệt hết, bây giờ chúng ta xét đoạn code khác dưới này, chúng ta update lại `function baz` với `setTimeout()`: 
```js
function bar() ...
function foo() ...
// Update lại function baz với timeout
function baz() {
    setTimeout(() => {
        console.log('baz')
    }, 1000)
}
```
Chạy lại đoạn code đo thời gian thực thi bên trên, nó sẽ tốn hơn một xíu thời gian so với đoạn code `sync` ở trên, nhưng rõ ràng là thời gian thực thi này không thể hiện đúng những gì chúng ta đang chạy vì hàm `setTimeout()` sẽ là một `tác vụ không đồng bộ` được trình duyệt thêm vào **event queue** sau đó cuối cùng sẽ được **event loop** xử lý khi hết thời gian chờ `1000 ms`.

**Vậy làm cách nào để giải quyết vấn đề với các tác vụ bất đồng bộ?** Do đó cái chúng ta cần là làm một cách nào đó `hook` để **cho phép chúng ta biết khi nào** mà một tác vụ không bộ **xảy ra.** 

Suy nghĩ đơn giản một chút là chúng ta sẽ thêm thủ công các hàm đo đếm trong từng hàm `async`, **nhưng ai mà đi làm vậy?** thật là lộn xộn, cứ phải thêm trong mỗi cuối hàm `async`.

<strong style="color:red" >ĐÂY CHÍNH LÀ NƠI MÀ ZONE RA ĐỜI ĐỂ GIẢI QUYẾT</strong>. 

Xem đoạn code dưới đây, nhưng bạn có thể tham khảo thêm tài liệu của [Zone API homepage](https://github.com/angular/zone.js/blob/master/dist/zone.js.d.ts) để biết thêm chi tiết. Mình sẽ không đề cập chi tiết ở đây. 
```js
function bar() { console.log('bar') };
function foo() { console.log('foo') };
function baz() {
    setTimeout(() => {
        console.log('baz')
    }, 1000)
}
function bazz() {
    setTimeout(() => {
        console.log('bazz')
    }, 1000)
}

// Wrap các hàm lại nằm trong hàm main
function main() {
    bar();
    foo();
    baz();
    bazz();
}

const rootZone = Zone.current;
const zoneA = rootZone.fork({
    name: 'zoneA',
    onInvokeTask: function (parentZoneDelegate, currentZone, targetZone, task) {
        console.log('Run async') // Run trước khi hàm được gọi
        task.callback(); // Original method đc gọi ở đây
        //... run sau khi hàm được gọi
    }
})

zoneA.run(main);
```
Kết quả sau khi chạy các hàm trong `Zone`:

![Zonejs](https://i.imgur.com/61ZrE3G.png)

Chắc qua ví dụ trên chúng ta ít nhiều hiểu sơ sơ thằng zone làm cái gì rồi phải hôn? Đại loại các `async methods` sẽ được thằng `Zone` ôm lại hết vào lòng để quản lý và sau đóa cung cấp cho chúng ta các methods để **làm cái gì đó chúng ta muốn ahihi** trước sau những async method đó. Các bác thể gọi là thằng zone là **Zone tú bà**.

## Zone hữu dụng khi nào và `why` lại dùng nó?

1. Zones are useful for debugging, testing, profiling.
2. Zones are useful for frameworks to know when to render.
3. Zones are useful for tracking resources which persist across async operations and can automatically release/cleanup the resources. 
4. Zones are composable

Sau khi google dịch 4 cái câu trên, em rút ra được một điểm chung đó là...... 4 cầu này đều là thì hiện tại đơn thì phải, và cái quan trọng nhất khi được google dịch dùm câu này<br>
`Zones are useful for frameworks to know when to render.` => <br>
`Các khu vực rất hữu ích cho các khung công tác để biết thời điểm hiển thị.` -__- dù hơi hơi là khó hiểu một chút nhưng... **đúng gòi, chính xác**, đây chính là cái `Angular` cần và cũng đang sử dụng cho thiết kế của mình. Nó giúp framework biết khi nào `async funtions` thực thi xong để gọi các hàm `re-render` view cũng như gọi các hàm trong `life cycle` của bản thăn nó.

**=> Angular đang xài combo `Change Detection` + `Zone.js`** 

# Cuối cùng Zone.js hoạt động trong Angular như thế nào?

Sau những hà hồ sa số giải thích ở trên thì các bạn cũng nhận ra là `Angular` đang sử dụng `Zone.js` để hỗ trợ cho việc update lại state của application và render lại view của ứng dụng. 

Thì trong một ứng dụng Angular, Angular sẽ tạo ra một vùng zone được fork từ rootZone (thường là zone của window ở browser) và sẽ tự thân quản lý nó có thể được gọi là `AngularZone`. Thì những `actions, events...` mà hoạt động dưới **các thao tác bất đồng bộ** sẽ được Angular quản lý và xử lý các thay đổi này. Từ đó update lại tầng view cho ứng dụng.

Angular không sử dụng library `zone.js` native mà sẽ wrap nó trên một class gọi là **`NgZone`**, thì nó sẽ cung cấp các `state` để chúng tracking, cũng như là chúng ta cũng có thể chạy **bất cứ một hàm nào nằm ngoài vùng kiểm soát** của `Angular Zone`.

Chẳng hạn như là khi chúng ta sử dụng chức năng `scroll` trong browser chẳng hạn, `scroll` sinh ra và call liên tục các sự kiện, rõ ràng nó sẽ khiến vấn đề performance có trục trặc. Nhưng mà nó lại là một vấn đề khác nữa và nếu cơ hội mình sẽ làm một khác về vấn đề performance của `Angular`. Bài viết cũng khá là dài dài rồi nên chắc mình phải kết thúc tại đây thôy.

Chi tiết class NgZone của Angular:<br>
https://angular.io/api/core/NgZone

```ts
class NgZone {
  static isInAngularZone(): boolean
  static assertInAngularZone(): void
  static assertNotInAngularZone(): void
  constructor(__0)
  get hasPendingMicrotasks: boolean
  get hasPendingMacrotasks: boolean
  get isStable: boolean
  get onUnstable: EventEmitter<any>
  get onMicrotaskEmpty: EventEmitter<any>
  get onStable: EventEmitter<any>
  get onError: EventEmitter<any>
  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T
  runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T
  runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T
  runOutsideAngular<T>(fn: (...args: any[]) => T): T
}
```

# Túm lại cái váy bài này đê

Sau bài này mình rút ra được vài điều như này mà mình thấy:

1. React, Vue xài `VDOM`, Angular xài `change detection`.
2. Hiệu suất 3 frameworks là khá tương đồng nhau, không thể nói thiết kế nào tốt hơn thiết kế nào.
3. Sử dụng framework là do sở thích và là cái diên.
4. Tất cả các hoạt động thay đổi đều thuộc về các thao tác bất đồng bộ.
5. Angular sử dụng `zone.js` để hỗ trợ việc `change detection`.

Thanks các bác đã đọc đến tận đây nhóe !!!

# Tham khảo

1. https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html
2. https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html
3. https://github.com/angular/zone.js/
4. https://github.com/angular/angular/issues/22587

























