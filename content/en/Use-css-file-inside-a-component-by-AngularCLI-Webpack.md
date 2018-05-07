---
title: Use css file inside a component by AngularCLI/Webpack
author: Dinh Duong
excerpt: true
date: 2017-11-23 21:57:15
tags: 
    - angular
    - english
---

# Reason

I write this one because today when I looking for an editor library which already supported in Angular, after some searching I decided use ngx-quill. About Quill? it’s a quite famous editor library which used by Slack, Buffer… It also more modern and lightweight than CK Editor which is quite heavily.

<!-- more -->

![Quill homepage](https://cdn-images-1.medium.com/max/800/1*NyPKiqIYLlkXYo--f5yUig.png)

Back to ngx-quill, I read its documentation and example, I saw some library guide put CSS file inside root index.html file or put it into .angular-cli.json (Angular CLI).

The bad thing about this way is these CSS files will be loaded once our application initialized although we don’t use these above files. It’s redundant and make our application more slower.

# Suggestion

My suggestion is we can put the CSS file inside component and it will be loaded once the component already initialized and rendered. Now I using Angular CLI which already included Webpack config.

`require(‘style-loader![your-library-path]’);`

Example when I add quill CSS files:
<script src="https://gist.github.com/jinhduong/db72cc60a44d0274646bba24d12d80f7.js"></script>

It’s just small tip :D but maybe increase our application speed a lot especially in the huge application. Thanks for watching.
