const { User } = require("../models/user");
const { Message } = require("./msc/message");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  console.log("register ", email, password, username);
  const isUser = await User.findOne({ username });
  if (isUser) {
    return res.send(
      Message("Sorry! User with the username number already exists!")
    );
  }

  try {
    const user = new User({ username, password, email });
    await user.save();
    return res.send(
      Message(
        "Congratulations! " +
          username +
          ".You have successfully registered in our system!",
        true
      )
    );

    // return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.send(Message("Sorry! couldn't save the user, try again!"));
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send(Message("Username is not correct for the admin!"));
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.send(Message("Invalid email or password"));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    // Send JWT token in the response
    return res.send(Message({ token }, true));
  } catch (err) {
    return res.send(Message(err?.message || "An error occurred during login"));
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Generate a unique token for password reset (You may use a library like `crypto` for this)
    const resetToken = generateResetToken(); // Implement this function to generate a unique token

    // Save the reset token and its expiration time in the database for the user
    existingUser.resetToken = resetToken;
    existingUser.resetTokenExpiration = Date.now() + 3600000; // Token expiration time (1 hour)
    await existingUser.save();

    // Send the reset token to the user via email (You may use a service like Nodemailer for this)
    sendResetTokenByEmail(existingUser.email, resetToken); // Implement this function to send email

    res.status(200).json({ message: "Password reset token sent successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, "username email"); // Retrieve only username and email fields

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
