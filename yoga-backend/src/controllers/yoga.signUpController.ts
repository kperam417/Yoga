import { Request, Response } from 'express';



export const yogaSignUpCtrl = ((req:Request,res:Response)=>{

console.log(req.body);
res.send({"message":"Successfully login"});

});