import AnnualBudget from "../models/annualBudgetModel.js";

export const allocateAnnualBudget = async (req, res) => {
  const { year, allocatedBudget } = req.body;

  // Validate inputs
  if (!year || !allocatedBudget || allocatedBudget <= 0) {
    return res.status(400).json({ 
      success: false,
      message: "Set Valid Inputs." 
    });
  }

  try {
    // Check if ANY budget exists (regardless of year)
    const existingBudget = await AnnualBudget.findOne();

    if (existingBudget) {
      return res.status(403).json({
        success: false,
        message: "A budget already exists. Remove it before setting a new one.",
        existingBudget
      });
    }

    // Only allow creation if NO budgets exist
    const newBudget = new AnnualBudget({ year, allocatedBudget });
    await newBudget.save();

    res.status(201).json({
      success: true,
      message: "Budget Set Successfully",
      data: newBudget
    });

  } catch (err) {
    console.error("Budget Error:", err);
    res.status(500).json({ 
      success: false,
      message: "Budget operation failed",
      error: err.message 
    });
  }
};

// Get budget for a year
export const getAnnualBudget = async (req, res) => {
  const { year } = req.params;
  try {
    const budget = await AnnualBudget.findOne({ year });
    if (!budget) return res.status(404).json({ message: "No budget found for this year" });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch budget" });
  }
};
