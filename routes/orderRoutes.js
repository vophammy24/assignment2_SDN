const express = require("express");
const router = express.Router();

const {
    getAllOrders,
    showCreateOrderForm,
    createOrder,
    deleteOrder,
    showUpdateForm,
    updateOrder
} = require("../controllers/orderController");

router.route("/orders")
  .get(getAllOrders)
  .post(createOrder);

router
  .route("/orders/new")
  .get(showCreateOrderForm);

router.route("/orders/:id/delete")
  .post(deleteOrder);

router.route("/orders/:id/edit")
  .get(showUpdateForm);

router.route("/orders/:id/update")
  .post(updateOrder);


module.exports = router;