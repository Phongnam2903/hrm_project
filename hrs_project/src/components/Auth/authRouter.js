const express = require("express");
const router = express.Router();
const { sendResetCode } = require("./emailService");

let resetCodes = {}; // Lưu trữ mã đặt lại tạm thời

router.post("/send-reset-code", async (req, res) => {
  const { email } = req.body;
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo mã đặt lại ngẫu nhiên

  resetCodes[email] = resetCode; // Lưu mã đặt lại vào bộ nhớ tạm

  try {
    await sendResetCode(email, resetCode);
    res.status(200).send("A reset code has been sent to your email.");
  } catch (error) {
    res.status(500).send("Error sending email.");
  }
});

router.post("/verify-reset-code", (req, res) => {
  const { email, resetCode } = req.body;

  if (resetCodes[email] && resetCodes[email] === resetCode) {
    res.status(200).send("Reset code verified.");
  } else {
    res.status(400).send("Invalid reset code.");
  }
});

router.post("/reset-password", (req, res) => {
  const { email, newPassword, resetCode } = req.body;

  if (resetCodes[email] && resetCodes[email] === resetCode) {
    // Đặt lại mật khẩu của người dùng ở đây (ví dụ: cập nhật mật khẩu trong cơ sở dữ liệu)
    // Xóa mã đặt lại sau khi sử dụng
    delete resetCodes[email];
    res.status(200).send("Password reset successful.");
  } else {
    res.status(400).send("Invalid reset code.");
  }
});

module.exports = router;
