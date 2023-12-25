const { Router } = require("express");
const InvoicesController = require("../controllers/invoices.controller");
const db = require("../db/models/index");

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
      this.controller.findAll.bind(this.controller)
    );
    this.router.post(
      `${this.path}/add`,
      this.controller.insertInvoice.bind(this.controller)
    );
    this.router.get(
      `${this.path}/`,
      this.controller.getAll.bind(this.controller)
    );
  };
}
module.exports = InvoicesRouter;
