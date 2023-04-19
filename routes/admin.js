const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

// Mỗi đối số thứ 2 sẽ nhận về một hàm res và req

// POST thì sẽ chủ yếu làm về req, còn GET sẽ làm về res

// Sẽ có các hàm lấy cả 2 vì nó sẽ lấy một phần dữ liệu để truy vấn và in ra một dữ liệu khác

const router = express.Router();

// // /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
