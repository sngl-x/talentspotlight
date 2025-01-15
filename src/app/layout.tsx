import './globals.css';

export const metadata = {
  title: 'DPA Assessment',
  description: 'Collection of data for DPA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
