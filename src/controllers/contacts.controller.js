/* eslint-disable no-undef */
const { Op } = require("sequelize");

class ContactsController {
  constructor(db) {
    this.db = db;
  }

  async getAll(req, res) {
    try {
      // This line uses the await keyword to wait for the asynchronous operation of fetching all records from the model (which is expected to have a findAll method).
      // The result is stored in the output variable.
      const output = await this.db.contacts.findAll();
      // If the operation is successful, it sends a JSON response with the fetched data.
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add new contact
  async insertOne(req, res) {
    const { companyName, uen, customerName, email, phone } = req.body;
    try {
      // Add new contact
      const newContact = await this.db.contacts.create({
        company_name: companyName,
        uen: uen,
        customer_name: customerName,
        email: email,
        phone: phone,
      });
      // Respond with new contact
      return res.json(newContact);
    } catch (err) {
      console.log("error:", err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //WHEN USER SEARCH COMPANY NAME, it able to retrieve specific contact
  // [Op.like]: '%hat',
  async findAll(req, res) {
    const { company_name } = req.params;
    try {
      const contact = await this.db.contacts.findAll({
        where: { company_name: { [Op.like]: `%${company_name}%` } },
      });
      console.log({ company_name: { [Op.like]: `%${company_name}` } });
      return res.json(contact);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // TODO: EDIT & DELETE
}
module.exports = ContactsController;
