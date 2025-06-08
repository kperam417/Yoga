import express from 'express';
import { yogaSignUpCtrl } from '../controllers/yoga.signUpController';
import { signupSchema } from '../schemas/auth.schema';
import { ZodObject, ZodString, ZodBoolean, ZodTypeAny } from 'zod';
import { validateInput } from '../middlewares/schema.validation';


const router = express.Router();


router.post('/login', ()=>{
console.log("login");
});
router.post('/signup',validateInput(signupSchema), yogaSignUpCtrl);
export default router;


