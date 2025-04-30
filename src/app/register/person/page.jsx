export const metadata = {
    title: "สร้างผู้ใช้งานของประชาชน",
  };

export default function page() {
  return (
    <div className="h-dvh w-dvw bg-gray-300 flex flex-col gap-1 items-center justify-center p-2">
        <img className="max-w-[120px]" src="/images/logo/moph-logo.png" alt="logo" />
        <h1 className="font-semibold text-xl text-center">ขออภัยในความไม่สะดวก</h1>
        <p className="text-sm md:text-base text-center">ระบบอินเทอร์เน็ตของประชาชนกำลังอยู่ระหว่างขั้นตอนการพัฒนา...</p>
    </div>
  )
}
