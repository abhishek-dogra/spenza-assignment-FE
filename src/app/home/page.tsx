import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <Link
                        href={"/webhook/list"}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        View Subscribed Webhooks
                    </Link>
                    <Link
                        href={"/webhook/list"}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Subscribe to Webhooks
                    </Link>
                    <Link
                        href={"/webhook/log"}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                    >
                        View Webhook Logs
                    </Link>
                </div>
            </div>
        </div>
    );
}
