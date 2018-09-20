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

> *Giải quyết* ở đây là tất cả các công việc từ routing, phân quyền, render html,... nói chúng tất cả mọi thứ sẽ do server đảm nhiệm. Client có thể nhận một phần trong đó, nhưng **ko phải là hoàn toàn**.

### CSR là gì?
Ngược lại với SSR thì CSR là khái niệm mà toàn bộ các công việc được giao xuống cho phía client, và khi đó server chỉ đóng vai trò là một `web api`, cung cấp các endpoint sử dụng `SOAP` hay `Resful`... gì đó để tương tác với client.

> Các vấn đề quan trọng như **phân quyền**, **tương tác với DB**... thì **vẫn phải** nằm trên phía server, nói chung tất cả những gì liên quan đến dữ liệu nhạy cảm/ quan trọng thì **bắt buộc** phải để trên phía server, client dù phức tạp đến đâu thì *source code* vẫn nằm trên phía client, và user nếu có kiến thức thì vẫn có thể làm bất cứ những gì họ muốn.

**So sánh giữa SSR và CSR khi sử dụng React**

![Server side rendering](https://cdn-images-1.medium.com/max/800/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)

![Client side rendering](https://cdn-images-1.medium.com/max/800/1*CRiH0hUGoS3aoZaIY4H2yg.png)

## Lựa chọn sử dụng SSR hay CSR, và khi nào?
 



