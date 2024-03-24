import cloudinary from "../accesories/cloudinary";
import save from "../accesories/multer";
import UserInfo from "../database/models/userModel";
import express from "express";

const routerUser = express.Router();

// Middleware to parse JSON and form data
routerUser.use(express.json());
routerUser.use(express.urlencoded({ extended: true }));

routerUser.patch(
  "/update/:id",
  save.single("profilePicture"),
  async (req, res) => {
    const getId = req.params.id;
    const { userName } = req.body;
  

    try {
      
    let profilePicture = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePicture = result.secure_url;
      
    }
  
      const [updatedRowsCount, [updatedUserInfo]] = await UserInfo.update(
        { userName,profilePicture },
        { where: { id: getId }, returning: true }
      );

      if (updatedRowsCount === 1) {
        return res.status(200).json({ success: "ok", updatedUserInfo });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

routerUser.get("/user", async (req, res) => {
  try {
    const users = await UserInfo.findAll();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default routerUser;
