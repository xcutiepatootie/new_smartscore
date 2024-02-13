import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function QuizzesLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className={inter.className}>
            {/* Include shared UI here e.g. a header or sidebar */}


            {children}
        </section>
    )
}