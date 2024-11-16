const adminMiddleWare=async (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole=req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({message: "Access denied"});
        }
        // res.status(200).json({message:req.user})
        next();
    } catch (error) {
        next(error);
    }
    }
    
    
    export default adminMiddleWare;