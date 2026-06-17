const Order = require("../models/orderModel");
const Product = require("../models/productModel");

function calculateTotalAmount(unitPrice, quantity, totalPrice) {
    totalPrice = unitPrice * quantity;
    return totalPrice;
}

function formatDateTimeForInput(date) {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().sort({ startTime: 1 });

    return res.render("order", {
      title: "Procduct Orders",
      orders
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function showCreateOrderForm(req, res) {
  try {
    const products = await Product.find().sort({ unitPrice: 1 }).lean();

    return res.render("createOrder", {
      title: "Create New Order",
      products,
      error: null
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function createOrder(req, res) {
  try {
    const { customerName, productName, quantity, orderDate } = req.body;

    if (!customerName || !productName || !quantity || !orderDate) {
      const products = await Product.find().sort({ productName: 1 }).lean();

      return res.render("createOrder", {
        title: "Create New Order",
        products,
        error: "All fields are required."
      });
    }

    const product = await Product.findOne({ productName });

    if (!product) {
      const products = await Product.find().sort({ productName: 1 }).lean();

      return res.render("createOrder", {
        title: "Create New Order",
        products: products.map((product) => mapProduct(product)),
        error: "This products does not exist in the system."
      });
    }

    const totalPrice = calculateTotalAmount(quantity, product.unitPrice);

    await Order.create({
      customerName,
      productName,
      quantity,
      orderDate,
      totalPrice
    });

    return res.redirect("/orders");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    return res.redirect("/orders");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function showUpdateForm(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    const products = await Product.find().sort({ unitPrice: 1 });

    if (!order) {
      return res.status(404).send("Booking not found.");
    }

    return res.render("updateOrder", {
      title: "Update Order",
      order,
      products,
      error: null,
      formatDateTimeForInput
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { customerName, productName, quantity, orderDate } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).send("Order not found.");
    }

    const product = await Product.findOne({ productName });

    if (!product) {
      const products = await Product.find().sort({ productName: 1 });

      return res.render("updateOrder", {
        title: "Update Order",
        order,
        products,
        error: "This product does not exist in the system.",
        formatDateTimeForInput
      });
    }


    const totalPrice = calculateTotalAmount(quantity, product.unitPrice);

    order.customerName = customerName;
    order.productName = productName;
    order.quantity = quantity;
    order.orderDate = orderDate;
    order.totalPrice = totalPrice;

    await order.save();

    return res.redirect("/orders");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllOrders,
  showCreateOrderForm,
  createOrder,
  deleteOrder,
  showUpdateForm,
  updateOrder
};