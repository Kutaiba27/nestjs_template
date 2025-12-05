import { BullModule } from "@nestjs/bullmq";
import { QueuesNames } from "../types/queue.type";


export const emailQueue = BullModule.registerQueue({
    name: QueuesNames.EMAIL,
    defaultJobOptions: {
        removeOnComplete: 20,
        removeOnFail: 200,
        attempts: 3,
        backoff: {
            delay: 1000,
            type: "exponential",
        }
    },
})