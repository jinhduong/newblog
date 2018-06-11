---
title: "@Content Trong Scss"
date: 2018-06-08T15:48:58+08:00
tags:
-   scss
-   css
-   design
---
# Định nghĩa
`Which allows us to pass a content block into a mixin`

Sử dụng khi chúng ta muốn đưa tất các định nghĩa trong 1 content vào một `mixin` nào đó.

```scss
@mixin apply-to-ie6-only {
  * html {
    @content
  }
}

@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

Ở đây chúng ta sẽ đưa content vào `mixin` có tên `apply-to-ie6-only`. Nó sẽ được biên dịch và nằm hết trong tag `html`.

Sau khi complie:

```scss
* html #logo {
  background-image: url(/logo.gif);
}
```

