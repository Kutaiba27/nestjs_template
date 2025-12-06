import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvironmentService } from "@Infrastructure/config";
import { AppError } from "@Package/error";
import { generateOTP } from '@Package/utilities';
import { EmailTemplateService } from './template.service';
import { ClientSideErrorCode } from '@Common/error';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter: nodemailer.Transporter;

    constructor(
        private readonly env: EnvironmentService,
        private readonly emailTemplateService: EmailTemplateService,
    ) {
        const host = this.env.get("mail.host");
        const port = this.env.get("mail.port");
        const user = this.env.get("mail.user");
        const pass = this.env.get("mail.password");
        
        this.transporter = nodemailer.createTransport({
            host: host,
            port: Number(port),
            secure: false,
            auth: {
                user: user,
                pass: pass,
            },
            connectionTimeout: 30_000,
            socketTimeout: 30_000,
            greetingTimeout: 10_000,
        });
    }

    async sendMail(to: string, subject: string, html: string): Promise<nodemailer.SentMessageInfo> {
        try {
            const fromEmail = this.env.get("mail.from");
            const mailOptions = {
                from: fromEmail,
                to,
                subject,
                html,
            };

            return await this.transporter.sendMail(mailOptions);
        } catch (e) {
            this.logger.error("Error sending email", e);
            throw new AppError({
                code: ClientSideErrorCode.MAIL.MAIL_ERROR.code,
                message: `Error sending email: ${e.message}`
            });
        }
    }

    async sendSingInOTP(to: string, otp?: string): Promise<nodemailer.SentMessageInfo> {
        const userOtp = otp ?? generateOTP();
        const html = await this.emailTemplateService.getSigninTemplate(userOtp);
        return await this.sendMail(to, "OTP for verification", html);
    }

    async sendForgotPasswordEmail(to: string, url: string): Promise<nodemailer.SentMessageInfo> {
        const html = await this.emailTemplateService.getForgotPasswordTemplate(url);
        return await this.sendMail(to, "Reset Your Password", html);
    }
}
