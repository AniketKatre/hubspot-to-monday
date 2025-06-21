// webhookHandler.js

function extractDealData(payload) {
  const {
    dealName,
    propertyValue: dealStage,
    dealAmount,
    contactEmail,
  } = payload;
  //   console.log("webhookhandler file paylodad check:----", payload)

  if (!dealName || !dealStage || !dealAmount || !contactEmail) {
    throw new Error("Missing required fields");
  }

  return {
    dealName,
    dealStage,
    dealAmount: Number(dealAmount),
    contactEmail,
  };
}

module.exports = { extractDealData };
