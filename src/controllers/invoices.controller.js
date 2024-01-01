//! In invoice pg, find customer details.
//! INCLUDE PDF KIT: insertOne
//! SAVE THE LINK OF PDF
// ADD THE LINK OF PDF IN EMAIL
// STRIPE IN THIS FILE

const { Op } = require("sequelize");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const { storage } = require("../firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const STORAGE_KEY = "pdf-doc/";

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

      // initializes a new PDF document using PDFKit.
      const pdfDoc = new PDFDocument();

      // Set up the file path and name for the PDF
      const pdfPath = `invoice_${newInvoice.id}.pdf`;
      // a writable stream is created using the Node.js File System (fs) module.
      // This stream is associated with the file path created in the previous line.
      const pdfStream = fs.createWriteStream(pdfPath);
      // This line establishes a connection between the PDF document (pdfDoc) and the writable stream (pdfStream).
      // It means that the content generated by the PDF document will be written to the specified file path through the stream.
      pdfDoc.pipe(pdfStream);

      pdfDoc.text(`Invoice Number: ${invoiceNumber}`);
      pdfDoc.text(`Issue Date: ${issueDate}`);
      pdfDoc.text(`Due Date: ${dueDate}`);
      pdfDoc.moveDown();
      // Define the table
      const table = {
        headers: [
          "Invoice Item",
          "Description",
          "Quantity",
          "Price Of Each Item",
        ],
        rows: [
          [invoiceItem, description, quantity, priceOfEachItem],
          // Add more rows here as needed
        ],
      };

      // This line instructs the PDF document (pdfDoc) to create a table using the data specified in the table object.
      // prepareHeader is an option that defines how the table headers should be styled before they are added to the PDF.
      // pdfDoc.fillColor("#444") sets the text color of the headers to a dark gray (#444).
      // #fff is the hexadecimal code for white, so this line makes the background of the table rows white.
      await pdfDoc.table(table, {
        prepareHeader: () => pdfDoc.fontSize(12).fillColor("#444"),
        fillColor: "#fff",
      });
      //...other invoice details
      pdfDoc.end();

      // This line sets up an event listener for when the PDF stream has finished writing content.
      // When the PDF creation is complete, the function inside the block will be executed.
      pdfStream.on("finish", async function () {
        const fullStorageRef = ref(storage, STORAGE_KEY + pdfPath);
        // Reads the contents of the PDF file (specified by pdfPath) into a buffer (fileBuffer) synchronously using the Node.js File System (fs) module.
        const fileBuffer = fs.readFileSync(pdfPath);
        // Calls an asynchronous function (uploadBytes) to upload the contents of the file buffer to the specified storage reference (fullStorageRef).
        await uploadBytes(fullStorageRef, fileBuffer);
        const url = await getDownloadURL(fullStorageRef);
        // Update the newInvoice instance with the URL
        // This is a Sequelize method for updating the instance.
        await newInvoice.update({ pdf_url: url });
        //Synchronously deletes the local PDF file using the Node.js File System (fs) module. This is done after uploading to storage to clean up local resources.
        fs.unlinkSync(pdfPath);
        return res.json({ url });
      });

      pdfStream.on("error", function (err) {
        console.log("error:", err);
        return res.status(400).json({ error: true, msg: err });
      });
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
