import express from 'express';
import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  searchMedicines
} from '../../controllers/medicine/medicine_controller.js';

const router = express.Router();

router.post('/', createMedicine);
router.get('/', getAllMedicines);
router.get('/search', searchMedicines);
router.get('/:id', getMedicineById);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;
