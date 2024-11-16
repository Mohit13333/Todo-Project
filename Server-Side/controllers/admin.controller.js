import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";

const adminPanel = async (req, res, next) => {
  try {
    const users = await User.find().select({ password: 0 });
    const contacts = await Contact.find();
    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users found !" });
    } else if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "Contact not found !" });
    }
    return res.status(200).json({ users, contacts, services });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Contact ID is required" });
        }

        const result = await Contact.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const getUsersById=async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const results=await User.findOne({ _id: id });

        return res.status(200).json({results});
    } catch (error) {
        next(error);
    }
}

const updateUser=async (req, res,next) => {
    try {
        const id=req.params.id;
        const data=req.body;
        await User.updateOne({ _id: id},{$set: data});
        return res.status(200).json({message:"User updated successfully"});
    } catch (error) {
        next(error);
        return res.status(400).json({message:"User not updated"})
    }
}

export {adminPanel,deleteUser,getUsersById,updateUser,deleteContact};
