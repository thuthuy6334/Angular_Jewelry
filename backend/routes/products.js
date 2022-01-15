import express from "express";
import { database } from "../config/helpers.js";

const productsRouter = express.Router();

/* GET ALL PRODUCTS. */
productsRouter.get("/", function (req, res) {
  let page =
    req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1; // set the current page number
  const limit =
    req.query.limit !== undefined && req.query.limit !== 0
      ? req.query.limit
      : 100; // set the limit of ites per page
  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; //0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 50;
  }

  database
    .table("sanpham as sp")
    .join([
      {
        table: "loaisp as lsp",
        on: `lsp.malsp = sp.malsp`,
      },
    ])
    .withFields([
      " lsp.tenlsp as tenlsp",
      " lsp.malsp as malsp",
      "sp.tensp",
      "sp.mota",
      "sp.dongia",
      "sp.hinh",
      "sp.soluong",
      "sp.masp",
    ])
    .slice(startValue, endValue)
    .sort({ masp: 0.1 })
    .getAll()
    .then((prods) => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length, //đếm số lượng sản phẩm
          products: prods,
        });
      } else {
        res.json({ message: "No products founds" });
      }
    })
    .catch((err) => console.log(err));
});

/* GET SINGLE PRODUCTS. */
productsRouter.get("/:prodId", function (req, res) {
  let productId = req.params.prodId;
  console.log(productId);

  database
    .table("sanpham as sp")
    .join([
      {
        table: "loaisp as lsp",
        on: "lsp.malsp = sp.malsp",
      },
    ])
    .withFields([
      "lsp.tenlsp as tenlsp",
      "lsp.malsp as malsp",
      "sp.tensp",
      "sp.mota",
      "sp.dongia",
      "sp.hinh",
      "sp.soluong",
      "sp.masp",
    ])
    .filter({
      "sp.masp": productId,
    })
    .get()
    .then((prod) => {
      if (prod) {
        res.status(200).json(prod);
      } else {
        res.json({ message: "No products founds with product id $productId" });
      }
    })
    .catch((err) => console.log(err));
});

// GET ALL PRODUCTS FROM ONE PARTICULAR LOAISP
productsRouter.get("/loaisp/:tenlsp", function (req, res) {
  // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
  let page =
    req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1; // set the current page number
  const limit =
    req.query.limit !== undefined && req.query.limit !== 0
      ? req.query.limit
      : 20; // set the limit of ites per page
  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; //0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 20;
  }
  const tenlsp_lsp = req.params.tenlsp;

  database
    .table("sanpham as sp")
    .join([
      {
        table: "loaisp as lsp",
        on: `lsp.malsp = sp.malsp WHERE lsp.tenlsp LIKE '%${tenlsp_lsp}%'`,
      },
    ])
    .withFields([
      "lsp.tenlsp as tenlsp",
      "sp.tensp",
      "sp.mota",
      "sp.dongia",
      "sp.hinh",
      "sp.soluong",
      "sp.masp",
    ])
    .slice(startValue, endValue)
    .sort({ masp: 0.1 })
    .getAll()
    .then((prods) => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length, //đếm số lượng sản phẩm
          products: prods,
        });
      } else {
        res.json({ message: `No products founds from $ { tenlsp_lsp }` });
      }
    })
    .catch((err) => console.log(err));
});

//show sản phẩm Bông tai
productsRouter.get("/loaisp/Bông tai", function (req, res) {
  // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
  let page =
    req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1; // set the current page number
  const limit =
    req.query.limit !== undefined && req.query.limit !== 0
      ? req.query.limit
      : 20; // set the limit of ites per page
  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; //0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 20;
  }

  database
    .table("sanpham as sp")
    .join([
      {
        table: "loaisp as lsp",
        on: `lsp.malsp = sp.malsp WHERE lsp.tenlsp LIKE '%Kẹo%'`,
      },
    ])
    .withFields([
      "lsp.tenlsp as tenlsp",
      "sp.tensp",
      "sp.mota",
      "sp.dongia",
      "sp.hinh",
      "sp.soluong",
      "sp.masp",
    ])
    .slice(startValue, endValue)
    .sort({ masp: 0.1 })
    .getAll()
    .then((prods) => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length, //đếm số lượng sản phẩm
          products: prods,
        });
      } else {
        res.json({ message: `No products founds from Bông tai` });
      }
    })
    .catch((err) => console.log(err));
});
//show sản phẩm socola
productsRouter.get("/loaisp/Chocolate", function (req, res) {
  // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
  let page =
    req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1; // set the current page number
  const limit =
    req.query.limit !== undefined && req.query.limit !== 0
      ? req.query.limit
      : 20; // set the limit of ites per page
  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; //0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 20;
  }

  database
    .table("sanpham as sp")
    .join([
      {
        table: "loaisp as lsp",
        on: `lsp.malsp = sp.malsp WHERE lsp.tenlsp LIKE '%Chocolate%'`,
      },
    ])
    .withFields([
      "lsp.tenlsp as tenlsp",
      "sp.tensp",
      "sp.mota",
      "sp.dongia",
      "sp.hinh",
      "sp.soluong",
      "sp.masp",
    ])
    .slice(startValue, endValue)
    .sort({ masp: 0.1 })
    .getAll()
    .then((prods) => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length, //đếm số lượng sản phẩm
          products: prods,
        });
      } else {
        res.json({ message: `No products founds from Chocolate` });
      }
    })
    .catch((err) => console.log(err));
});
export default productsRouter;
