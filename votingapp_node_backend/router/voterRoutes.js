import express from 'express';
import  {newRegistration,generateRecipt}  from '../controller/voterController.js';

const router = express.Router();

router.post('/addCandidate', newRegistration);
router.get("/:generateRecipt",generateRecipt)
export default router;