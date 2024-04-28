import './global.css';
import { Suspense, ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Suspense>
        <body>{children}</body>
      </Suspense>
    </html>
  );
}
