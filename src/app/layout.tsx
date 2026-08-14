import type { Metadata } from 'next';
import { Poppins, Amiri } from 'next/font/google';
import './globals.css';
import { LangProvider, LocalizationProvider } from '@/locales';
import { Toaster } from 'sonner';
import { WEDDING_CONFIG } from '@/constants';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
});

const { bride, groom } = WEDDING_CONFIG;

export const metadata: Metadata = {
  title: `The Wedding of ${groom.name} & ${bride.name}`,
  description: `Join us in celebrating the wedding of ${groom.fullName} and ${bride.fullName}. Discover our wedding events, venue details, and more.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${amiri.variable} antialiased`}>
        <LangProvider>
          <LocalizationProvider>
            {children}
            <Toaster />
          </LocalizationProvider>
        </LangProvider>
      </body>
    </html>
  );
}
