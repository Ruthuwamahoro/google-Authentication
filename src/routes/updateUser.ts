import cloudinary from "../accesories/cloudinary";
import save from "../accesories/multer";
import UserInfo from "../database/models/userModel";
import express from "express";
import nodemailer from "nodemailer";

// Define the User interface
interface User {
  id: number;
  userName: string;
  profilePicture: string;
  email: string;
}

const routerUser = express.Router();

// Middleware to parse JSON and form data
routerUser.use(express.json());
routerUser.use(express.urlencoded({ extended: true }));

// Function to send email notification
async function sendEmailNotification(updatedUserInfo: User) {
  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user:'kabanangadavid@gmail.com',
        pass:'icvm txla ystc jmzp'
    },
  });

  // Construct email content
  const emailContent = `
    Hi there,

    This email is to notify you that your user information has been updated.

    Updated details:
    - Username: ${updatedUserInfo.userName}
    - Profile Picture: ${updatedUserInfo.profilePicture}

    If you did not initiate this update, please contact us immediately.

    Thanks,
    The Admin Team
  `;

  // Define email options
  const mailOptions: nodemailer.SendMailOptions = {
    from: 'atlptestauth@gmail.com',
    to: updatedUserInfo.email,
    subject: 'User Information Update Notification',
    text: emailContent,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email successfully sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

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

      const [updatedRowsCount] = await UserInfo.update(
        { userName, profilePicture },
        { where: { id: getId } }
      );

      if (updatedRowsCount === 1) {
        // Fetch updated user info after the update
        const updatedUserInfo = await UserInfo.findByPk(getId);

        if (updatedUserInfo) {
          // Call sendEmailNotification function after successful update
          await sendEmailNotification(updatedUserInfo as unknown as User);
          return res.status(200).json({ success: "ok", updatedUserInfo });
        } else {
          return res.status(404).json({ error: "User not found" });
        }
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
