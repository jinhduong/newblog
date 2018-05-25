---
title: "Mã sạch - và con đường trở thành 1 devloper tốt hơn (1)"
date: 2016-10-24T12:06:48+08:00
tags:
    - clean code
---

![Imgur](http://i.imgur.com/ig8F5Ep.png)
Sáng thứ hai mọi người đi làm còn mình thì đi coffee một mình :D. Đang thất nghiệp ahiuhiu. Với một thằng coder nói cho đúng được ngồi mình nhâm nhi ly cà phê nhìn lại cuộc sống cũng là tuyệt vời rồi. Nhất là có thời gian suy nghĩ viết ba cái thứ linh tinh cho vui vẻ :). Nhớ lại câu thằng bạn nói: "Trong bóng đá có được mấy người ung dung tự tại đâu" nên nhiều khi muốn ung dung đâu phải dễ :D.

# Mã sạch (clean code) là gì? Làm sao biết code nào sạch code nào không?
Thôi quay lại vấn đề chính là **mã sạch** (clean code) - Vậy mã sạch là gì? Tại sao developer chúng ta cần mã sạch, nó liên quan gì đến chuyện trở thành một **developer tốt hơn**. Có bạn trả lời **mã sạch** đương nhiên là mã không bị dơ rồi :D. Cũng đúng vậy mã như thế nào là mã không được sạch (dùng từ dơ thấy thô thô quá :D). Xem thử đoạn code dưới đây nhé:

  	public object calTotalCost(){
      var list = Products.getItems();
      var totalCost =0;

      if(list != null){
          foreach (var item in list)
          {
              totalCost += item.getCost();

              if(totalCost > user.Balance){
                  return ErrorMessage("User balance not enough");
              }
          }
      }

      return totalCost;
  	}

Trong đoạn code này những thứ gì bạn cảm thấy nó **không được sạch lắm**? Chắc nhiều bạn nhìn vào kiu là: m* thằng này code ngu vãi, giờ này còn ai code chuối như vậy nữa :D. Hehe chịu thôi, trước mình cũng code ngu và thiếu trách nhiệm như vậy ak :D.Có điều lâu lắm rồi nha giờ bớt rầu (-_-). Mình phải về quê trốn thằng maintain cả nằm trời =]] .Nên giờ chia sẽ lại cho những bạn nào còn chưa giác ngộ về clean code :D 

Quay lại cái example, đoạn code này có rất nhiều vấn đề về clean code

1. **[Meaningful names]** Tên biến rất là đ** có chút ý nghĩa gì. Thằng code mấy dòng này nó code xong chạy ok, no problem, tuyệt vời. Sau 3 tháng features mới nhiều và có liên quan tới phần code này, quay lại đọc chả hiểu nó làm cái mọe gì - phải lại đọc code, debug để biết nó làm cái gì, ác hơn đọc cũng chả biết là cái gì, phắt -> tốn rất nhiều giời gian vô ích -> fail
    
2.  **[Don't return null]** Tự dưng cái hàm `getItems` trả lại null làm cái beep gì để tốn cái công phải kiểm tra null ta, cứ chỗ nào xài là phải tốn công kiểm tra null, cũng khá là dư thừa phải không? cái chúng ta muốn chỉ là đơn giản lấy danh sách sản phẩm và tính tổng tiên thôi mà. Thay vì return null chúng ta có thể trả về một `empty list`.

3. **[CLass, method does one thing well]** Tuyệt vời, một hàm mà làm được cả hai chức năng nếu có kết quả trả về thì biết tổng sản phẩm của khách hàng này mua, còn lỗi thì biết khách hàng mua quá số tiền hiện có. Nhưng cuối cùng thì được gì chỉ là gây khó khăn để hiểu, phải document rườm rà để giải thích, gây khó khăn cho mấy đồng nghiệp khác sử dụng method này, gặp mình dẹp m** luôn viết hàm khác cho khỏe :D 

Ví dụ của mình quá lộ liễu phải không ta? Nhìn vào là thấy bà nó rầu, phân với chả tích :D. Nhưng đó là **một trong rất nhiều vấn đề** về **mã sạch** (clean code) mà khi chúng ta muốn trở thành một developer tốt hơn chúng ta cần phải quan tâm, những bậc cao nhân trong nghiệp lập trình, thì chỉ cần nhìn code thì chúng ta đã cảm thấy rất phê, những thứ cao siêu đầy kinh nghiệm ẩn chứa trong những dòng **code nhìn có vẻ thật quá đơn giản**.

# Biển trời kiến thức
Kiến thức và kinh nghiệm mình cũng chỉ có hạn nên cần phải đọc thêm bí kíp để biết thêm những gì ngoài kiến thức bé nhỏ của mềnh, và đây là hai cuốn sách mà nếu muốn uyên thâm hơn trong vấn đề clean code này các bạn nên tìm đọc:

- Clean Code (Robert C. Martin)
- The Clean Coder (cũng ông Robert C. Martin luôn)

Mình sẽ list lại cũng như bàn luận thêm về những gì được viết trong sách, thật ra nói clean code là gì đó **khá thực thể** nhưng nó cũng **khá là cảm tính** kiểu như chúng ta luôn thấy bạn gái đứa khác đẹp trong khi nó nghĩ ngược lại :D. Nhưng đây là những chia sẽ của các bậc tiền bối đầu ngành nên nó là những kinh nghiệm rất quý giá cho nghiệp lập trình chúng ta :)

## 1. Các chia sẽ của các bậc tiền bối về clean code

- `Clean code does one thing well.` (Bjarne Stroustrup) 
- `Clean code is simple and direct, clean code read like well-written prose.` (Grady Booch)
- `Clean code can be read, clean code should be literate. It has meaningful names` (Dave Thomas)
- `Clean code always looks like it was written by someone who cares.` (Micheal Feathers)
- `Reduced duplication, high expressiveness, and early building of simple abstractions.` (Ron Jeffries)
- `You know you are working on clean code when each routine you reads turns out to be pretty much what you expected.` (Ward Cunningham)

Với những chia sẽ về clean code này thì nó có thể thấm hoặc sẽ thấm với bất cứ lập trình viên nào, với bản thân mình là thế. Mình cũng chưa thể nào nói là đã hiểu hết những chia sẽ này, vì thật sự cũng không hiểu nó nói gì :D. Translate và xem thôi hehe...

## 2.Clean code rules

### 2.1 Meaningful names

**2.1.1 Use intention-revealing Names**

Đặt tên biến là một nghệ thuật trong lập trình đấy nhé,phải đặt cái tên phải thật là ý nghĩa, dể hiễu, đọc phát hiểu ngay, đúng ngữ pháp (vs mình =]]). Kiểu như Lê Văn Nhật, Lê Văn Mỹ (muốn con mình đi nước ngoài) hay Nguyễn Vàng, Nguyễn Hột Xòn (muốn con cái giàu có)... 

Đừng như Nguyễn Văn A, Nguyễn Văn B mà mấy ông thầy dạy lập trình hay lấy ra làm ví dụ nhé.Có lẽ cuộc đời thg Nguyễn Văn A là hay đc đem ra làm ví dụ nhất cuộc đời này. Kệ nó đi :D **Nói chung đặt tên biến trong lập trình rất quan trọng, project thành bại một do nó mà ra.**

Ví dụ:

    public List<Customer> GetData()
        {
            var list1 = new List<Customer>();
            var data = ServiceRepository.GetPlainCustomers();
            foreach(var item in data)
            {
                if (item != null && item.IsValid)
                    list1.Add(item);
            }
            return list1;
        }
*Đạo xanh, 2 tháng sau hay sau này là không biết nó làm cái nồi gì luôn ak. Phắt zu thằng viết ra hàm này.*

Như thế này thì tốt hơn nhiều phải không, bỏ thêm vài giây để suy nghĩ tên biến, tiết kiệm được hàng giờ đồng hồ sau này :)

    public List<Customer> GetValidCustomers()
        {
            var validCustomers = new List<Customer>();
            var plainCustomers = ServiceRepository.GetPlainCustomers();
            foreach(var customer in plainCustomers)
            {
                if (customer != null && customer.IsValid)
                    validCustomers.Add(customer);
            }
            return validCustomers;
        }

**2.1.2 Use Pronounceable Names**

    //BAD
    public class Customer
        {
            private DateTime joinhhmmdd;
            private DateTime lstloghhmmdd;
            private string custId = "ID123";
        }


    //GOOD
    public class Customer
        {
            private DateTime JoinTime;
            private DateTime LastLoginTime;
            private string CustomerId = "ID123";
        }

**2.1.3 Use Searchable Names**

    //BAD
    for(int j =0; j<34 ;j++){
        s += (t[j] * 4) / 5;
    }

    //GOOD
     int realDaysPerIdealDay = 4;
     const int WORK_DAYS_PER_WEEK =5;
     int sum 0;
     for(int i=0;i< NUMBER_OF_TASKS; i++)
     {
         int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
         int realTaskWeeks = (realTaskDays / WORK_DAYS_PER_WEEK);
         sum+=realTaskWeeks;
     }
   
Nguồn: http://jinhduong.github.io/coding/2016/10/24/ma-sach.html

Còn tiếp...

