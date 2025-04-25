import "./globals.css";

export const metadata = {
  title: "เข้าสู่ระบบ"
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
