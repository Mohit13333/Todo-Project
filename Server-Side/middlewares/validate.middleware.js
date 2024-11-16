const validate=(schema)=>async(req,res,next)=>{
    try {
        const parseBody=await schema.parseAsync(req.body);
        req.body=parseBody;
        next();
    } catch (error) {
        const status=error.status;
        const message="Fill the input properly.";
        const extraDetails=error.errors[0].message;
        const errors={
            status,
            message,
            extraDetails,
        };
        next(errors);
    }
}


export default validate;