import mongoose from 'mongoose'

const otherFundSchema = new mongoose.Schema({
  allocatedFund: { type: Number, required: true, default: 0 } ,     // Main number allocated
  fundYear: { type: String, required: true},  // e.g., 2024
  organizationName:{type:String,required:true, },
}, { timestamps: true })

const OtherFund = mongoose.models.OtherFund || mongoose.model('OtherFund', otherFundSchema)
export default OtherFund