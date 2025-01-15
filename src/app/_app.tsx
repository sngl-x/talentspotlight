import "./globals.css"; // Import your global styles
import type { AppProps } from "next/app";

// Main App component
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
