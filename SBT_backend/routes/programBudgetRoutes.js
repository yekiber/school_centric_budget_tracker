// routes/programBudgetRoutes.js

import express from 'express';
import {
  createProgramBudget,
  getAllProgramBudgets,
  getProgramBudgetById,
  updateProgramBudget,
  deleteProgramBudget
} from '../controllers/ProgramBudgetControllers.js';

const router = express.Router();

// Create new program budget
router.post('/', createProgramBudget);

// Get all program budgets
router.get('/', getAllProgramBudgets);

// Get a single program budget by ID
router.get('/:id', getProgramBudgetById);

// Update a program budget by ID
router.put('/:id', updateProgramBudget);

// Delete a program budget by ID
router.delete('/:id', deleteProgramBudget);

export default router;
