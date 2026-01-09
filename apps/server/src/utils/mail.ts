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

export const sendResetPasswordEmail = async (toEmail: string, code: string) => {
    try {
        const info = await transporter.sendMail({
            from: '"Argumento Security" <yourpersonalemail@gmail.com>',
            to: toEmail,
            subject: "ALERT: Password Reset Request",
            html: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', Courier, monospace;">
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    
                    <div style="border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #ef4444; margin: 0; font-size: 24px; letter-spacing: 2px;">
                            // SECURITY_ALERT
                        </h1>
                    </div>

                    <div style="color: #e4e4e7;">
                        <p style="margin-bottom: 20px;">
                            A request was received to override the credentials for user: <span style="color: #fff; font-weight: bold;">${toEmail}</span>.
                        </p>
                        
                        <p style="margin-bottom: 10px; font-size: 12px; color: #71717a; text-transform: uppercase;">
                            Use the following override key:
                        </p>

                        <div style="background-color: #18181b; border: 1px solid #ef4444; border-left: 4px solid #ef4444; padding: 20px; margin: 30px 0; text-align: center;">
                            <span style="font-size: 32px; font-weight: bold; color: #fff; letter-spacing: 8px;">
                                ${code}
                            </span>
                        </div>

                        <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5;">
                            This key will expire in 1 hour.
                        </p>
                    </div>

                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 10px; color: #52525b;">
                        <p>
                            WARN: If you did not initiate this command, your account identity may be compromised. 
                            <br>Igore this message to maintain current security protocols.
                        </p>
                        <p>ARGUMENTO SYSTEM v1.0</p>
                    </div>

                </div>
            </body>
            </html>
            `,
        });

        console.log("Reset Email Sent: %s", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Reset Email Failed:", error);
        return { success: false, error };
    }
};
