import { Request,Response,NextFunction } from "express"
import { AnyZodObject, ZodError } from "zod"


export const validateInput = (_schema:AnyZodObject)=>{

    return (req:Request,res:Response,next:NextFunction) =>{
        try {
            
        _schema.parse(req.body);
        next(); 
        } catch (error) {
            if (error instanceof ZodError) {
                 res.status(400).json({ errors: error.flatten().fieldErrors });
              }
              res.status(500).json({ message: 'An unexpected error occurred.' });
        }
        
    }

}