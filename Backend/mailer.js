const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendResetMail(to, code, isOTP = false) {
  const subject = isOTP ? "GCE Erode – Password Reset Verification Code" : "Password Reset - GCE Erode";
  const body = isOTP
    ? `Your verification code is: ${code}
    
This code will expire in 5 minutes.
This is an automated email. Please do not reply.`
    : `Your temporary password is: ${code}

Please login and change your password immediately.
This is an automated email. Please do not reply.`;

  await transporter.sendMail({
    from: `"GCE Erode Notification System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: body
  });
}

module.exports = sendResetMail;
