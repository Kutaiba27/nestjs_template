import { Module } from "@nestjs/common";
import { MailWorker, MailService, EmailTemplateService } from "./services";
import { AccountModule } from "@Modules/account";
import { EmailQueueService } from "./services/email-queue.service";

@Module({ 
    imports: [AccountModule],
    providers: [MailService, MailWorker, EmailQueueService, EmailTemplateService], 
    exports: [MailService, EmailQueueService]
})
export class EmailModule { }