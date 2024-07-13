const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Bạn có thể sử dụng dịch vụ email khác như Outlook, Yahoo, v.v.
  auth: {
    user: "namphong170503@gmail.com",
    pass: "Gauiu@2911",
  },
});

const sendResetCode = async (email, resetCode) => {
  const mailOptions = {
    from: "namphong170503@gmail.com",
    to: email,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${resetCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    throw error;
  }
};

module.exports = { sendResetCode };
