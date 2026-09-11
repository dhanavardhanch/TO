import './globals.css';

import ScrollRevealProvider from '../components/ScrollRevealProvider';
import { ShopProvider } from '../context/ShopContext';

export const metadata = {
  title: 'The Original | From the Cashew Capital, Palasa',
  description:
    'Premium cashews hand picked from Palasa, India, the cashew capital.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cinzel:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ShopProvider>
          <ScrollRevealProvider>{children}</ScrollRevealProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
