import Payroll from "../models/payrollModel.js";


// GET all payrolls
export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve payrolls." });
  }
};

// CREATE a new payroll
export const createPayroll = async (req, res) => {
  const data = req.body;

  try {
    const existing = await Payroll.findOne({
      employeeId: data.employeeId,
      month: data.month,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Payroll for this employee and month already exists." });
    }

    const netSalary =
      parseFloat(data.basicSalary) +
      (parseFloat(data.allowances) || 0) -
      (parseFloat(data.deductions) || 0);

    const newPayroll = new Payroll({
      ...data,
      netSalary,
    });

    const savedPayroll = await newPayroll.save();
    res.status(201).json(savedPayroll);
  } catch (err) {
    res.status(500).json({ message: "Failed to create payroll." });
  }
};

// UPDATE existing payroll by ID
export const updatePayroll = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const netSalary =
      parseFloat(updatedData.basicSalary) +
      (parseFloat(updatedData.allowances) || 0) -
      (parseFloat(updatedData.deductions) || 0);

    const updatedPayroll = await Payroll.findByIdAndUpdate(
      id,
      {
        ...updatedData,
        netSalary,
      },
      { new: true }
    );

    if (!updatedPayroll) {
      return res.status(404).json({ message: "Payroll not found." });
    }

    res.json(updatedPayroll);
  } catch (err) {
    res.status(500).json({ message: "Failed to update payroll." });
  }
};
