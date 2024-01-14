import {Webhook} from "@/Interfaces/Webhook.interface";

export interface UserWebhookMapping {
    userId: string
    webhookId: number
    sourceUrl: string[]
    active: boolean
    id: string
    webhook: Webhook
}
