---
title:  "Webpack series -  giới thiệu từ cơ bản đến căng cơ :D"
date:   2017-04-20 00:00:00
tags:   
  - webpack
---

<!-- ![banner](https://i.imgur.com/iy9HXob.png) -->
Với xu hướng lập trình mà business và phần lớn xử lý đều nằm ở tầng phía front-end với gánh nặng càng ngày càng đè lên vai chàng dũng sĩ javascript tội nghiệp, thì các công cụ hỗ trợ cho anh ấy (ahihi) như typing, task runner, test tools,... tè le tà la hết, nói chung là không thể thiếu được với 1 front-end dev. Hôm nay mình muốn giới thiệu **Webpack** một **module loader** cho javascript một cách cơ bản nhất.

<!-- more -->

<link rel="image_src" href="https://i.imgur.com/iy9HXob.png">

**[Webpack](https://webpack.js.org)** hiện đang là module loader được sử dụng rộng rãi nhất hiện nay với cộng động support to lớn và những chức năng vô cùng mạnh mẽ. Phiên bản hiện tại là `v2.3.3`.

![webpack](https://i.imgur.com/Aqpxd8i.png)
*webpack với 26k stars*

### Vậy Module loader là gì?
- Một cách đơn giản là ngày xưa chúng ta thường add những thư viện (3th parties) như `jquery, moment, select2, dtpicker,sticky,...` vào thẻ `script` để khi web load lên xong thì những thư viện này sẽ được `execute` và xử lý. Nhưng không còn như những ngày xưa chỉ vài dòng jquery là đủ dùng, sau này do việc code dưới front-end càng ngày càng phìng to nên việc quản lý code = javascript càng ngày càng tõ rõ sự quan trọng nên từ đó khái niệm `module loader` ra đời.

- Có khá nhiều thư viện từ nhỏ đến to ra đời cho việc này: Tiny Loaders (curl, LABjs, almond), RequireJS, Browserify, SystemJs, **Webpack** và gần đây đang nổi lên là RollupJs (mình chưa xài thằng này nhưng nghe nói Facebook sử dụng thg này cho React :D).

- Nếu bạn nào có xài `SystemJs`, `Browserify` rồi thì thấy thật ra `Webpack` ra đời từ thừa hưởng những thành quả và kinh nghiệm từ những thư viện đó và phát triển lền một tầm mới tốt hơn cho công việc `quản lý module`.

Có ai đọc tới đây mà chưa thấy hiểu gì không? Hoặc chưa tiếp xúc với khái niệm `module loader` trong javascript bao giờ, thì xem qua ví dụ này sẽ chắc dễ hiểu hơn.

### Ví dụ cơ bản

Chúng ta sẽ có `2 file .js` 

```` ts
//xinchao.js
export default function xinchao(name){
    console.log('Xin chao '+ name);
}
````

```` ts
//index.js
import xinchao from './xinchao';

xinchao('Dinh');
````

Thì đây `import xinchao from './xinchao'` chính là chỗ mà Webpack sẽ làm việc cho chúng ta.

> `import` và `export` hiện tại chưa được support cho đa phần các browser. Và khi bạn viết như thế này thì browser cũng ếu hiểu bạn đang muốn làm cái gì? Và đó là lúc các `module loader` xuất hiện.

![](https://i.imgur.com/KT6mRPY.png)
*Hỗ trợ `import` `export` của các trình duyệt*

Với `2 file .js` ở trên chúng ta sẽ dùng `Webpack` để bundle và xem kết quả như thế nào nhé?

Tạo file `webpack.config.js` để config cho `Webpack`.

````ts
//webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  }
}
````

**- entry**: là file mà chúng ta sẽ bắt đầu chạy bằng `webpack`. Nói chung nó là bắt nguồn của chiến tranh. Nó `import` từ thằng khác rồi thằng khác `import` từ thằng khác khác nữa từ đó sẽ kéo theo một chuỗi có hệ thống việc load các js module. Ở đây là file `index.js` ở trên.

**- output-filename**: là đầu ra của file sau khi webpack làm việc xong.

Cuối cùng một file html đơn giản để chạy script này.

```` html
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="bundle.js"></script>
  </body>
</html>
````

Yêu cầu các bạn đã cài `Nodejs` và `Npm` rồi nhé. [https://nodejs.org/en/](https://nodejs.org/en/)

1. `mkdir wp-demo && cd wp-demo`. Tạo 1 folder để chứa src.
2. `npm init -y`. Tạo 1 file `node package` . -y là yes cm nó hết các bước version, decription,...
3. `npm install --save-dev webpack`. Install `Webpack`.

**Sau khi cài xong**
![cai xong](https://i.imgur.com/6zoSqfi.png)

**Cấu trúc thư mục**
![thu muc](https://i.imgur.com/i3Nd9KE.png)

4.Gõ `webpack` để run.
![sau khi chay](https://i.imgur.com/LyuvRSV.png)

Chúng ta sẽ thấy file `bundle.js` được tạo ra và sau khi chạy file `index.html` sẽ xuất ra dòng log `xin chao Dinh`.

Ok.Chúng ta cùng xem trong file bundle.js có gì và webpack đã làm gì nhé.

````ts
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = xinchao;
function xinchao(name) {
    console.log('Xin chao ' + name);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xinchao__ = __webpack_require__(0);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__xinchao__["a" /* default */])('Dinh');

/***/ })
/******/ ]);
````

- Khá loằng nhoằng nhưng chúng ta có thể hiểu `webpack` đang làm cái gì. Như ta thấy Module `/* 0 */` là file `xinchao.js` và module `/* 1 */` chính file `index.js`.

````ts
var __WEBPACK_IMPORTED_MODULE_0__xinchao__ = __webpack_require__(0);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__xinchao__["a" /* default */])('Dinh');
````

- Đoạn này có thể thấy webpack gọi function trong module `xinchao` và call nó ở `index.js`.

- Những function mặc định trên của `webpack` như ta thấy dùng để như: 
    1. require module
    2. tạo module
    3. cache module
    4. execute module
    5. check export type (`default` hoặc `chỉ định`)
    6. ... các bạn có thể debug ở browser để xem nó chạy

````ts
// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
````

Đây là nơi start của webpack. Nó bắt đầu require từ module số `1` (nghĩa là file `index.js`). Tada đơn giản và dễ hiểu phải không nào.

Giờ chúng ta sẽ chạy `webpack -p` để build file trên mode production nhé. Và đây là file `bundle.js` của chúng ta.

![prod mode](https://i.imgur.com/dPu2yfG.png)

Nguyên bài này là những phần hết sức căn bản trong việc sử dụng `Webpack` - module loader được sử dụng rỗng rãi nhất hiện nay.

Các bài kế tiếp mình sẽ giới thiệu tiếp về các phần nâng cao hơn của `Webpack` như:

- Code Splitting
- Code Splitting - CSS
- Code Splitting - Libraries
- Code Splitting - Async

Hy vọng bài này có ích cho các bạn. Hẹn gặp lại vào các bài sao nhé ^^.



