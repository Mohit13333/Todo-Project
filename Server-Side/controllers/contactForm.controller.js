import Contact from "../models/contact.model.js";
const contactForm=async (req,res) => {
    try {
        const response=await req.body;
        await Contact.create(response)
        return res.status(200).json({message:"message sent successfully"})
    } catch (error) {
        return res.status(500).json({message:"message not delivered",error:error.message})
    }
}

export default contactForm;