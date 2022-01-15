import express from "express";
import { database } from "../config/helpers.js";

const ordersRouter = express.Router();
// GET ALL ORDERS
ordersRouter.get("/", (req, res) => {
  database
    .table("cthoadon as od")
    .join([
      {
        table: "hoadon as o",
        on: "o.id = od.order_id",
      },
      {
        table: "sanpham as sp",
        on: "sp.masp = od.masp", //đã sửa
      },
      {
        table: "khachhang as u",
        on: "u.id = o.user_id",
      },
    ])
    .withFields([`o.id`, `sp.tensp`, `od.soluong`, `sp.dongia`, `u.name`])
    .sort({ id: 1 })
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({
          message: `No orders found`,
        });
      }
    })
    .catch((err) => console.log(err));
});
//GET SINGLE ORDERS
ordersRouter.get("/:id", (req, res) => {
  const orderId = req.params.id;

  database
    .table("cthoadon as od")
    .join([
      {
        table: "hoadon as o",
        on: "o.id = od.order_id",
      },
      {
        table: "sanpham as sp",
        on: "sp.masp = od.masp", //sửa lại sau
      },
      {
        table: "khachhang as u",
        on: "u.id = o.user_id",
      },
    ])
    .withFields([`o.id`, `sp.tensp`, `od.soluong`, `sp.dongia`, `u.name`])
    .filter({ "o.id": orderId })
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({
          message: `No orders found with orderId ${orderId}`,
        });
      }
    })
    .catch((err) => console.log(err));
});

//PLACE A NEW ORDER
ordersRouter.get("/new", (req, res) => {
  let { userId, sanpham } = req.body;
  if (userId != null && userId > 0 && !isNaN(userId)) {
    database
      .table("hoadon")
      .insert({
        user_id: userId,
      })
      .then((newOrderId) => {
        if (newOrderId > 0) {
          sanpham.forEach(async (p) => {
            let data = await database
              .table("sanpham")
              .filter({ masp: p.masp })
              .withFields(["soluong"])
              .get();
            //Deduct the number of pieces ordered from the quantity column in database
            let inCart = p.incart;
            if (data.soluong > 0) {
              data.soluong = data.quantity - inCart;
              if (data.soluong < 0) {
                data.soluong = 0;
              }
            } else {
              data.soluong = 0;
            }
            //INSERT ORDER DETAILS W.R.T THE NEWLY GENERATED ORDER ID
            database
              .table("cthoadon")
              .insert({
                order_id: newOrderId,
                masp: p.masp,
                soluong: inCart,
              })
              .then((newId) => {
                database
                  .table("sanpham")
                  .filter({ masp: p.masp })
                  .update({
                    soluong: data.soluong,
                  })
                  .then((successNum) => {})
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          });
        } else {
          res.json({
            message: "new order failed while adding order details",
            success: false,
          });
        }
        res.json({
          message: `Order successfully placed with order id ${newOrderId}`,
          success: true,
          order_id: newOrderId,
          masp: sanpham,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.json({
      message: "new Order failed",
      success: false,
    });
  }
});
// FAKE PAYMENT GATEWAY CALL
ordersRouter.post("/payment", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ success: true });
  }, 3000);
});
export default ordersRouter;
