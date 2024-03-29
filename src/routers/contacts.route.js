/* eslint-disable no-undef */
const { Router } = require("express");
const ContactsController = require("../controllers/contacts.controller");
const db = require("../db/models/index");
const authMiddleware = require("../middlewares/auth.middleware");

class ContactsRouter {
  path = "/contacts";
  router = Router();
  controller = new ContactsController(db);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.router.get(
      `${this.path}/`,
      authMiddleware,
      this.controller.getAll.bind(this.controller)
    );
    this.router.post(
      `${this.path}/add`,
      authMiddleware,
      this.controller.insertOne.bind(this.controller)
    );
    this.router.get(
      `${this.path}/:company_name`,
      authMiddleware,
      this.controller.findAll.bind(this.controller)
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      this.controller.edit.bind(this.controller)
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.controller.delete.bind(this.controller)
    );
  };
}
module.exports = ContactsRouter;
