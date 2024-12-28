let routes = require("express").Router();
const puppeteer = require("puppeteer");
const path = require("path")
let Order = require("../models/Order")

routes.get("/:id", async(req, res)=>{
    let oid = req.params.id;
    let result = await Order.find({_id : oid}).populate("user_id").populate("product_id").exec();
    // console.log(result[0]);
    let product_info = result[0].product_id;
    let user_info = result[0].user_id;
    let order_info = result[0]

    let orderDate = new Date(order_info.orderdate).getDate()+"/"+(new Date(order_info.orderDate).getMonth+1)+"/"+new Date(order_info.orderdate).getFullYear();

    // return;
    async function convertHTMLToPDF(htmlContent, outputPath) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        await page.setContent(htmlContent);
        await page.pdf({
          path: outputPath,
          format: "A4",
          printBackground: true, // Ensures backgrounds are rendered
        });
        // await page.emulateMediaType("print"); // Or 'print'
      
        await browser.close();
        console.log(`PDF created at ${outputPath}`);
      }
      
      const htmlContent = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
            /* @media print { */
            body {
              display: flex;
              justify-self: center;
              justify-items: center;
              align-items: center;
              flex-direction: column;
              width: 90%;
              font-family: "Inter";
            }
            .col-2 {
              width: 100%;
              display: flex;
              justify-content: space-between;
            }
            .col-2 h2:first-child {
              font-weight: 500;
              color: #3d4d88;
            }
            .invoice-details {
              border-collapse: collapse;
            }
            .invoice-details tr th {
              text-align: right;
              padding-right: 20px;
            }
            .invoice-details tr td {
              text-align: center;
              border: 1px solid black;
              padding: 8px;
            }
            .heading-color {
              background-color: #3b4d88;
              color: white;
              font-weight: 600;
              padding: 3px 0 3px 20px;
              width: 250px;
            }
            .padding-left-20 {
              padding-left: 20px;
            }
            .invoice-item {
              width: 100%;
              border-collapse: collapse;
              text-align: left;
              font-size: 16px;
              margin-top: 20px;
              border: 2px solid black;
            }
            .invoice-item th {
              background-color: rgb(59, 77, 136);
              color: white;
              padding: 3px;
              border: 1px solid rgb(59, 77, 136);
            }
            .invoice-item tr th:first-child {
              padding-left: 18px;
            }
            .invoice-item td {
              padding: 3px;
              border: 1px solid rgb(221, 221, 221);
            }
            .invoice-item tr:nth-child(even) {
              background-color: rgb(242, 242, 242);
            }
            .invoice-item tr:nth-child(odd):not(:first-child) {
              background-color: rgb(255, 255, 255);
            }
            .calculated-price {
              width: 300px;
            }
            .calculated-price td {
              padding: 0;
            }
            .calculated-price .cal-heading {
            }
            .calculated-price .cal-data {
              text-align: right;
            }
            /* } */
          </style>
        </head>
        <body>
          <div class="col-2">
            <h2>Famms Ltd.</h2>
            <h2 class="doc-type">INVOICE</h2>
          </div>
          <div class="col-2">
            <p class="padding-left-20">
              M.G.Road, Goregaon <br />
              Mumbai, 452001 <br />
              Phone: 1234-454-789 <br />
              Website: famms.com
            </p>
            <table class="invoice-details">
              <tr>
                <th>DATE</th>
                <td>${orderDate}</td>
              </tr>
              <tr>
                <th>INVOICE <i>#</i></th>
                <td>[123456]</td>
              </tr>
              <tr>
                <th>CUSTOMER ID</th>
                <td>${order_info.invoice_id}</td>
              </tr>
              
            </table>
          </div>
          <div class="col-2">
            <div>
              <div class="heading-color">BILL TO</div>
      <p class="padding-left-20">
                ${user_info.name} <br />
                ${user_info.address} <br />
                
                ${user_info.contact}
              </p>
            </div>
          </div>
          <table class="invoice-item">
            <tr>
              <th>DESCRIPTION</th>
              <th>UNIT PRICE</th>
              <th>QTY</th>
              <th>DISCOUNT</th>
              <th>CHARGE</th>
              <th>PAYMENT MODE</th>
              <th>AMOUNT</th>
            </tr>
            <tr>
              <td>${product_info.title}</td>
              <td>${product_info.price}</td>
              <td>2</td>
              <td>-${ product_info.price * product_info.discount/100}</td>
              <td>+200</td>
              <td>${order_info.mode}</td>
            </tr>
            
          </table>
          <div class="col-2">
            <p class="padding-left-20" style="width: 55%">
              COMMENTS: <br />
              <br />
              1. Total payment due in 30 days <br />
              2. Please include the invoice number on your check
            </p>
            <table class="calculated-price">
              <tr>
                <td>Subtotal</td>
                <td class="cal-data">600.00</td>
              </tr>
              <tr>
                <td>Taxable</td>
                <td class="cal-data">75.00</td>
              </tr>
              <tr>
                <td>Tax Rate</td>
                <td class="cal-data">6.25%</td>
              </tr>
              <tr>
                <td>Tax Due</td>
                <td class="cal-data">4.69</td>
              </tr>
              <tr>
                <td>Other</td>
                <td class="cal-data">-</td>
              </tr>
              <tr>
                <td>Total</td>
                <td class="cal-data">$ 604.69</td>
              </tr>
            </table>
          </div>
          <p style="width: 500px; text-align: center">
            If you have any questions about this invoice, Please Contact
            <b>[Name, Phone, E-mail]</b><br /><b
              ><i>Thank you for your business!</i></b
            >
          </p>
        </body>
      </html>
      
      `;
      
      await convertHTMLToPDF(htmlContent, path.resolve()+"/assets/invoice/"+order_info.invoice_id+".pdf");
      res.send({filename : order_info.invoice_id+".pdf"})
      
})

module.exports = routes;