import OtherFund from "../models/otherFundModel.js";

export const setOtherFund = async (req, res) => {
  try {
    const { fundYear, organizationName, allocatedFund } = req.body;
    // 1. Validate Inputs
  if (!fundYear || !organizationName || !allocatedFund) {
    return res.status(400).json({ 
      success: false,
      message: "All Fields are required." 
    });
  }

  if (allocatedFund <= 0) {
    return res.status(400).json({ 
      success: false,
      message: "Please Set Proper Number." 
    });
  }
    const newFund = new OtherFund({
      fundYear,
      organizationName,
      allocatedFund,
    });

    await newFund.save();
    res.status(201).json({ message: "Fund Setted!", data: newFund });
  } catch (err) {
    console.error("Fund Error:", err);
    res.status(500).json({ message: "Failed to set fund" });
  }
};
// Get budget by a year
export const getOtherFund = async (req, res) => {
  const { fundYear } = req.params;
  try {
    const funds = await OtherFund.find({ fundYear });
    if (!funds || funds.length === 0)
      return res.status(404).json({ message: "No funds found for this year" });
    res.json(funds);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch funds" });
  }
};
