const { extractDealData } = require("./webhookHandler");

describe("extractDealData", () => {
  it("should extract valid payload correctly", () => {
    const samplePayload = {
      eventId: "123456",
      eventType: "deal.propertyChange",
      propertyName: "dealstage",
      objectId: "56789",
      objectType: "DEAL",
      propertyValue: "closelost",
      dealName: "Acme Corp Implementation2",
      dealAmount: "25000",
      contactEmail: "john.doe@acme.com",
    };

    const result = extractDealData(samplePayload);
    // console.log("RESULT from test file:---", result)

    expect(result).toEqual({
      dealName: "Acme Corp Implementation2",
      dealStage: "closelost",
      dealAmount: 25000,
      contactEmail: "john.doe@acme.com",
    });
  });

  it("should throw error when required fields are missing", () => {
    const badPayload = {
      dealName: "Test",
    };

    expect(() => extractDealData(badPayload)).toThrow(
      "Missing required fields"
    );
  });
});
