---
title: "Create Data Transfer Objects (DTOs)"
date: 2018-09-19T15:16:28+08:00
draft: true
tags:
    - dto
    - csharp
---

# Lý do tại sao cần DTOs (Data Transfer Objects)

Ngay khi `API` của bạn (**expose** -  phơi bày) hay dễ hiểu hơn là khi **đưa các đối tượng thực thể** (entity) ở lớp database xuống phía client. Sau đó, client nhận những dữ liệu cái được map trực tiếp đến database của bạn. Tuy nhiên, nó không luôn phải là một ý tưởng thông minh. Nhiều lúc bạn cũng nên thay đổi hình dạng của dữ liệu mà bạn dự định sẽ gửi xuống client. Ví dụ, bạn có thể áp dụng ở những trường hợp như này:

- Loại bỏ những tham chiếu vòng tròn **(circular references)**
- Loại bỏ các thuộc tính cụ thể nào đó mà **client không cần sử dụng**
- Bỏ qua một vài thuộc tính không cần thiết để **giảm dung lượng payload** 
- **Làm phẳng** object graphs (đồ thị của đối tượng) mà ở đó chứa các object lồng nhau. Để giúp chúng tiện lợi hơn khi làm việc dưới phía client (khi sử dụng các SPA framwork chẳng hạn)
- Tránh các lỗ hỗng vì **đưa ra quá nhiều dữ liệu** ("over-posting" vulnerabilities)
- **Tách** lớp dịch vụ (service) và lớp dữ liệu (database) **độc lập** với nhau.

# Một vài chú ý

## Làm phẳng bằng một đối tượng DTOs 

``` csharp
namespace BookService.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Account Author { get; set; }
    }
}
```

``` csharp
namespace BookService.Models
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
    }
}
```
Nếu chúng ta trả về một object `Book` theo thông thường thì bên trong object `Book` sẽ chứa thêm một object `Author` với kiểu dữ liệu là `Account` thì khi trả xuống client sẽ có định dạng giống như thế này:
``` json
{
  "id": 1,
  "title": "Clean Code",
  "author": {
    "id": 2,
    "name": "Robert Cecil Martin"
  }
}
```
### Hiệu quả và ứng dụng
Thì việc làm phẳng dữ liệu như bên dưới ngoài việc khiến dữ liệu **gọn gàng, dễ hình dung hơn**. Ngoài ra nó còn sẽ giúp chúng ta **dễ dàng thao tác** với dữ liệu dưới tầng client hơn. Thêm một hiệu ứng tích cực kèm theo là **tiết kiệm dung lượng** nhận về ở phía client.
```csharp
from b in db.Books
    select new BookDTO()
    {
        Id = b.Id,
        Title = b.Title,
        AuthorName = b.Author.Name
    };
```
Dữ liệu trả về sẽ tương tự như này:
```json
{
  "id": 1,
  "title": "Clean Code",
  "authorName": "Robert Cecil Martin"
}
```
### Sql generated
```sql
SELECT 
    [Extent1].[Id] AS [Id], 
    [Extent1].[Title] AS [Title], 
    [Extent2].[Name] AS [Name]
    FROM  [dbo].[Books] AS [Extent1]
    INNER JOIN [dbo].[Authors] AS [Extent2] ON [Extent1].[AuthorId] = [Extent2].[Id]
```

## [.net and ef core] Mapper với DTO object
