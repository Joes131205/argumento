import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    },
});

export const sendVerificationEmail = async (toEmail: string, code: string) => {
    try {
        const info = await transporter.sendMail({
            from: '"Argumento Command" <yourpersonalemail@gmail.com>',
            to: toEmail,
            subject: "Verify Identity",
            html: `
        <div style="font-family: monospace; background-color: #000; color: #0f0; padding: 20px; border: 1px solid #333;">
            <p style="color: #ccc;">Hello! Please input the code below!</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border: 1px dashed #0f0; padding: 10px; width: fit-content;">
                ${code}
            </div>
        </div>
      `,
        });

        console.log("Transmission Sent: %s", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Transmission Failed:", error);
        return { success: false, error };
    }
};

export const sendResetPasswordEmail = async (
    toEmail: string,
    code: string
) => {};
