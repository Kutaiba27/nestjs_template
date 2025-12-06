import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { QueuesNames } from "@Infrastructure/queue";
import { MailService } from "./email.service";
import { IAccountService } from "@Modules/account";
import { QueueEmailEvent } from "../types";

@Processor({ name: QueuesNames.EMAIL })
export class MailWorker extends WorkerHost {
    private readonly logger = new Logger(MailWorker.name);

    constructor(
        private readonly mailService: MailService,
        private readonly accountService: IAccountService
    ) {
        super()
    }

    async process(job: Job): Promise<void> {
        switch (job.name) {
            case QueueEmailEvent.OTP:
                await this.mailService.sendSingInOTP(job.data.email, job.data.otp)
                break
            case QueueEmailEvent.FORGOT_PASSWORD:
                await this.mailService.sendForgotPasswordEmail(job.data.email, job.data.url)
                break
        }
    }

    @OnWorkerEvent("active")
    onWorkerActive(job: Job): void {
        this.logger.log(`Job active: ${job.id}`);
    }

    @OnWorkerEvent("failed")
    async onWorkerFailed(job: Job): Promise<void> {
        if (job.attemptsMade < 3) {
            this.logger.warn(`Retrying job ${job.id}...`);
        } else {
            this.logger.error(`Job ${job.id} failed after 3 attempts`);
            const user = await this.accountService.findByEmail(job.data.email);
            this.logger.error(`Failed email for user: ${user?.email}`);
        }
    }

    @OnWorkerEvent("completed")
    onWorkerCompleted(job: Job): void {
        this.logger.log(`Job completed: ${job.id}`);
    }
}