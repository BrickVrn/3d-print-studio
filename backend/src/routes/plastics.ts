import { Router } from 'express';
import { plasticsController } from '../controllers/plastics';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', plasticsController.getAll);
router.get('/:id', plasticsController.getOne);

router.post('/', authMiddleware, plasticsController.create);
router.put('/:id', authMiddleware, plasticsController.update);
router.delete('/:id', authMiddleware, plasticsController.delete);

export default router;
