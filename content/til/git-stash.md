---
title: "Git Stash"
date: 2018-05-17T12:17:36+08:00
---

Đôi khi đang làm dở gì đó, các bạn muốn lựu tạm lại (chưa commit) và **chuyển qua branch khác** để làm hoặc đơn giản là lưu lại những gì đang làm và back lại nhánh master đang stable để làm task khác. Nếu có, thì may mắn Git hỗ trợ chúng chung lệnh `stash`

# Bash
1. Tạo
``` git
git stash save # or just "git stash"
```

2. List
``` git
git stash list
stash@{0}: WIP on <branch-name>: <lastest commit>
stash@{1}: WIP on <branch-name>: <lastest commit>
stash@{2}: WIP on <branch-name>: <lastest commit>
```

3. Xem nội dung stash
``` git
 git stash show stash@{1}
```

4. Apply
``` git
git stash apply stash@{1}
```

5. Xóa
``` git
 git stash drop stash@{1}
```

6. Clear
``` git
git stash clear
```

Thanks.



