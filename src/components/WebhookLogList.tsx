"use client";
import React, {useState, useEffect} from 'react';
import {FetchWebhookLogsList} from "@/common/userAxiosWrapper";
import {useRouter} from "next/navigation";
import {WebhookLogs} from "@/Interfaces/WebhookLogs";

export default function WebhookLogList() {
    const router = useRouter();
    const [list, setList] = useState<WebhookLogs[]>([]);
    const [selectedLog, setSelectedLog] = useState<WebhookLogs | null>(null);

    async function fetchWebhookList() {
        const response = await FetchWebhookLogsList();
        if (response.status == 401) {
            localStorage.clear();
            router.push('/login');
        }
        let webhooksList: WebhookLogs[] = [];
        if (response.data?.data != null) {
            webhooksList = response.data.data;
        }
        setList(webhooksList);
    }

    useEffect(() => {
        fetchWebhookList();
        const intervalId = setInterval(() => {
            fetchWebhookList();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleCloseModal = () => {
        setSelectedLog(null);
    };

    const handleViewInfo = (item: WebhookLogs) => {
        setSelectedLog(item);
    };

    return (
        <div className="flex-1 pr-8">
            <div className="bg-white p-3 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Webhooks Logs</h2>
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            <th className="border px-4 py-2">Webhook Name</th>
                            <th className="border px-4 py-2">Timestamp</th>
                            <th className="border px-4 py-2">Source URL</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item) => (
                            <tr key={item.webhookUser.webhook.name} className="mb-4">
                                <td className="border px-4 py-2">{item.webhookUser.webhook.name}</td>
                                <td className="border px-4 py-2">{item.timestamp}</td>
                                <td className="border px-4 py-2">{item.sourceUrl}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleViewInfo(item)}
                                    >
                                        <span role="img" aria-label="View Info">👁️ View Info</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedLog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-4">Detailed Information</h2>
                        <p>Webhook Name: {selectedLog.webhookUser.webhook.name}</p>
                        <p>Timestamp: {selectedLog.timestamp}</p>
                        <p>Source URL: {selectedLog.sourceUrl}</p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
