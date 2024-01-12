const { Router } = require("express");
const InvoicesController = require("../controllers/invoices.controller");
const db = require("../db/models/index");
const authMiddleware = require("../middlewares/auth.middleware");

class InvoicesRouter {
  path = "/invoices";
  router = Router();
  controller = new InvoicesController(db);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.router.get(
      `/contacts/:company_name`,
      authMiddleware,
      this.controller.findAll.bind(this.controller)
    );
    this.router.post(
      `${this.path}/add`,
      authMiddleware,
      this.controller.insertInvoice.bind(this.controller)
    );
    this.router.get(
      `${this.path}/`,
      authMiddleware,
      this.controller.getAll.bind(this.controller)
    );
  };
}
module.exports = InvoicesRouter;
