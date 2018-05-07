---
title: TypeScript thoáng qua
tags:
  - typescript
  - javascript
author: Dinh Duong
excerpt: true
date: 2018-04-22 22:49:24
---


<!-- ![typescript-homepage (Source: (https://www.typescriptlang.org)](https://i.imgur.com/TrmRvfu.png) -->

Khi mình viết bài này rõ ràng thì `TypeScript` không còn là một thư viện đang nổi lên nữa. mà nó đã là thư viện đứng đầu về `strong typing` cho `JavaScript`. Hiện giờ nó và `Flow` của Facebook là 2 thư viện nổi tiếng nhất về strong typing cho Javascript. Nhưng có lẽ Microsoft với kinh nghiệm cùng ngôn ngữ 'C#',cái ngôn ngữ mà với mình nó là một ngôn ngữ **đẹp, mạnh mẽ và khá chặt chẽ** đã đem lại thành công cho `TypeScript`. Hiện nay rất nhiều thư viện đã và đang được viết mới hoặc viết lại bằng `TypeScript` như `Angular`, `Vue 3`, `Aurelia`...

<!--more-->

Mặc dù `Javascript` là một ecosystem thay đổi chóng mặt, các chuẩn thay đổi liên tục, sóng sau sô sóng trước, cộng đồng hoạt động rất sôi nổi, rất nhiều `concept` được liên tục đưa ra, cũng như rất nhiều thư viên hỗ trợ cho nó nhưng tương lai là của nó vẫn là **bất định** 😅, thật sự tiếp cận và làm việc với `Javascript` khá là hứng thú cũng như *tương đối* là dễ dàng, nhưng cũng đã có những dự án đi xa được với nó, cũng có những anh tài đã dừng lại khi project thực sự trở nên quá lớn (nguồn: đọc tùm tà la bài của người ta). Có nghĩa dạo đầu thì dễ, còn sau sau thì khá là khó 😅

Nhưng có lẽ với `TypeSript` thì Javascript ít nhất cũng đã **tốt hơn** khá khá **là** nhiều.

Nhưng `TypeScript` cuối cùng cũng chỉ là một thư viện superset của `Javascript` nên bài này sẽ điểm qua các syntax của `TypeScript` cũng như giải thích đơn giản đi kèm theo kinh nghiệm của bản thân mình.

Các bạn có thể tham khảo chi tiết thêm từ trang chủ của TypeScript: https://www.typescriptlang.org/docs/home.html

# Cài đặt
```ts
npm install -g typescript
tsc index.ts // Chạy file typescript
```

Các bạn có thể xem thêm về `tsconfig.json`: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html 

# Syntax

## Kiểu dữ liệu
```js
let isDone: boolean = false;
```
> Các loại dữ liệu cơ bản được support trong `Typescript` là `number`, `string`, `Date`, `boolean`, ngoài ra còn các loại ít được xài hơn như là `null`, `undefined`...

Tham khảo: https://www.typescriptlang.org/docs/handbook/basic-types.html

## Khai báo biến
Tương tự như `javascript` nhưng kèm theo kiểu dữ liệu. Cũng như `ES6` Typescript suggest sử dụng `let` và `const` để khai báo, và quên đi kiểu `var` huyền thoại 😅

Tham khảo: https://www.typescriptlang.org/docs/handbook/variable-declarations.html

## **Interface**
Có lẽ đây là phần mình sẽ **nói nhiều nhất**, vì slogan của Typescript là **Typescript - Javacript that scale** 🤗

Khá tương tự như trong **C#** và **Java**
```ts
export interface IAnimal {
    sound(): string; // Tiếng nói
    go(): string;// Tiếng đi
    name: string;
}
```

```ts
export class Dog implements IAnimal {
    name: string;
    sound(){
        return "Gau gau"; // Chó sủa gâu gâu
    }
    go() {
        return "Kit kit";
    }
    constructor(name: string){
        this.name = name;
    }
}
```

```ts
export class Horse implements IAnimal {
    name: string;
    sound(){
        return "Hihi"; // Ngựa hí hí hí      
    }
    go(){
        return "Kaloc kaloc";
    }
    constructor(name: string){
        this.name = name;
    }
}
```
Source `javascript` sau khi compiler: 

```js
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.sound = function () {
        return "Gau gau"; // Chó sủa gâu gâu
    };
    Dog.prototype.go = function () {
        return "Kit kit";
    };
    return Dog;
}());
var Horse = /** @class */ (function () {
    function Horse(name) {
        this.name = name;
    }
    Horse.prototype.sound = function () {
        return "Hihi"; // Ngựa hí hí hí      
    };
    Horse.prototype.go = function () {
        return "Kaloc kaloc";
    };
    return Horse;
}());
```

💯 Điểm cộng thứ nhất rõ ràng là với typescript code của chúng ta **đẹp đẽ và dễ đọc hơn rất nhiều**.

Chúng ta cũng có thể vừa `implements` từ **1 hoặc nhiều interface** và `extends` từ 1 class khác

```ts
export interface IHouseAnimal {
    isGuardHouse(): boolean;
}
```
```ts
class Chihuahua extends Dog implements IAnimal, IHouseAnimal {
    isGuardHouse() {
        return false; // Không thể canh nhà 😗
    }
    sound() {
        return "Goeo goeo";
    }
} 
```
> Với `extends` chúng ta có thể **sử dụng hoặc thay thế** các hàm đã được implement bởi lớp cha, và do lớp `IAnimal` đã được implements đầy đủ phương thức ở lớp cha, nên `Typescript` chỉ warning là cần khai bao hàm `isGuardHouse()` ở lớp `IHouseAnimal`.
![Thông báo lỗi của typescript](https://i.imgur.com/MtrJXQ6.png)


### **Generic** trong interface
Có 2 thấy mình thấy tâm đắc nhất khi sử dụng `Typescript` đó là ngoài vấn đề code **đẹp, dễ đọc, dễ bảo trì** thì đó chính là kiểu `Generic`, một kiểu khá nổi tiếng bên ngôn ngữ **C#** được Microsoft đem qua `Typescript`, nó đem lại một ngôn ngữ hoàn toàn `typing` để viết code Javascript. Với những dự án lớn và làm việc nhiều team với nhau đây quả là một cải thiện to lớn 🤑.

Ví dụ chúng ta có một interface mà sẽ implements các phương thức của các hàm trong `Iqueryable` trong `.net (C#)`, nếu bạn nào không làm `C#` trước đây thì cứ coi nó nhưng các hàm query data bình thường với một array thông thường.
```ts
interface IQueryable<T> {
    where<T>(iterator: (entity: T) => boolean): IQueryable<T>;
    select<U>(iterator: (entity: T) => U): IQueryable<U>;
    join<S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): IQueryable<{ x: T, y: S }>;
    leftJoin<S, U extends T & S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): IQueryable<U>;
}
```
- `where`: Nhận vào 1 object kiểu T và trả về IQueryable cũng kiểu T
- `select`: Nhận vào 1 object kiểu T nhưng trả về IQueryable với 1 kiểu mới sau khi select là kiểu U
- `join`: Nhận vào 1 mảng data kiểu S và 2 object kiểu T, kiểu S nhưng trả về 1 object có hai thuộc tính mới là x và y, với x là kiểu T và y là kiểu S
- `leftJoin`: Nhận vào 1 mảng data kiểu S và 2 object kiểu T, kiểu S nhưng trả về 1 object có kiểu U có những thuộc tính thuộc cả T lẫn S

Có thể thấy với `Generic` thì Typescript đã đem lại khá nhiều lợi ích cho việc định nghĩa các `kiểu dữ liệu`, `kiểu trả về`,... cho Javascript 😇

### Vài thứ bên lề
Theo gợi ý của `Typescript` thì nên sử dụng `interface` để làm một `type class` thay cho việc sử dụng class thông thường:

#### Type class

```ts
interface LoginModel {
    username: string;
    password: string;
    rememberMe: string;
}

class LoginModelClass{
    username: string;
    password: string;
    remember: string;
}

let model = {} as LoginModel;
let modelClass = {} as LoginModelClass;
```

```js
var LoginModelClass = /** @class */ (function () {
    function LoginModelClass() {
    }
    return LoginModelClass;
}());
var model = {};
var modelClass = {};
}());
```
> Chúng ta thấy class sẽ được biên dịch thành một `function object` còn `interface` thì không. Từ đó nó hạn chế được số lượng source code mà chúng ta sinh ra và từ đó giảm thiểu dung lượng ứng dụng 🤪

Bài viết xin tạm dừng tại đây, vì `Typescript` cũng có khá là nhiều thứ hay ho, nhưng tóm gọn lại nó nằm trong khuôn khổ syntax nên các bạn có thể lên đây tham khảo (https://www.typescriptlang.org/docs/handbook/basic-types.html) thêm những như chi tiết hơn của nó.
![Typescript handbook](https://i.imgur.com/HWRAUUc.png) 

Các bài tới nếu về `Typescript` mình sẽ chia sẽ về những thứ linh tinh, hay ho về `Typescript` chứ không phải là giới thiệu về nó nữa.

Bài viết khá lủng củng 🤢 thanks bạn đã xem nhé.🤝 








