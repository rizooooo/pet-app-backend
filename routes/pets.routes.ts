import { Router } from 'express';
import { PetController } from '../controllers';
const router = Router();


router.get(['/', '/:id'], PetController.GET);
router.post('/', PetController.POST);
router.put('/:id', PetController.PUT);
router.delete('/:id', PetController.DELETE);


export default router;