---
title: Javascript deep (ep1) - Event loop trong js compiler và cái setTimeout quái quỉ
date: 2017-03-01 10:00:00
tags:
    - javascript
---

<!-- ![cover](https://i.imgur.com/YsYksJC.png) -->
# Hoàn cảnh

Bạn đã bao giờ tự hỏi tại sao `setTimeout(()=>{console.log(123)}, 0);` được nhiều library sử dụng đến như thế? Nó là 1 kỹ thuật hay là 1 trick? Và tại sao `timeout chỉ = 0` nhưng nó luôn luôn là đứa chạy cuối cùng vậy, `0 giây` hiểu một cách phẳng não nhất chính là ngay tức thời cmn mà 😐. Bài này xuất phát từ câu hỏi của một thằng bạn chả biết làm javascript lâu chưa mà đi hỏi:

<!-- more -->

`Ủa? sao timeout = 0 mà lại ra sau zạ ta?`😨

Hy vọng sau bài này các bạn chưa biết về `js compiler` và thằng hỏi câu trên sẽ ít nhiều hiểu được tại sao lại như vậy? 😘 Hồi trước mình cũng hông biết, nên đi tìm hiểu sau biết được chút thì chia sẽ cho các bạn chưa biết 😎

Đầu tiên chúng ta đi vào một ví dụ cụ thể.

```` ts
console.log(123);

setTimeout(()=>console.log(456), 0);

console.log(789);
````

Theo bạn output của đoạn code trên là gì?

Trong đầu mình nghĩ sẽ có 3 loại câu trả lời như này:

**Bạn A (beginer)**: Ờ! setTimeout = 0 mà đương nhiên `123 456 789` thôi hà.

**Bạn B (ko biết gọi là gì? 🤔)**: Chời quơi! Mịa bố biết tỏng !!! Là thế này nhé trước `123` nhé, sau nó là `789` rồi cuối là `456` nhóóé! Đúng chưa? 😏 

**Bạn C (javascript ninja)** : *Thầm nói: Buồn cười thiệt !!!* Ngoài nói: Hông biết má ơi! Ra gì vậy? Giải thích dùm cái coi.🙅

**Trả lời:** Ờ ờ thằng B đúng rồi đó! Giỏi ak? Mà tại sao lại như thế? `timeout có = 0` í mà ??? 

**Bạn B**: Ờ thì `setTimeout` default nó delay theo cái số mài đưa zô ak, ví dụ 10 100 1000 gì đó, nhớ là tính theo mili giây nha mài, lấy 1000/1000 => là ra 1s. Nhớ nha! 😪 Còn mài để số 0 là thiệt sự nó cũng delay chút xíu xíu ak nên nó mới ra sau cái thằng `789` kia. Zậy ak hiểu hông? 😅   

**Tui**: Ờ ờ hiểu. Zậy tại sao tao chạy đoạn code này thấy nó log ra 10.000 lần cũng lâu (browser giật giật) mà sao thằng `456` nó cứ cố chui zô cuối zậy ta?

```` ts
console.log(123);

setTimeout(()=>console.log(456), 0);

for (var i = 0; i < 10000; i++) {
    console.log(i);
}
````

`-> Kết quả:`
![result](https://i.imgur.com/gdC8nfP.png)

**B**: Ờ ờ ờ kì zậy ta, móa kì thiệt 😳😳😳😳😳 Hông biết ba 😂😂😂. zaza_cript tào lao thiệt 😂😂😂.

Qua câu chuyện đối thoại tào lao này. Các bạn cũng có thể thấy, dù là trước hàm `setTimeout` chỉ là một hàm `console.log()` hay một vòng `for 10 lần` hay cả ngàn cả triệu lần đi nữa thì `setTimeout(()=>console.log(456), 0);` luôn luôn nằm dưới cùng. **Vậy lý do là do đâu?** 🤔🤔

Điều đâu tiên chúng ta quay ngược lại tìm hiểu bản chất của `javascript`. Có thể có bạn biết hoặc không, thì... `javascript` hoạt động trên cơ chế `đơn luồng (single-threaded)`. Điều đó có nghĩa **là trên lý thuyết** tất cả mọi thứ xử lý trên javascript đều phải là tuần tự `a xong -> b, b xong -> c, c xong -> d,...` 

Vậy những khái niệm `bất đồng bộ (asynchronous)` trong javascript là như thế nào? Vậy cơ chế giải quyết bất đồng bộ của javascript là như thế nào? 

Chúng ta đi đến phần ví dụ để xem javascript đã giải quyết như thế nào nhé !!!

# Ví dụ
Chúng ta cùng xem đoạn code sau nhé. (nó sẽ bao gồm và giải thích luôn đoạn code đầu mà chúng ta đưa ra)

```` ts
$.on('#btn_lay_data_tren_api','click',()=>{
    setTimeout(()=>{
        console.log('moi lay data xong');
    },1000);
});

console.log('xin chao');

setTimeout(()=>{
    console.log('bam zo cai nut de lay data nhen');
},3000);

console.log(`den voi jinhduong blog`);
````

Đoạn code của chúng ta sẽ chia ra thành `4 khối`:

- (1). Sự kiện click => tốn 1(s) => data đổ về (lấy setTimeout làm ví dụ)
- (2). Log câu `xin chào`
- (3). Log câu hướng dẫn vô nghĩa sau 3(s) `bấm nút để get data`
- (4). Log `đến với blog của tui`

Cùng `4 thành phần` quan trọng của `javacript`

- **Call Stack** : Ngăn xếp (chứa các khối lệnh sẽ chạy)
- **Callback Queue** : Hàng đợi (chứa các khối lệnh sau khi đã hoàn thành việc gì đó - call api, setTimeout, promise,...)
- **Event listener/ Web apis** : Sẽ chứa các event listener như click, change, hover,... và các web apis được browser hỗ trợ khác.
- **Event loop** : Quay đều và sẽ gọi những khối lệnh hiện có trong queue

Search google thì cũng có nhiều hình ảnh minh họa nhưng mình quyết định vẽ tay cho nó dễ hiểu hơn ... chắc zậy 😄 
![img](https://i.imgur.com/IV2XArV.jpg)

# Giải thích

- Chung ta sẽ chạy từ trên xuống từ khối lệnh `thứ 1 -> 4`.
- Nhìn vào `khối đỏ` ta thấy khối code này sẽ nằm trong danh sách `event listener/ web apis` và sẽ `lắng nghe (listen)` các sự kiện khi cái button `#btn_lay_data_tren_api` bị click zô. 😄
- `Khối xanh lá` không có gì đặc biệt nó sẽ log ra màn hình `xin chao`.
- `Khối xanh dương` sẽ được đưa vào `listener/apis` 
    - Sau khi xong (3s) thì lệnh `console.log("bam zo cai nut de lay data nhen")` sẽ được đưa xuống `callback queue`.
    - `Event loop` y như 1 bác bảo vệ, cứ hở 0.01s liếc mắt coi có ai tới tiệm hok? Nếu có bác dẫn xe dùm rồi kiu zô quán đi con. (event loop đẩy khối lệnh `console.log("bam zo cai nut de lay data nhen")` lên `call stack`) 
    - `Call stack` khi nhận đc khối lệnh này sẽ run nó liền.
    - **Suy ra:** 🤗 Ít nhất **>=3s** sau câu log này mới đc show lên. Vì nếu 3(s) đã trôi qua mà trên `stack` vẫn còn các khối lệnh đang chờ run thì nó **phải đợi đến lượt nó** thì nó mới được run.
    - **Nhân hóa**: Mịa máy đứa từ dưới chỗ `callback queue`(miền quê xa xui hẻo lánh) lên đây. Đợi mấy anh đường đường nằm thẳng trong diện `call stack` run trước đã nha hôn. 😹
- `Khối lệnh cuối` chả có gì đặt sắc. Đơn giản là log ra thôi. Nó là nền cho cái khối thứ 3 thể hiện.
- Khi chúng click vào button `#btn_lay_data_tren_api`
    - Đưa khối lệnh `setTimeout` qua bên `listener/ apis` 
    - Đợi 1(s) xong đưa cái function `()=>{console.log('moi lay data xong')}` xuống `callback queue`
    - Đưa lên `call stack` và sau đó run -> show data lên console.

**Done,** có lẽ đến dây các bạn đã ít nhiều hiểu được cách mà javascript giải quyết vấn đề bất đồng bộ với single-threaded. Cũng như cách `setTimeout` hoạt động. Và nó tương tự với các khái niệm về callback như `Interval`, `Promise` và các `funtion callback`.

# Cuối cùng

Với các giải thích trên chắc chắn bài toán đưa ra đâu bài chắc chắn không khó để giải thích. Và có vài điều chúng ta rút ra với callback ở javascript

> Các `callback function` đặc biệt là `setTimeout`, `setInterval` sẽ có time ít nhất >= time mà nó được define ra.

> Các `callback funttion` sẽ được gọi sau khi các function khác được excute xong trên `call stack list`

> Flow nó sẽ di từ `call stack`-> run hoặc là đưa qua `event listener/ web apis` -> `callback queue`. `Event loop` sẽ gọi các function nếu có ở `callback queue` -> `call stack` -> run.

Cuối cùng một cái hình cho mọi người dễ hình dung, mườn tượng.
![muongtuong](https://i.imgur.com/knNxvSS.png)

**Hy vọng bài biết giúp ích cho cách bạn khi làm việc với ngôn ngữ này.** Có gì sai hay thắc mắc các bạn cứ gớp ý phía dưới nhé. 😉😉😉😉😉

Đọc thêm các bài viết ở blog mình: [https://jinhduong.github.io](https://jinhduong.github.io)

# Tham khảo

- [http://latentflip.com/loupe](http://latentflip.com/loupe)
- [http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/](http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/)