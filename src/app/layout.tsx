import './globals.css';

export const metadata = {
  title: 'Your App',
  description: 'A simple app for your DPA questionnaire.',
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
