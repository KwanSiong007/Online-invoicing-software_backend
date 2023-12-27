//! In invoice pg, find customer details.
//! INCLUDE PDF KIT: insertOne
//! SAVE THE LINK OF PDF
// ADD THE LINK OF PDF IN EMAIL
// STRIPE IN THIS FILE

const { Op } = require("sequelize");

class InvoicesController {
  constructor(db) {
    this.db = db;
  }

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

  // Add new invoice details in table:invoices & invoice_items, in order to create new invoice
  async insertInvoice(req, res) {
    const {
      customerID,
      companyName,
      uen,
      customerName,
      email,
      phone,
      invoiceNumber,
      issueDate,
      dueDate,
      invoiceItem,
      description,
      quantity,
      priceOfEachItem,
      totalPrice,
      gst,
      totalAmountWithGst,
    } = req.body;
    try {
      // Add new invoice details
      const newInvoice = await this.db.invoices.create({
        customer_id: customerID,
        company_name: companyName,
        uen: uen,
        customer_name: customerName,
        email: email,
        phone: phone,
        invoice_no: invoiceNumber,
        issue_date: issueDate,
        due_date: dueDate,
      });
      const newInvoiceItems = await this.db.invoice_items.bulkCreate([
        {
          invoice_id: newInvoice.id,
          invoice_item: invoiceItem,
          description: description,
          quantity: quantity,
          price_of_each_item: priceOfEachItem,
          total_price: totalPrice,
          gst: gst,
          total_amount_with_gst: totalAmountWithGst,
        },
      ]);
      // Respond with new invoice details
      return res.json(newInvoice);
    } catch (err) {
      console.log("error:", err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    try {
      // This line uses the await keyword to wait for the asynchronous operation of fetching all records from the model (which is expected to have a findAll method).
      // The result is stored in the output variable.
      const output = await this.db.invoices.findAll();
      // If the operation is successful, it sends a JSON response with the fetched data.
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
module.exports = InvoicesController;
