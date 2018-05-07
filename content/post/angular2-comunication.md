---
title:  "Angular2 comunication (Component interaction)"
date:   2017-02-23 01:00:00
tags:   ["angular"]
---
<!-- ![angular2-comunication](http://i.imgur.com/QcGk7LOl.jpg) -->
Hiện tại mình đang làm một dự án về angular2 nên thành ra mình cũng muốn làm một chuỗi bài về angular2 cho những bạn nào đang muốn tìm hiểu về công nghệ này.

<!-- more -->

Biết là bài này có thể sẽ chỉ dành cho những bạn ít nhiều đã làm về angular2 nhưng do hôm nay cũng làm rồi đụng đến nên mình chọn luôn chủ để này để bắt đầu luôn cho nóng :)

Angular2 cũng giống như nhiều javascript framework hiện nay đều áp dụng xu hướng, định hướng web component cho hướng phát triển của họ.

**Vậy web component là gì?**
![web components](https://dzone.com/storage/temp/3117491-web.png)

Đúng như cái nghĩa component (thành phần), chúng ta sẽ tạo ra nhiều components và xếp chúng lại với nhau và tạo thành một ứng dụng ứng dụng hoàn chỉnh. Giống xếp hình y chang chỉ tùy chúng ta thích xếp lần mấy miếng thôi ah hehe<i class="em em-japanese_ogre"></i>.

Do đó cách giao tiếp giữa những components khá quan trọng trong bất kì một framework nào cũng như những ngữ cảnh sử dụng cách giao tiếp ấy.

Các bạn có thể đọc bản hoàn chỉnh của angular2 team cung cấp ở trang chủ [Component interaction](https://angular.io/docs/ts/latest/cookbook/component-communication.html). Còn muốn dễ hiểu hơn thì đọc bài này của mình hehe <i class="em em-girl"></i>

### 1. Pass data từ component cha (parent component) đến component con (child component) thông qua @Input


Ờ cách này chúng ta sẽ define `binding decorator` `@Input` ở child sau đó truyền giá trị đó từ parent

**Child component**

```` ts

import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `
    <p>My boss father name is: {{fatherName}}</p>
  `
})
export class AppChildComponent {
  @Input() fatherName: string;
}

````
**Parent component**

```` ts

import { Component } from '@angular/core';
@Component({
  selector: 'app-parent',
  template: `
    <h2>My son say:</h2>
    <app-child
      [fatherName]="myName">
    </app-child>
  `
})
export class AppParentComponent {
  myName: string = 'Dinh';
}

````

Ở ví dụ trên bạn thấy `thằng cha` sẽ bảo `thằng con` nói tên cha nó thông qua attribute là `fatherName` thông qua `@Input` ở component con.


### 2.Thao tác input đầu vào với setter *(Intercept input property changes with a setter)*

Giống như cách thứ nhất chúng ta cũng dùng `@Input` để đưa giá trị từ component cha tới component con. Nhưng nếu như cách một chúng ta chỉ đưa thẳng giá trị và hiện thị trức tiếp trên component cha thì angular2 cung cấp cho ta hàm `setter` để xử lý input đầu vào.

Ở ví dụ này trong setter chúng ta kiểm tra nếu component cha truyền giá trị `fatherName` là `Dinh` thì component con sẽ cộng thêm họ và sau đó sẽ hiển thị ra.

**Child component**

```` ts

import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `
    <p>My boss father name is: {{fatherName}}</p>
  `
})
export class AppChildComponent {
  private _fatherName = '';
  @Input()
  set fatherName(name:string){
    if(name==='Dinh'){
      name += ' Duong'
    }
    this._fatherName = name;
  }

  get name():string{
    return this._fatherName;
  }
}

````

**Parent component**

```` ts

import { Component } from '@angular/core';
@Component({
  selector: 'app-parent',
  template: `
    <h2>My son say:</h2>
    <app-child
      [fatherName]="myName">
    </app-child>
  `
})
export class AppParentComponent {
  myName: string = 'Dinh';
}

````

### 3.Sử dụng ngOnchanges của Component *(Intercept input property changes with ngOnChanges)*

Đầu tiên chúng ta cùng đi sơ qua lifecycle của angular2.

![angular2 life cycle](https://angular.io/resources/images/devguide/lifecycle-hooks/hooks-in-sequence.png)

Rõ ràng `ngOnChanges` sẽ được gọi sau khi chúng ta `khởi tạo (constructor)` component và chạy trước hàm `init component`.

Tìm hiểu sâu hơn về lifecycle của angular2 các bạn xem ở đây nhé [Angular2 LifeCycle](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html). Chúng ta quay lại về vấn đền comunication.


**Child component**

```` ts

import { Component, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `
    <p>My boss father name is: {{fatherName}}</p>
  `
})
export class AppChildComponent implements OnChanges {
  private _fatherName = '';
  @Input()
  set fatherName(name:string){
    if(name==='Dinh'){
      name += ' Duong'
    }
    this._fatherName = name;
  }

  get fatherName():string{
    return this._fatherName;
  }

  ngOnChanges(changes){
    if(changes['fatherName']){
      this.fatherName = changes['fatherName'].currentValue;
    }
  }
}

````

**Parent component**

```` ts

@Component({
  selector: 'app-parent',
  template: `
    <h2>My son say:</h2>
    <button (click)="forceSay()" > Please say </button>
    <app-child
      [fatherName]="myName">
    </app-child>
  `
})
export class AppParentComponent {
  _myName: string = 'Dinh';
  myName = '';

  sayCount = 0;

  forceSay(){
    this.myName = `${this.sayCount++} ${this._myName}`;
  }
}

````

Mỗi khi giá trị đầu vào thảy đổi từ component cha thì component con sẽ nhận được thông hàm `ngOnChanges(changes)` với biến changes nhận được sẽ kiểu `SimpleChange` với 2 giá trị `currentValue` và `previousValue`.

Các bạn có thể xem ví dụ ở đây.

<iframe style='width: 100%; height: 600px' src='https://embed.plnkr.co/XGOr74GMk2w0ZkUzWs8E/' frameborder='0'
allowfullscren='allowfullscren'></iframe>

### 4.Lắng nghe thay đổi từ component con bằng `EventEmitter`

Ở 3 cách trên đều detect thay dổi từ `component cha -> component con` và cập nhật view. Ở cách này sẽ cũng cấp cách gửi thông tin thay đôi từ `component con -> component cha` thông qua `binding decorator` là `@Output` và class `EventEmitter`.

Cách bạn có thể tìm hiểu thêm về `EventEmitter` [ở đây](https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html).

`EventEmitter` được extends từ `Subject` của [RxJs](http://reactivex.io/rxjs/) do đó ngoài để gửi ra output cho component cha thì chúng ta cũng có thể call subscribe ở những component sử dụng nó.

**Child component**

```` ts

@Component({
  selector: 'app-child',
  template: `
    <p>Say mom or dad</p>
    <button (click)="say('mom')">Mom</button>
    <button (click)="say('dad')">Dad</button>
  `
})
export class AppChildComponent {
  @Output() onSaid = new EventEmitter<string>();
  
  say(word:string){
    this.onSaid.emit(word);
  }
}


````

Mình muốn nói luôn về `two-way binding` ở angular2 ở đây luôn nhưng nghĩ một hồi lại quyết định để nó lại cho một bài khác.

**Parent component**

```` ts

@Component({
  selector: 'app-parent',
  template: `
    <h2>My son say:</h2>
    <app-child (onSaid)="onSaid($event)" ></app-child>
    <h3>Mom</h3>: {{mom}}
    <h3>Dad</h3>: {{dad}}
  `
})
export class AppParentComponent {
  
  mom = 0;
  dad = 0;

  onSaid(word:string){
    if(word==='mom')
      this.mom++;
    else
      this.dad++;
  }
}

````

<iframe style='width: 100%; height: 600px' src='https://embed.plnkr.co/T6fOOAqM8hVHzQd8bw4W/' frameborder='0'
allowfullscren='allowfullscren'></iframe>

### 5. Sử dụng local variable *(Parent interacts with child via local variable)*

Trong angular2 có cung cấp cho chúng ta ký hiệu `#` trong template khi sử dụng component nào đó (trong bài này nó sẽ nằm trong component cha). Và `angular2 complier` tạo một biến `chứa giá trị của component được gọi` và chúng ta có thể tùy ý sử dụng những public resource trong component đó (ở đây là component con).

**Child component**

```` ts

@Component({
  selector: 'app-child',
  template: `
    <h3>Foods is eating</h3>
    <p *ngFor="let food of foods">{{food}}</p>
  `
})
export class AppChildComponent {
  foods = [];

  eat(food: string) {
    this.foods.push(food);
  }
}


````

**Parent component**

```` ts

@Component({
  selector: 'app-parent',
  template: `
    <h2>Son' foods</h2>
    <button (click)="son.eat('rice')" >Eat</button>
    <app-child #son ></app-child>
  `
})
export class AppParentComponent {
};

````

Ở sự kiện `son.eat('rice')` trong template của component cha thì biến local `#son` được khởi tao trong angular2 complier và call hay sử dụng nhưng public method, property trực tiếp từ component con.

Nhưng ở kĩ thuật này do là chỉ sử dụng được trong nội bộ template nên có khá nhiều giới hạn nếu chúng ta muốn gọi hay sử dụng những resource của **component con bên trong component cha** thay vì sử dụng trên **template của component cha**. Do đó chúng ta đến với kĩ thuật kế tiếp đó chính là sử dụng `@ViewChild`.

### 6. Sử dụng `@ViewChil` *(Parent calls a ViewChild)* 

Cũng giống như kỹ thuật `local variable` nhưng chung ta sẽ khởi tạo biến kiểu của component con thông qua syntax :

```` ts
@ViewChild(AppChildComponent)
private childCmp: AppChildComponent;
```` 

Từ biến `childCmp` chúng ta có thể sử dụng ở bất kì đâu trong component cha với những public resource tử component con.

**Parent component**

```` ts
import { Component ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <h2>Son' foods</h2>
    <button (click)="forceEat()" >Eat</button>
    <app-child ></app-child>
  `
})
export class AppParentComponent {
  @ViewChild(AppChildComponent)
  private childCmp: AppChildComponent;

  forceEat(){
    this.childCmp.eat('rice');
  }
};
````

Nhớ import `ViewChild` nhé. Không là sẽ báo lỗi đấy.

### 7. Tương tác thông qua service *(Parent and children communicate via a service)*

Đây là một kỹ thuật mình sử dụng khá nhiều trong việc comunicate giữa các component. 

Ngoài những cách được cung cấp ở trên thường sẽ có flow theo hai hướng đó là từ `cha -> con` và ngược lại từ `con -> cha` và cha `cũng phải include` component con trong template của mình. Vì vậy những kĩ thuật trên khá nhiều ngữ cảnh sẽ ko thể apply được.

Hình minh họa bên dưới chỉ rõ 2 cách mà các component làm việc với nhau.

![angular2 via a service](http://i.imgur.com/GDVOMMt.jpg)

Do đó những vấn đề như comunicate từ component ra nhiều component khác (re-render sau khi login, logout, thay đổi ngôn ngữ,...) trong ứng dụng hay tương tác qua lại giữa các component với nhau hoặc bất kể những hoạt động làm việc ở mức global cần tương tác với toàn bộ những component trên ứng dụng angular2 chúng ta nên sử dụng kỹ thuật này.

Ở kỹ thuật đơn giản chỉ là chúng ta cần tạo ra một service trung gian giữa các components để lắng nghe các giá trị truyền đi giữa các component. Trong angular2 chúng ta sẽ sữ dụng RxJs để làm việc này.

![via a service](http://i.imgur.com/oOOANhe.png)

Ở ví dụ này chúng ta tạo ra 2 component, component cha sẽ lắng nghe mỗi khi component con raise lên 1 message (định nghĩa trong `app service` và gọi khi component con gọi method `say()`)

```` ts
childSay(message: string) {
    this.childSaySource.next(message);
}
````

Ở `constructor` or `ngOnInit` của component cha, ta sẽ lắng nghe (hàm `subscribe`) message được gửi từ `appSerive` thông qua biến `childSaid$` (kiểu Observable) mỗi khi `childSaySource` gọi method `next` với bất kì một giá trị nào.

```` ts
_appService.childSaid$.subscribe(mess => {
      this.sonMess = mess;
});
````

> **Lưu ý**: Cả 2 component phải sử dụng chung một instance `AppService`. Ở đây mình instance `AppService` ở `AppComponent` (2 compnent đều là con của `App Component`)

```` ts

import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  template: `
  <app-parent></app-parent>
  <app-child></app-child>`,
  providers: [AppService]
})
export class AppComponent {
}

````

> hoặc các bạn cũng có thể instance ở `AppModule` để xài chung cho tất cả các components.

```` ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, AppParentComponent, AppChildComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    AppParentComponent,
    AppChildComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

````

> Một lưu ý nữa là chúng ta khi chung ta `subscribe` thì cần phải `unsubscribe` khi những component đã được `render xong` hoặc nói cách khác là component đó đến lúc `việc tạo component đã xong` (is destroyed). Đây là bước để app chúng ta tránh khỏi issue về memory-leak.
Sẽ không là gì trong một ứng dụng nhỏ như ví dụ này. Nhưng nếu trong một ứng dụng phức tạp nó thì nó là một thảm họa nếu chúng ta không quản lý tốt chúng.  

**1. Import từ RxJS**

````ts 

import { Subscription } from 'rxjs/Subscription';

````

**2. Implement OnDestroy trong Component**

```` ts

import { Component, OnDestroy } from '@angular/core';

@Component({...})

export class AppChildComponent implements OnDestroy {

````

**3. Gán giá trị cho subscription**

```` ts

constructor(private _appService: AppService) {
      // Lắng nghe lời yêu dấu từ đứa con
      this.subs = _appService.childSaid$.subscribe(mess => {
        this.sonMess = mess;
      });
    }

````

**4. `unsubscribe` trong state `OnDestroy`**

```` ts

ngOnDestroy() {
      this.subs.unsubscribe();
    }

````

Live example:

<iframe style='width: 100%; height: 600px' src='https://embed.plnkr.co/iKDv7AEaHqUAyGZmeyhm/' frameborder='0'
allowfullscren='allowfullscren'></iframe>

### Tổng kết

Đây là những kĩ thuật để giao tiếp giữa các component trong angular2. 

Và tùy vào ngữ cảnh đơn giản hay phức tạp chúng ta sử dụng cho phù hợp.Bản thân mình thấy những kĩ thuật này cũng đã khá đầy đủ để giải giải quyết các vấn để của chúng ta khi phát triển một ứng dụng bằng angular2 <i class="em em-baby_chick"></i>.

Hy vọng bài viết sẽ giúp những bạn đang phát triển ứng dụng bằng angular2 có cái nhìn tổng quan về việc tương tác giữa các component.