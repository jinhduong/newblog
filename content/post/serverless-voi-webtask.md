---
title: "Serverless đơn giản với Webtask"
date: 2018-05-28T22:48:30+08:00
tasg:
-   webtask
-   serverless
---

![webtask](https://i.imgur.com/B2nqSOt.png)

# Lý do

Blog mình hiện tại có chức năng là hiển thị một `dev quotes` random khi đọc một bài bất kì. Nhìn lên top của bài này chắc là bạn sẽ thấy 😅

Lý do là lúc trước chỉ mỗi chức năng nhỏ xíu này nhưng mình lại host nó trên tài khoản `heroku` của mềnh và tình trạng xảy ra là `free dyno hours` của account bị vượt mức (`heroku` cho free 1000 hours 1 tháng). Một phần vì hiện tại mình host khá nhiều side project trên này nên dù blog mếu có người đọc nhưng cũng tốn `~280 hours` một tháng nên mình quyết định thôi move qua 1 services free đơn giản khác. 
Sau một hồi si nghĩ tính dùng `AWS Lamda` mà thấy thôi hơi bự để làm cái này nên mình chuyển qua dùng [Webtask](https://webtask.io)

![free dyno hours](https://i.imgur.com/epLoDam.png)

# Webtask là gì?

Đơn giản nó là một service cung cấp một `serverless endpoints`. Nếu các bạn chưa biết `serverless` là gì thì có thể xem bài [serverless này trên blog toidicodedao](https://toidicodedao.com/tag/serverless-architecture/).

# Implement

Follow theo docs trên trang chủ thôi, chú ý là `webtask` sử dụng `nodejs` nhé.

## Đầu tiên bạn cần login vào webtask 

## Sau khi đăng nhập thành công, install theo docs thôi

``` bash
npm install wt-cli -g
wt init <your-email>
``` 

## Di chuyển tới folder bất kí và tạo file `index.js`

```bash
mkdir wt-demo
cd wt-demo
touch index.js
```

`webtask` sử dụng `module.export` của `nodejs` nhé. Implement cái hàm lấy random quotes của mềnh nhé.

```js
module.exports = function (cb) {
    cb(null, rdQuote());
}

function rdQuote() {
    const quotes = data();
    const num = Math.floor(Math.random() * Math.floor(quotes.length - 1));
    return quotes[num];
}

function data() {
    return []; // here is json data
}
```

## Publish function

```bash
wt create index.js

Webtask created

You can access your webtask at the following url:

https://wt-021b7f362991cec68dd62033c2455e46-0.sandbox.auth0-extend.com/index
```

Xong rồi, giờ bạn có thể test với url mới được `webtask` cung cấp.

![test](https://i.imgur.com/pRVdMPS.png)

Bạn nào muốn lấy các `developer quotes` thì có thể dùng nhé welcomed 😅.

Thanks for watching.




