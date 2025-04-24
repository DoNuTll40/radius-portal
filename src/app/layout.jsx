import "./globals.css";

export const metadata = {
  title: "Login Net Akat",
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
