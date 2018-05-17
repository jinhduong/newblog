---
title: "Trigger center mouse để download file"
date: 2018-05-17T11:50:41+08:00
tags: 
    - javascript
---

Chúng ta đã biết các file như hình ảnh `.png .jpg`... hoặc `.pdf`... thì browser sẽ tự động preview cho chúng ta, không nhưng các file khác là khi mởi new tab nó sẽ tự động download về như `.xlms .doc .docs`.

**Vậy thì làm sao để download?** 

Browser có 1 chức năng là khi chúng ta nhấp center/middle mouse thì nó sẽ down file đó về chứ không priview file đó => Việc của chúng ta là **giả lập lại thao tác `mouse chân giữa`.

# Code
``` js
var url = 'your-file-url'
var link = document.createElement('a')
link.href = sUrl
link.setAttribute('target','_blank')
// Set filename khi download xuống
if (link.download !== undefined) {
    var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
    link.download = fileName;
}
// Dispatch cái evetn middle mouse click
if (document.createEvent) {
    // left mouse: 0, middle: 1, right: 2
    var e = new MouseEvent( "click", { "button": 1, "which": 1 });
    link.dispatchEvent(e);
    return true;
}
```
