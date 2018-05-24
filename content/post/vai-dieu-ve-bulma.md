---
title: "Những ghi chú khi làm việc thử với Bulma (1)"
date: 2018-05-22T21:11:04+08:00
tags: 
-   bulma
-   scss
-   css
---

# Giới thiệu
Bulma là một css framework, được viết bằng `sass` dựa vào `flexbox`, sử dụng `css-grid` for reponsive và được thiết kế cho `mobile first`. Nó là một modular css fw, có nghĩa bạn có thể sử dụng đơn lẻ các chức năng của nó như `columns`, `button`, `form`...

# Tổng quan
## Cài đặt
**npm**

```
npm install bulma
```

**or CDN**

```
https://cdnjs.com/libraries/bulma
```

## Modularity
- Bulma chứa 39 file `.sass`, chúng ta có thể add trực tiếp cái nào cần.

``` css
@import "bulma/sass/utilities/_all"
@import "bulma/sass/grid/columns"
```

## Responsiveness
### Vertical by default
Tất cả element trong Bulma là `mobile first` và được tối ưu hóa cho việc đọc theo chiều dọc.

- `columns` are stacked vertically
- the `level` component will show its children stacked vertically
- the `nav` menu will be hidden

### Breakpoints
#### Bulma có 5 breakpoint:

Breakpoint là các giá trị mà `Bulma` dựa vào để detect cho responsive

- mobile: up to `768px`
- tablet: from `769px`
- desktop: from `1024px`
- widescreen: from `1216px`
- fullhd: from `1408px`

![bulma](https://i.imgur.com/P94gsrI.png)

#### Và có 9 reponsive mixins: 
Những giá trị mà chúng ta có thể check ví dụ như:

- `touch` nằm trong vùng từ `mobile` tới `table`
- hay `table only`, `desktop-only`...

![mixins](https://i.imgur.com/PrQ4Pjp.png)

## Variables

Có 2 file chứa variables là `initial` và `derived` và chia thành 4 loại

- `initial` chứa các giá trị trực tiếp chia thành 4 loại:
    - colors: `$blue: hsl(217, 71%, 53%)`
    - font sizes: `$size-1: 3rem`
    - dimensions: `$gap: 32px`
    - other values: `$easing: ease-out or $radius-large: 5px`

- `derived` sử dụng những giá trị từ `initial`:

    - `$primary: $turquoise`
    - `$link: $blue`
    - `$info: $cyan`
    - `$success: $green`

Xem thêm: https://bulma.io/documentation/overview/variables/

## Colors
https://bulma.io/documentation/overview/colors/

Bulma hỗ trợ danh sách các màu mặc định, được sử dụng hiện tại cho các `elements` và `components`.
Chúng ta có thể sử dụng với format như sau `.is-$color` như là `is-primary`, `is-dark`, `is-success`...

Chúng ta có thể sửa các biến `global $color` như sau:
``` scss
// Import danh sách biến khởi tạo mặc định
@import "../node_modules/bulma/sass/utilities/initial-variables";

// Định nghĩa màu xanh
$blue: #72d0eb;

// Update lại color của primary
$primary: $pink;

```
![bulma color](https://i.imgur.com/yQUOx2U.png)

## Functions
https://bulma.io/documentation/overview/functions/

Bulma sử dụng 3 `functions` để xác định giá trị và tính toán màu sắc động `colors dynamically`.

- `powerNumber($number, $exp)`: calculates the value of a number exposed to another one. Returns a number.
- `colorLuminance($color)`: defines if a color is dark or light. Return a decimal number between 0 and 1 where <= 0.5 is dark and > 0.5 is light.
- `findColorInvert($color)`: returns either 70% transparent black or 100% opaque white depending on the luminance of the color.

`1` Cái đầu mình ko biết nó để làm gì.

`2` Xác định màu là sáng hay tối.

`3` Trả về một màu đối lập, thường dùng để set màu chữ cho button. Giả sử button màu đỏ => nằm vế phía darkness hơn => ra màu trằng.

![bulma color](https://i.imgur.com/NquNfUS.png) 

# Modifiers - tính sửa đổi
https://bulma.io/documentation/modifiers/
## Syntax
Khá là thân thiện để đọc hiểu. Nó thường được bắt đầu bằng `is-` hoặc `-has`

```html
<a class="button is-primary">Button</a>
<a class="button is-link">Button</a>
<a class="button is-small">Button</a>
<a class="button is-info is-loading">Button</a>
```

## Helpers
Áp dụng cho hầu hết element để thay đổi style của tụi nó.

![bulma modifiers helpers](https://i.imgur.com/fU1XwFG.png)

## Show

Sử dụng các thuộc tính của `display`:

- block
- flex
- inline
- inline-block
- inline-flex

format là `is-$dislay` => `is-block`, `is-flex`

Ngoài ra có một số `class` để show/hide một element theo `reponsive` như là: `is-hidden-mobile`, `is-hidden-tablet-only`, `is-flex-mobile`...

## Colors helper
https://bulma.io/documentation/modifiers/color-helpers/
Có `9 màu` và `9 shades của grey` để bạn set cho element của mình, thuộc 2 section là `text-color` và `background-color`

Format: `has-text-white`, `has-text-grey-dark`... và `has-background-white`, `has-background-success`...

## Typography helpers
https://bulma.io/documentation/modifiers/typography-helpers/
### Size
Có 7 size để chọn:

![bulma size](https://i.imgur.com/aSnaS68.png)

Khi làm việc với reponsive cùng size `is-size-1-mobile`, `is-size-2-tablet`...

### Alignment (căn chỉnh)

<table class="table is-bordered">
  <thead>
    <tr>
      <th>
        Class
      </th>
      <th>
        Alignment
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>has-text-centered</code></td>
    <td>Makes the text <strong>centered</strong></td>
    </tr>
    <tr>
    <td><code>has-text-justified</code></td>
    <td>Makes the text <strong>justified</strong></td>
    </tr>
    <tr>
    <td><code>has-text-left</code></td>
    <td>Makes the text aligned to the <strong>left</strong></td>
    </tr>
    <tr>
    <td><code>has-text-right</code></td>
    <td>Makes the text aligned to the <strong>right</strong></td>
    </tr>
  </tbody>
</table>

Khi làm việc với reponsive cùng Alignment `has-text-left-mobile`, `has-text-left-tablet-only`...

### Text transformation
Hỗ trợ 4 options:

<table class="table is-bordered">
  <thead>
  <tr>
    <th>
      Class
    </th>
    <th>
      Transformation
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>is-capitalized</code></td>
    <td>Transforms <strong>the first character</strong> of each word to <strong>uppercase</strong></td>
  </tr>
  <tr>
    <td><code>is-lowercase</code></td>
    <td>Transforms <strong>all characters</strong> to <strong>lowercase</strong></td>
  </tr>
  <tr>
    <td><code>is-uppercase</code></td>
    <td>Transforms <strong>all characters</strong> to <strong>uppercase</strong></td>
  </tr>
  <tr>
    <td><code>is-italic</code></td>
    <td>Transforms <strong>all characters</strong> to <strong>italic</strong></td>
  </tr>
  </tbody>
</table>

### Text weight
Cũng hỗ trợ 4 kiểu luôn:

<table class="table is-bordered">
  <thead>
  <tr>
    <th>
      Class
    </th>
    <th>
      Weight
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>has-text-weight-light</code></td>
    <td>Transforms  text weight to <strong>light</strong></td>
  </tr>
  <tr>
    <td><code>has-text-weight-normal</code></td>
    <td>Transforms text weight to <strong>normal</strong></td>
  </tr>
  <tr>
    <td><code>has-text-weight-semibold</code></td>
    <td>Transforms text weight to <strong>semi-bold</strong></td>
  </tr>
  <tr>
    <td><code>has-text-weight-bold</code></td>
    <td>Transforms text weight to <strong>bold</strong></td>
  </tr>
  </tbody>
</table>

# Columns
https://bulma.io/documentation/columns/

Lấy trích dẫn từ trang chủ: 

> The power of **Flexbox** in a simple interface. 

Có lẻ đây cũng là phần hấp dẫn nhất của framework `Bulma` này. 

## Basic
Add container với class=`columns` và các element với class=`column`. Dựa vào số element `Bulma` sẽ tự phân chia.

![bulma colums basic](https://i.imgur.com/huN9WSm.png)

``` css
<div class="columns">
  <div class="column">
    First column
  </div>
  <div class="column">
    Second column
  </div>
  <div class="column">
    Third column
  </div>
  <div class="column">
    Fourth column
  </div>
</div>
```

## Column sizes

Có kiểu:

### Dựa theo size

Nó sẽ chia theo phần trăm ví dụ:

- bốn phần năm 4/5 => `column is-four-fifths`

```css
<div class="columns">
  <div class="column is-four-fifths">is-four-fifths</div>
  <div class="column">Auto</div>
  <div class="column">Auto</div>
</div>
```

![4/5](https://i.imgur.com/r9iNudz.png)

- hai phần ba 2/3 => `column is-three-quarters`

``` css
<div class="columns">
  <div class="column is-two-thirds">is-two-thirds</div>
  <div class="column">Auto</div>
  <div class="column">Auto</div>
</div>
``` 

![2/3](https://i.imgur.com/UXl9Z0i.png)

Tương tự như vậy cho các trường hợp khác.

### 12 columns system

Giống `bootstrap` là sẽ chia thàn `12 colums` và dựa đó để chia layout.

Format: `is-$num` => `is-2` `is-3` `is-4`... `is-12`

![colums system](https://i.imgur.com/OUTi1GF.png)

Còn tiếp... 

Thanks đã xem



