---
title: "Học và cải thiện kiến thức từ các dự án cá nhân(pet project) - chap2"
date: 2018-09-17T12:44:23+08:00
draft: true
---

![by Ricardo Gomez Angel - https://unsplash.com/photos/7bzbyafVTYg](https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=02c0bd4d20ed02596fba642af71d1156&auto=format&fit=crop&w=758&q=80)

Chap 1: https://www.jinhduong.com/post/learning-from-pet-project/

# Lựa chọn giữa SSR - server side rendering và CSR - client side rendering?
## Sơ qua về định nghĩa
### SSR là gì?
SSR đơn giản là việc chúng ta dành toàn bộ công việc **cho phía server**, có nghĩa mọi request từ phía client (với web application thường là *browser*) sẽ được server *giải quyết* sau đó gửi lại cho client nội dung (html), cuối cùng client chỉ việc hiển thị. 

Nếu trang web chúng ta có thêm các file `javascript`, thì **sau khi trang web đã được hiển thị** thì các file `javascript` sẽ được thực thi. Các file javascript đó có thể là các thư viện như `lodash`, `momentjs` hay các framework như `React`,`Angularjs`, hoặc `VueJS` chẳng hạn. 

Có nghĩa ở đây các framework chỉ đóng 1 phần tương tác, hoặc 1 phần render trong trang hiện tại. Ngược lại với **CSR** thì các `client framework` sẽ có nhiệm vụ render toàn bộ.

> *Giải quyết* ở đây là tất cả các công việc từ routing, phân quyền, render html,... nói chúng tất cả mọi thứ sẽ do server đảm nhiệm. Client có thể đảm nhận một phần trong đó, nhưng **ko thể thay thế** hoàn toàn.

### CSR là gì?
Ngược lại với SSR thì CSR là khái niệm mà toàn bộ các công việc được giao xuống cho phía client, và khi đó server chỉ đóng vai trò là một `web api`, cung cấp các endpoint sử dụng `SOAP` hay `Resful`... gì đó để tương tác với client.

> Các vấn đề quan trọng như **phân quyền**, **tương tác với DB**... thì **vẫn phải** nằm trên phía server, nói chung tất cả những gì liên quan đến dữ liệu nhạy cảm/ quan trọng thì **bắt buộc** phải để trên phía server, client dù phức tạp đến đâu thì *source code* vẫn nằm trên phía client, và user nếu **(có thể)** thì vẫn có thể làm bất cứ những gì họ muốn trên *browser* hay *device* của họ.

**So sánh giữa SSR và CSR khi sử dụng React**

![Server side rendering](https://cdn-images-1.medium.com/max/800/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)

![Client side rendering](https://cdn-images-1.medium.com/max/800/1*CRiH0hUGoS3aoZaIY4H2yg.png)

> Các bạn có thể xem 2 hình trên để mường tượng về `SSR` và `CSR`, và cả hai mô hình này đều sử dụng framework `React`. Nên có nghĩa là không phải khi nào chúng ta sử dụng `Angular` `React` hay `Vue`... là mặc nhiên có nghĩa chúng ta đang áp dụng CRS bằng SPA (singple page application). 

> Do đó SSR hay CSR **là một khái niệm**, không phải là thứ dựa trên một công nghệ hay framework nào.

> Rất nhiều trang web lớn ở Việt Nam như: *Tiki, chợ tốt, Lazada*... đều sử dụng `SSR` và `kết hợp với SPA` framework (3 trang này đều xài React) cho phần front-end. Có nghĩa là server trả về thường là **một khung sườn** (mục đích thường là hỗ trợ `SEO`) của trang nào đó, sau đó sẽ dùng SPA(React) để làm nhiệm vụ render view, đắp css... cũng như giúp user tương tác tốt hơn với những tính năng hữu ích của client framework.

> *Mình không chắc lắm nhưng có lẽ `chotot` dùng `Nextjs` để render React trên phía server thì phải*. :D

> Nói chung **theo mình thấy** thiết kế tốt nhất để kết hợp cả hai *thế mạnh* của cả hai `SSR` và `CSR` là kết hợp cả hai lại chung với nhau, những dự án 

## Lựa chọn sử dụng SSR hay CSR, và khi nào?
 



