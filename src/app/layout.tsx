export const metadata = {
  title: 'yop',
  description: 'recreation of https://fichtre.net/yop.html',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
