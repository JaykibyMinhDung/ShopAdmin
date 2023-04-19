const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop'); // Lấy các hàm từ trong thư mục shop ra

const router = express.Router(); // Lấy libary của express

// Mỗi đối số thứ 2 sẽ nhận về một hàm res và req

// POST thì sẽ chủ yếu làm về req, còn GET sẽ làm về res

// Sẽ có các hàm lấy cả 2 vì nó sẽ lấy một phần dữ liệu để truy vấn và in ra một dữ liệu khác

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router; // Sau đó sẽ xuất ra file khác
