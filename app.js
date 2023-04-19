// thư viện có sẵn từ node JS
const path = require('path');

//  Thư viện chưa có sẵn từ Node JS, được sử dụng
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Kết nối hàm với controller
const errorController = require('./controllers/error');
const User = require('./models/user'); // Trích xuất class từ model và sử dụng các chức năng đã viết sẵn trong model

const app = express();

// Định nghĩa cấu hình cho tệp views
app.set('view engine', 'ejs');
app.set('views', 'views');

// Lấy hàm trích xuất về để chèn route
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // Dùng để thay đổi tệp dữ liệu từ req gửi lên
app.use(express.static(path.join(__dirname, 'public'))); // Kết nối đường dẫn tương đối với các file public

// Xác định người dùng trong app
app.use((req, res, next) => {
  User.findById('64226d739f9f5a4518e96f0c')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes); // route trang shop nhưng là tập con của route admin
app.use(shopRoutes); // route trang chủ

app.use(errorController.get404); // Trang hiển thị sai đường dẫn, hoạc đường dẫn chưa được định nghĩa

mongoose
  // Kết nối dữ liệu bằng link
  .connect(
    'mongodb+srv://Userdb:SgvOBym6vNUZnBoO@atlascluster.opdyakh.mongodb.net/schema?retryWrites=true'
  )
  .then((result) => {
    // Tìm người dùng đầu tiên, ngoài ra có thể thêm điều kiện trong hàm
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'jaykiby',
          email: 'hackerworld@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
