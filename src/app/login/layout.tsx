import '../globals.css'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <body>
        {children}
        </body>
    )
}
