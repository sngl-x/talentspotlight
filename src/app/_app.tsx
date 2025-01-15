import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';

// Import your global styles
import '../app/globals.css'; // Adjust path if necessary

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
