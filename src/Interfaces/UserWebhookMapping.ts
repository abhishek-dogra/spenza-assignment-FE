import {Webhook} from "@/Interfaces/Webhook.interface";

export interface UserWebhookMapping {
    userId: string
    webhookId: number
    sourceUrl: string
    retryCount: number
    active: boolean
    id: string
    webhook: Webhook
}
