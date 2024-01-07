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
  async edit(req, res) {
    //Extracts the data from the request body and assigns it to a variable named newValues.
    const newValues = req.body;
    //Extracts the id parameter from the request's parameters and assigns it to a variable named id.
    const { id } = req.params;
    //Calls the update function on the database to update contact records.
    //It awaits the result and extracts the number of updated rows, storing it in rowsUpdatedCount
    const [rowsUpdatedCount] = await this.db.contacts.update(
      //Passes the values from newValues as the updated data for the contact record.
      //Specifies the condition for updating records - it updates the record where the id matches the extracted id from the request parameters.
      { ...newValues },
      {
        where: {
          id,
        },
      }
    );
    //Sends a JSON response with a status code of 200 (OK) and includes information about the number of rows updated in the database (rowsUpdatedCount).
    res.status(200).json({ updated: rowsUpdatedCount });
  }
}
module.exports = ContactsController;
