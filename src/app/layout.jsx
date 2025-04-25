import "./globals.css";

export const metadata = {
  title: "เข้าสู่ระบบอินเทอร์เน็ต",
  icons: {
    icon: [
      {
        url: '/images/logo/moph-logo.png',
        href: '/images/logo/moph-logo.png'
      }
    ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
