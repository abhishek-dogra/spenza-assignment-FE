import '../globals.css'
import Navbar from "@/components/Navbar";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <body>
        <Navbar/>
        {children}
        </body>
    )
}
