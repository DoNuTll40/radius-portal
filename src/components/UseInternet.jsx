import Footer from "./Footer";

export default function UseInternet() {
  return (
    <div className="h-dvh w-dvw px-2 flex flex-col gap-4 justify-center items-center select-none">
      <p className="font-sarabun text-lg md:text-2xl text-center font-semibold">ไม่สามารถเข้าถึงหน้าเว็บนี้ได้ เนื่องจากคุณเชื่อมต่ออินเทอร์เน็ตแล้ว</p>
      <Footer />
    </div>
  )
}
