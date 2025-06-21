# HubSpot → monday.com Integration (hubspot payload data)

## 🔧 Setup Instructions

1. Run `npm install express axios body-parser jest nodemom`
2. Start the server: `node index.js`
3. POST to `http://localhost:3000/webhook` with the sample payload.
4. TEST - `node test` -✅ Test Success
5. Sample test run in Private monday.com: https://view.monday.com/9424258790-ddec9d2cad0c8c255c08eac935803f29?r=use1

##### How to run without Postman: 🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️

Open Terminal: - Hit CURL cmd: `curl -X POST http://localhost:3000/webhook`

##### How to run with Postman: 🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️

1. VSCode Terminal : - `npm start`
2. Go to postman or any other platform:

   - Method: POST
   - Header: Content-type : Application/json
   - Body: body > raw > choose JSON : ( #optional to add JSON data cause we already taking static value from json file)
   - DONE: click Send - Success:

     {
     "success": true,
     "itemId": "9424225444"
     }

##### Code FILE Strcuture:

       - index.js
       - index2Test.js             - # Ingore this checking postman to run correct oper.
       - package.json
       - test.js
       - webhookHandler.js

## Design Reflection

### 1. How would you verify webhook authenticity in production?

We can use JWT signature verification or token using hubspot public key/token or verify with shared secreate in headers.

### 2. How to ensure idempotency?

We can track webhook `eventId` in a database or cache (e.g., Redis). Reject duplicates. it will avoid same operation multiple times has same effect as doing it once: ex:-
{"eventId: "12345, "dealName":"Acme Corp"} already run avoid if same eventID occurs.

### 3. How would you handle API rate limits?

- Monitor response codes (e.g., ErrorCode: 429) from API or monday.com API rate limit.
- Implement retries loop if this error occur 429 we can add set inetrval or timeout for few second and again run to avoid our ongoing operations.
- optimize graphQL queries to minimize complexity cost per request.
