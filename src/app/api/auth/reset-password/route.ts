import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {signToken, verifyToken} from "@/lib/utils/jwt";
import {hashPassword} from "@/lib/utils/bcrypt";
import {baseUrl} from "@/lib/utils";
import {sendEmail} from "@/lib/utils/mail";


export async function POST(req: NextRequest) {
    try {
        const {email} = await req.json();

        const user = await prisma.user.findUnique({where: {email}});

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const resetToken = signToken({
            id: user.id,
            email: user.email
        }, '1d');

        // TODO: Sending token to email

        const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

         const template = `
            <html>
              <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;"
                >
                  <tr>
                    <td style="padding: 20px;">
                      <h1 style="font-size: 24px; color: #333333; margin-top: 0;">
                        Password Reset Request
                      </h1>
                      <p style="font-size: 16px; color: #666666;">
                        We received a request to reset your password. If you made this request, click the button below to reset your password:
                      </p>
                      <p style="text-align: center; margin: 20px 0;">
                        <a
                          href=${resetLink}
                          style="background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;"
                          >Reset Password</a
                        >
                      </p>
                      <p style="font-size: 16px; color: #666666;">
                        If you didn't request a password reset, you can safely ignore this email. Your password will remain the same.
                      </p>
                      <p style="font-size: 16px; color: #666666; margin-bottom: 0;">
                        Best regards,<br />BudgetBuddy Team
                      </p>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `;

        await sendEmail(user.email, "Password reset request", template);

        return NextResponse.json({
            message: 'Password reset token generated.',
        });
    }catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try{
        const {token, password} = req.json();

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 401 });
        }

        const {id} = decoded;

        const hashedPassword = await hashPassword(password);

        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            message: 'Password updated successfully.',
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}