import "./globals.css";

export const metadata = {
  title: "Gemini Image Generator",
//   description: "Tạo hình ảnh tuyệt đẹp từ văn bản với AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
