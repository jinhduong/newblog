---
title: "Học và cải thiện kiến thức từ các dự án cá nhân(pet project)"
date: 2018-09-16T18:40:08+08:00
draft: false
tags:
    - sharing
    - learning
    - petproject
    - docker
    - nginx
    - linux
---

![People —Man Holding Goose Free Photo —By Ryan McGuire](https://gratisography.com/thumbnails/gratisography-427-thumbnail.jpg)

Cách tốt nhất để học bất cứ thứ gì là chúng ta dự định làm ra cái gì linh tinh để rồi trong quá trình làm ra sản phẩm chúng ta nhận ra những thứ chúng ta còn `mơ hồ và lấn cấn`, sau đó thì chỉ việc tìm hiểu tập trung những thứ này thôi. Đó cũng là một cách học những thứ mới mẻ, hoặc tìm hiểu những công nghệ xu hướng, mà người ta hay gọi là đú trend đấy :D

Bài này mình sẽ note lại những thứ trong quá trình làm ra một dự án pet project, và mình nghĩ nó sẽ hoàn toàn bổ ích cho những bạn muốn có cái nhìn toàn cảnh về việc làm nên một sản phẩm linh tinh từ đầu đến cuối để thỏa mãn dục vọng bản thân của một coder :D.

Trong quá trình hoàn thành dự án linh tinh này, mình sẽ hold lại và tìm hiểu cũng như giải thích những kiến thức mà bản thân mình còn chưa thật hiểu rõ. Theo shark tank thì khách hàng tiềm năng của bài là các thanh niên mới chập chững vào nghề hoặc là làm vài năm mà vẫn mông lung như một trò đùa (như mềnh :D).

# Đầu tiên, nghĩ ra requirement cho pet project
Chắc chắn cái việc viết ra một dự án thú cưng thì đầu tiền nó phải thỏa mãn cái `nhu cầu của chính người viết ra cái đã`. Ở đây là mình, hoặc các bạn đọc ở đây, không cần quan tâm trên thị trường đã có sản phẩm nào tồn tại để cạnh tranh hay chưa vì chúng ta thường chỉ có kinh phí là 1 buổi sáng hoặc 1 ly cafe không thôi à, nên tập trung vào làm ngay và luôn là tốt nhắt.

Quay lại vấn đề requirement, chắc hẳn các bạn cũng biết cảm giác khi đau bụng (nhất là buổi sáng, sau khi vào công ty) là một khoảng thời gian riêng tư vô cung quý giá, mà trong đó chúng ta có thể làm mọi thứ mà không có cảm giác tội lỗi, mà 3G hay 4G trong toilet thì các bạn biết rồi đấy, các cụ hay bảo là **"nhanh như rùa bò"** ấy. Vào toilet mà không có gì xem hay đọc là một khoảng thời gian rất phí phạm của cuộc đời này, ở nhà còn có dầu gội dầu xả thế lọ thể chai để xem xuất xứ, thành phần này nọ chứ ở công ty, toilet của chung thì làm gì có gì mà coi, mà có thì coi 1 lần chứ đâu có coi quài được.

Từ những lý do ở trên của bản thân, mình quyết định sẽ làm 1 website đọc tin tức tối ưu hóa băng thông, hạn chế đến mức thấp nhất băng thông gửi từ server gửi xuống. **Khoảng ~2kb** cho trang chủ, **và ~4kb** cho list tin tức, còn nội dung thì tùy từ tin gốc nhưng ở **khoảng ~10kb** là đẹp. Vậy là đủ cho những nơi 3g thấp hoặc khi điện thoại bị hết băng thông rộng. 

Xong phần requirement, bước kế tiếp là đến phần lựa chọn stack công nghệ.

# Lựa chọn stack công nghệ
![1 phần trong stack của AirBnB](https://i.imgur.com/ZuPIua9.png)
- **Server và client:**
Do hạn chế băng thông cho client nên tốt nhất là dưới client chúng ta không nên sử dụng bất cứ một thứ gì cả, client chỉ việc lấy html và render ra là xong, tốt nhất là loại bỏ luôn file javascript. 
- **Backend technology:** Nhanh gọn lẹ tốc độ, ăn lièn nhất có lẽ `Nodejs` là một sự lựa chọn đúng đắn nhất, khởi tạo nhanh, code nhanh, cũng như có rất nhiều host/ platform hỗ trợ việc deployment gọn lẹ như Heroku chẳn hạn. Còn về `framework web` với nodejs thì có lẽ `expressjs` là phổ thông và cũng là một framework tương đối đã trưởng thành.
 
    > Kèm đó là `Typescript` ngoài các lợi ích của nó thì nó giúp code chúng ta tường mình hơn với việc hỗ trợ `kiểu dữ liệu`. Đương nhiên không công nghệ nào là thần thánh và hoàn toán không có khuyết điểm, `Typescript` cũng vậy nhưng với môi trường server thì nó ít bị tác dụng phụ hơn so với *client(SPA)* app.
    
    > Mình không chuyên backend với nodejs, nên mình sẽ chọn những gì mình thấy là dễ dàng nhất (với bản thân mình, hoặc với đa số mọi người) để tiếp cận.

- **Web server:** Nginx, một web server sinh sau đẻ muộn nhưng hiệu năng và độ thân thiện, với mình là khá hoàn thiện ngoài những bản plus thêm tính phí :D

    > **Một chút chuyện web server**: https://www.rootusers.com/linux-vs-windows-web-server-benchmarks/, dựa theo bài so sánh này, chúng ta có thể thấy là IIS có performace rất tốt trải dài từ 1~8 CPU core(s), nên không có nghĩa chúng ta không chọn IIS vì hiệu năng kém hay bất cứ lý do gì về vấn đề hiệu năng, mà với bản thân mình lý do không chọn IIS là vì:

        - Ứng dụng không bắt buộc chạy trên windows server
        - Windows server khá đắt đỏ so với linux
        - Server vs GUI rất nặng nề
        - (Có thể) dễ dàng bị tấn công hơn, dù điều đó phụ thuộc vào system administrator, theo mình thì đa số sa của linux hiểu rõ hệ điều hành của mình hơn
        - Cộng đồng hẹp, lợi thế riêng cho các ứng dụng phát triển bằng Microsoft technology

- **Server provider**: Mình sẽ không sử dụng platform như `Heroku` để host ứng dụng này mà sẽ sử dụng **1 cloud vps**, theo mình nó sẽ có nhiều điều để nói hơn. Okay, bất cứ providers nào mà bạn thân thuộc từ **AWS** (free tier 1 year), **GCP** (free 300$ năm đầu tiên cho new user), **Azure** (free 1 tháng đầu 200$ thì phải), **DigitalOcean** (free 10$ new user), **Vultr**(free 25$ new user)... 

    > Ở đây mình **sẽ chọn Vultr** nhé vì nó có gói 3.5$ cho 512RAM vs 2.2Ghz 1 core CPU. Khá đủ cho các pet/site project của chúng ta. Các bạn register ở link đây nhé: https://www.vultr.com/promo25b?ref=7499070, ref từ tài khoản của mình, hình như mình đc 10$ nếu bạn paid cho dịch vụ thì phải.

- **Server OS**: Chắc chắn là `Linux` rồi, nếu ứng dụng của bạn không phải chạy bằng .Net Framework và dựa quá nhiều vào **Windows API** thì ko cần thiết phải cần đến một **IIS server** đắt đỏ. Nếu ứng dụng của bạn hiện tại đang được viết `.net core` thì chúng ta cũng thoải mái deploy trên môi trường linux nhé.

    > Mình sẽ chọn `ubuntu 16.04` cho server nhé, nó là một distro của linux được sử dụng rất phổ biến trên thế giới, theo mình thì nó mạnh mẽ, cộng đồng rộng lớn, dễ sử dụng cho người mới bắt đầu (me) hay là cả system adminitrator nhiều kinh nghiệm.

    > Theo mình không nên sử dụng `ubutu 18.04` cho server nhé, hiện tại theo mình thấy có khá nhiều vấn đề về chuyện tương thích, có lẽ nó cần thêm thời gian để hoàn thiện hơn.

- **Containerize:** Okay, *container container everywhere* mà, không cần công nghệ containerize thì chúng ta vẫn triển khai từ trước đến nay thôi, nhưng không thể chối bỏ việc Docker hay công nghệ containerize *(gọi là công nghệ cũng không thật chính xác lắm, gọi là 1 `philosophy` thì chính xác hơn)* đã giúp chúng ta rất nhiều trong việc phát triển, triển khai, scale up... Nói không ngoa containerize hay Docker đang là **con cưng của giới công nghệ hiện tại** :D. Mình cũng chỉ mới tiếp cận và sử dụng Docker khoảng vài tháng lại đây, thật sự mà nói nó giúp ích cho mình rất nhiều trong việc triển khai một ứng dụng.

    > Chúng ta sẽ sử dụng `Docker` và `Docker Swarm` cho vấn đề triển khai này nhé. Sẽ nói về `Docker swarm` dành cho những bạn chưa đụng tới `Docker` ở đoạn sau nhé. Nhưng ngay lúc này bạn có thể search về `Docker Swarm` và `Kurbenetes` là gì, và nó khác nhau như thể nào?

- **Source control và CI/CD:** có lẽ chúng ta nghĩ ngay tới `github` nhưng, pet project thì pet project chứ, nhiều khi nó lại là product triệu đô thì sao nhỉ ahihi, đùa chứ với một pet project thì `github` là nơi tuyệt vời để chúng ta lưu trữ dự án rồi, nhưng ở đây mình sẽ sử dụng `gitlab` để lưu trữ.
    
    > Ngoài những thứ *github* có, thì nó còn đi kèm rất nhiều thứ để chúng ta hoàn toàn có thể phát triển phần mềm từ đầu đến cuối như: **lưu trữ**, **pipeline build**, **triển khải** mà nó còn support **private registry** cho `Docker image`... và điều cuối cùng quan trọng là nó hỗ trợ chúng ta **private** dự án, cũng như **unlimited collaborators**, **10GB** per project. Hiện tại các dự án trên công ty mình cũng sử dụng gitlab đóa.   

- Chuyện domain: domain thì chúng ta cứ GoDaddy và Namecheap và triển thôi, hai nhà cung cấp này có khuyển mãi tầm 1$ cho doamin .com cho người dùng mới trong năm đầu tiền, hoặc các bạn cũng có thể mua những domain giá khoảng 1$ với đuổi như `.xyz`, `.online`... gì đấy, còn muốn hàng free thì cứ https://www.freenom.com.

**Còn gì nữa không nhỉ??** Chắc không còn gì nữa nhỉ, ngoài các implement chi tiết hơn trong các phần tương ứng. Tổng kết lại stack của chúng ta nào:

- **Server side rendering** only
- **Nodejs**
    - Express
    - Typescript
- **Nginx** web server
- **Vultr** cloud vps
- **Linux** ubuntu 16.04
- **Docker and Swarm**
- **Gitlab** for Source Control, CI/CD

> Các bạn cũng có thể lên [https://stackshare.io/news](https://stackshare.io/news) để xem các stack công nghệ của các công ty, cũng như mức độ phổ biến, điểm mạnh, điểm yếu của công nghệ đó. Và đừng ngại chia sẽ stack của mình đang áp dụng cho cộng đồng nhé.

Tới đây bài cũng khá dài, viết một lần chắc draft miết luôn quá. Nên thôi mình sẽ cố gắng chia bài này ra khoảng 2 đến 3 bài cho ngắn. Bài sau sẽ đi vào chi tiết việc implement và giải thích, tìm hiểu những kiến thức đi kèm. Hy vọng bài viết bổ ích cho các bạn nào chưa có cái nhìn tổng quan về việc lựa chọn công nghệ, và triển khai một ứng dụng từ con số 0 đến khi lên sản phẩm. 

> Tốt nhất trong tất cả các lựa chọn chúng ta nên dành thêm thời gian tìm hiểu thêm trên internet, nếu có những đồng nghiệp hay tiền bối có kinh nghiệm hơn đừng ngại hỏi họ nhé. Không ngại hỏi thì chúng ta cũng đừng ngại cám ơn nhé.

Hẹn gặp ở chap tiếp nhóe.

Ah quên, áp dụng một mớ kiến thức đồ sộ như trên chúng ta sẽ có sản phẩm như thế này nhé các bạn:
https://www.toiletexpress.online/ ^^
