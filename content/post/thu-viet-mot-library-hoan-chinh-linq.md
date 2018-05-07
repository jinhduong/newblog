---
title: Viết một thư viện bằng javascript giống LINQ như thế nào?
tags:
  - typescript
  - javascript
  - linq
author: Dinh Duong
excerpt: true
date: 2018-05-03 10:55:29
---


<!-- ![linq-fns](https://i.imgur.com/paTlz8I.png) -->

Dạo gần đây mình có viết một thư viện bằng `Typescript` để mô phỏng lại `linq` bên `.NET` mình viết những khi có thời gian rảnh. Thì nếu bạn nào không làm nhiều về .NET cũng như không biết về linq thì các bạn có thể tham khảo ở đây [https://msdn.microsoft.com/en-us/library/bb308959.aspx](https://msdn.microsoft.com/en-us/library/bb308959.aspx).

<!-- more -->

Thật sự tới hiện tại nó chỉ tương đối là đủ dùng, với bản thân mình thì cảm thấy chưa thật ưng ý lắm vì còn nhiều vấn đề cần phải giải quyết nữa để nó trở nên tốt hơn. Nên do đó hiện tại nó chỉ là bản -`alpha` 😂.

Bạn nào quan tâm thì vào xem, còn không star thì tốt hơn nhé: [https://github.com/jinhduong/linq-fns](https://github.com/jinhduong/linq-fns).
> Sử dụng cái tên `linq-fns` một phần vì mấy cái đại loại như `eslinq`, `jslinq`, `linqjs`... bị lấy trên npmjs hết rồi. Nên ăn cắp ý tưởng của [date-fns](https://date-fns.org/). Ít nhất search nó nhanh ra. 😂

# Tại sao lại viết?

Cùng câu hỏi, tại sao lại viết khi javascript cung cấp tương đối đầy đủ những hàm để chúng ta làm việc tương tự như `linq`? Cũng có một vài thư viện (dù là ít) tương tự và đã được implement tương đối tốt?
1. Mình thích thì mình viết thôi (ăn cắp từ Sơn Tùng MPT 😆), nói chứ do là các thư viện hiện tại không đáp ứng những nhu cầu mà mình muốn hoặc các chức năng mình cần.

2. `javascript` cũng cấp khá đầy đủ để làm việc với `Array` nhưng khiến code khá là dài dòng với không đẹp nữa, nếu làm những công việc như group, join,...

3. Sử dụng `Typescript` để hỗ trợ tốt hơn cho vấn đề `strong typing`. 

4. Hỗ trợ để integrate với các small stores như `real firebase database`, `localStogare` cho browser, `gist github file `,...

5. Dạo này đang lười làm quá, nên muốn làm gì đó cho nó động lực lại 😅

# Các thứ rút ra được sau khi viết? 

(*Thật ra tới hiện tại với mình nó chỉ đủ xài chứ bản thân mình chưa thật sự ưng ý lắm 👊*).

1. Hỗ trợ luôn cả `Array` thông thường và `Promise` sẽ khiến kiến trúc bị rối, do đó nên xác định được mục tiêu từ ban đầu. Ban đầu chỉ nghĩ sơ về `Array` thôi nên sau đó phát sinh thêm `Promise` mình sữa lại nhiều.

2. Vài thứ hay ho trong `Typescrtip`. Ví dụ như: `OOP`, định nghĩa kiểu dữ liệu, kiểu `any`,...
    > Có khá nhiều suggestion nói Typescript nên bỏ từ khóa `any` này để nó thật sự chặt chẽ hơn nữa, vì nó khiến các developer vẫn có đường binh khi vào thế bí 😄. Mình thật sự không khuyến khích dùng `any` nhiều trong Typescript, hạn chế nó ít nhất có thể, tốt cho chúng ta và cũng tốt cho đồng nghiệp thân iu của chúng ta. Nhưng thật sự có những lúc chúng ta buộc phải xài nó. **Sao mình lại nói vậy?** vì vấn đề tương thích với các thư viện javascript cũ, vì nhiều khi chúng ta control được dữ liệu trả về nhưng không thể convert chúng qua kiểu mình mong muốn, hoặc kiểu dữ liệu trả về của chúng ta nằm trong nhiều loại dữ liệu. Tham khảo các thư viện lớn như là `rxjs` mình thấy họ xài khá là nhiều `any` luôn, vấn đề là `interface` trả về đúng kiểu dữ liệu ng dùng cần là được.
    
3. `Webpack` tốt nhưng nếu build 1 library cho `browser` không nên sử dụng nó. Webpack tạo ra khá nhiều hàm đi kèm để làm việc với `module` như là: load, cache, exports, esmodule difine,... khiến cho thư viện bị to lên. `Parcel` cũng tương tự Webpack. Do đó Nên sử dụng `Rollup` làm thay việc đó. 
    > `Rollup` viết và chạy bằng `ES6` do đó cần translate Typescript sang ES6 mới chạy được.

4. Suy nghĩ về Tree-shaking trong `Webpack`, `Parcel` hoặc các thư viện tương tự. Hiện tại mình vẫn viết theo kiểu `OOP` mặc dù mỗi chứng năng đều là một class riêng, nhưng vẫn cần một class lớn để khai báo và gọi tới các class chứng năng => class này khá to => khi bundle lại nó sẽ không phải là lý tưởng nhất.
    > Ví dụ: `Q.from(a).where(b).select(c)` trong đây chỉ có 3 functions là `from`, `where`, `select` thì tốt nhất chỉ làm việc và bundle 3 hàm đó lại thôi không nên liên quan đến các hàm khác. `rxjs` là một ví dụ.
    Dù hiện tại không là bao nhiêu nhưng hỗ trợ được `tree shaking` vẫn là tốt hơn. `lodash` khá nặng, nếu bản chỉ xài 1 vài hàm mà cần import cả library thì thật phí phải ko nào?

5. `Typescrtip` khi build ra `ES5` cần khá nhiều hàm phụ trợ (helpers) như là: `__extends`, `__assign`, `__decorate`,... cũng khiến dung lượng library tăng lên tương đối, với `Node` thì không sao, dung lượng chỉ worry thật sự với browser.
    > [https://github.com/Microsoft/tslib](https://github.com/Microsoft/tslib) Nếu muốn build ra browser library thì bạn cần thư viện này của $MS.
    > [https://github.com/Microsoft/tslib/blob/master/tslib.js](tslib.js) khá hay cho những bạn muốn xem Typescript implement các hàm helpers này.

6. Để viết một gì đó đủ tốt thật sự (đối với bản thân mình) là một việc khá là tốn thời gian. Nên đừng ngừng lại star cho họ một phát để làm động lực nhóe. 👍🏼

7. Dù như thế nào nữa, viết một gì đó cũng đem lại ít nhiều value cho bản thân chúng ta, chúng ta học được nhiều thứ hơn, phải giải quyết nhiều vấn đề hơn là khi chúng ta chỉ dự tính trong đầu. Cuối cùng dù như thế nào hãy tự tin **viết những gì mình thích**, giống như ca sĩ vậy, **ngại ngùng cm gì?** hãy hát những gì mình thích, dù thật sự chúng ta có giọng hát thật hay, hay là không? Ít nhất hát nhiều vẫn khiến chúng ta **một ngày càng hát hay hơn**. (drama quá ông nội 🐸)

Bài thì ngắn chữ thì nhiều nên cảm thấy hơi dài dài rồi. Lần sau sẽ nói về vấn đề kĩ thuật nhóe.

Thanks for reading.📗