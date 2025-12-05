import { QueuesNames } from "@Infrastructure/queue";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";
import { QueueEmailEvent } from "../types";



@Injectable()
export class EmailQueueService {
    constructor(
        @InjectQueue(QueuesNames.EMAIL) private readonly emailQueue: Queue
    ) {}

    async sendSignUpEmail(email: string, otp?: string) {
        this.emailQueue.add(QueueEmailEvent.OTP, {
            email: email,
            otp: otp
        });
    }

    async sendForgotPasswordEmail(email: string, url?: string) {
        this.emailQueue.add(QueueEmailEvent.FORGOT_PASSWORD, {
            email: email,
            url: url
        });
    }
}