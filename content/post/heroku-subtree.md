---
title: "Deploy Heroku nằm trong một sub-folder của một git repo"
date: 2018-06-18T12:12:22+08:00
draft: false
tags:
    - heroku
    - deploy
    - sharing
keywords:
    - heroku
    - deploy
    - sharing
description: "Deploy Heroku nằm trong một sub-folder của một git repo"
---
# Scenario
Trong một dựa án lớn, với nhiều ứng dụng con và chúng nằm chung trong một `git` repo và một trong số đó sử dụng và deploy lên `Heroku`. Làm cách nào để deploy heroku trong trường hợp này?

Giả sử `project structure` như này:

Dự án có 2 project là `homepage` và `heroku-app` (deploy lên heroku)

```
-src/
--homepage/
---index.html
---...
--heroku-app/
---package.json
---index.js
```

Chúng ta không thể deploy lên heroku từ nhánh `master` của repo như bình thường được vì ngoài root chả có data gì để heroku `xách định` và `build` project của chúng ta cả.

Cách đơn giản nhất là chúng ta sẽ sử dụng [`subtree`](https://github.com/apenwarr/git-subtree/blob/master/git-subtree.txt).

```bash
git subtree push --prefix <output> heroku master
```

với `<output>` là tên folder chứa source mà bạn muốn là root khi push lên `heroku`. Ở ví dụ trên: 

```bash
git subtree push --prefix heroku-app heroku master
```

> heroku support file name là `Procfile` để setting các command cho việc run application, và `postinstall` trong `package.json > scripts` để run các pre-command (các lệnh trước khi ứng dụng được chạy, vd như để: build, install depedencies...)


- `Profile`
```bash
web: npm start
```

- `package.json`
``` json
{
  ...
  "scripts": {
    "postinstall": "npm run build:ssr",
    "build:ssr": "npm run build:client-and-server-bundles && npm run webpack:server",
    "webpack:server": "webpack --config webpack.server.config.js --progress --colors"
  }
  ...
}
```


Thanks.

# Tham khảo
[https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku](https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku)





