const express = require("express");
const axios = require("axios");
require("dotenv").config();

const fs = require("fs"); // get statis data from json file instead of postman

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN; // Replace with real token
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID;

app.post("/webhook", async (req, res) => {
  try {
    // console.log("📩 Incoming HubSpot Payload:", req.body);
    // req.body =  {
    // "eventId": "123456",
    // "eventType": "deal.propertyChange",
    // "propertyName": "dealstage",
    // "objectId": "56789",
    // "objectType": "DEAL",
    // "propertyValue": "closedwon",
    // "dealName": "Acme Corp Implementation",
    // "dealAmount":"25000",
    // "contactEmail":"john@gmail.com"
    // }

    // ✅🚗 trying - reading payload fro  JSON file
    const rawDATA = fs.readFileSync("sampleHubspotPayload.json", "utf-8");
    // console.log("GET: from json file rawdata: - ",rawDATA);
    const payload = JSON.parse(rawDATA);
    // console.log("payload parsedata: - ", payload);

    // const data = req.body;
    // console.log("hubspot data - ", data);

    const {
      dealName,
      propertyValue,
      dealAmount,
      contactEmail,
      propertyName,
      eventType,
    } = payload;

    if (!dealName || !propertyValue || !dealAmount || !contactEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    } // ✅ Safe column values

    const columnValuesObj = {
      status: { label: propertyValue },
      numeric_mks4bkab: Number(dealAmount),
      email_mks4qetf: {
        email: contactEmail,
        text: contactEmail,
      },
      text_mks4538k: eventType,
      text_mks4mffh: propertyName,
    };

    const columnValuesStr = JSON.stringify(columnValuesObj).replace(
      /"/g,
      '\\"'
    );

    const mutation = {
      query: `
        mutation {
            create_item(
                board_id: ${MONDAY_BOARD_ID},
                item_name: "${dealName}",
                column_values: "${columnValuesStr}",
                create_labels_if_missing: true
            ) {
                id
            }
        }
     `,
    };

    const response = await axios.post(MONDAY_API_URL, mutation, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MONDAY_API_TOKEN}`,
      },
    });

    const itemId = response.data?.data?.create_item?.id;
    console.log("response data item creation-: ", response.data);

    console.log("Item created:---------", itemId);

    res.status(200).json({ success: true, itemId });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
