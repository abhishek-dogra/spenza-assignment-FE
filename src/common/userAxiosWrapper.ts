import axios from "axios";
import {UserWebhookMapping} from "@/Interfaces/UserWebhookMapping";
import {Webhook} from "@/Interfaces/Webhook.interface";
import {WebhookLogs} from "@/Interfaces/WebhookLogs";

export async function UserAxiosWrapper(url: string, method: string, headers: any, payload: any) {
    try {
        const response = await axios({
            url: url,
            method: method,
            headers: headers,
            data: payload,
        });
        return response;
    } catch (error: any) {
        if (error.response != null) {
            console.log(error.response);
            return error.response;
        }
        return null;
    }
}

export async function Login(email: string, password: string) {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/user/login', 'POST', headers, {
            email: email,
            password: password,
        });
        if (response.status !== 200) {
            return {error: true, message: response.data.message, data: null};
        }
        const data: { accessToken: string; name: string; email: string } = response.data;
        return {error: false, message: 'success', data: data};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', data: null};
    }
}

export async function Signup(name: string, email: string, password: string) {
    try {
        const response = await UserAxiosWrapper('http://localhost:3001/user/signup', 'POST', {
            'content-type': 'application/json',
        }, {
            name: name,
            email: email,
            password: password,
        });
        if (response.status !== 201) {
            return {error: true, message: response.data.message};
        }
        return {error: false, message: 'success'};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure'};
    }
}

export async function FetchSubscribedWebhookList(): Promise<{ error: boolean; message: string; data: { data: UserWebhookMapping[] } | null, status: number }> {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/webhook/subscribed', 'GET', headers, null);
        if (response.status !== 200) {
            return {error: true, message: response.data.message, data: null, status: response.status};
        }
        const data: { data: UserWebhookMapping[] } = response.data;
        return {error: false, message: 'success', data: data, status: response.status};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', data: null, status: 500};
    }
}

export async function FetchWebhookList(): Promise<{ error: boolean; message: string; data: { data: Webhook[] } | null, status: number }> {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/webhook', 'GET', headers, null);
        if (response.status !== 200) {
            return {error: true, message: response.data.message, data: null, status: response.status};
        }
        const data: { data: Webhook[] } = response.data;
        return {error: false, message: 'success', data: data, status: response.status};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', data: null, status: 500};
    }
}

export async function SubscribeWebhook(id: string, sourceUrl: string,retryCount:number): Promise<{ error: boolean; message: string; status: number }> {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/webhook/subscribe', 'POST', headers, {
            webhookId: id,
            sourceUrl: sourceUrl,
            retryCount: retryCount
        });
        if (response.status !== 201) {
            return {error: true, message: response.data.message, status: response.status};
        }
        return {error: false, message: 'success', status: response.status};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', status: 500};
    }
}

export async function UpdateWebhookMapping(webhookUserId: string, retryCount: number | null, cancel: boolean | null): Promise<{ error: boolean; message: string; status: number }> {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/webhook/subscription', 'PUT', headers, {
            webhookUserId: webhookUserId,
            retryCount:retryCount,
            cancel:cancel
        });
        console.log(response);
        if (response.status !== 201) {
            return {error: true, message: response.data.message, status: response.status};
        }
        return {error: false, message: 'success', status: response.status};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', status: 500};
    }
}

export async function FetchWebhookLogsList(): Promise<{ error: boolean; message: string; data: { data: WebhookLogs[] } | null, status: number }> {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/webhook/logs', 'GET', headers, null);
        if (response.status !== 200) {
            return {error: true, message: response.data.message, data: null, status: response.status};
        }
        const data: { data: WebhookLogs[] } = response.data;
        return {error: false, message: 'success', data: data, status: response.status};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', data: null, status: 500};
    }
}

export async function GetAuthKey(): Promise<{ error: boolean; message: string; data: { authKey:string  } | null, status: number }> {
    try {
        const headers: any = {'content-type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token != null) {
            headers.authorization = token;
        }
        const response = await UserAxiosWrapper('http://localhost:3001/user/auth-key', 'GET', headers, null);
        if (response.status !== 200) {
            return {error: true, message: response.data.message, data: null, status: response.status};
        }
        const data: { authKey:string } = response.data;
        return {error: false, message: 'success', data: data, status: response.status};
    } catch (error) {
        console.log('Something went wrong.');
        return {error: true, message: 'failure', data: null, status: 500};
    }
}
