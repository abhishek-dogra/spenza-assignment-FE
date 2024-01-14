import {UserWebhookMapping} from "@/Interfaces/UserWebhookMapping";

export interface WebhookLogs {
    userWebhookId: string
    data: any
    timestamp: string
    sourceUrl: string
    id: string
    webhookUser: UserWebhookMapping
}
