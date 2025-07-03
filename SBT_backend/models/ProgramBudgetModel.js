import mongoose from 'mongoose';

const ProgramBudgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  requestedBy: { type: Number, required: true }, // actorId like 1, 2, 3
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  fiscalYear: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ProgramBudget', ProgramBudgetSchema);
