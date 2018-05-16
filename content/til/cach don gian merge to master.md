---
title: "Cách đơn giản để merge qua nhánh master"
date: 2018-05-16T15:39:17+08:00
tags:
    - git
---

Chúng ta chuyển về nhánh `master` trước, sau đó merge nhánh `feature`, sau đó push lên lại

``` git
git checkout master
git pull origin master
git merge feature
git push origin master
```

Thanks.

