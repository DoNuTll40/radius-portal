import { ClockAlert, RotateCw } from "lucide-react";
import Ripple from "material-ripple-effects";

export default function TimeoutModal() {
    const ripple = new Ripple();

  return (
    <div className="fixed inset-0 bg-black/60 px-4 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white animate-fadeInDown p-6 rounded-2xl shadow-lg max-w-md w-full text-center relative">
        <div className="absolute top-3 left-3 bg-red-500 rounded-sm"><p className="bg-red-100 ml-1 text-red-600 font-semibold px-4 py-1">แจ้งเตือน!</p></div>
        <h2 className="text-xl font-black mb-4 text-red-600 flex flex-col gap-2 items-center justify-center">
        <ClockAlert size={55} /> หมดเวลาเข้าสู่ระบบ 
        </h2>
        <p className="text-gray-700">
          เนื่องจากทิ้งหน้านี้ไว้นานเกินเวลาที่ระบบกำหนด
        </p>
        <p className="mb-6 text-gray-700">โปรดลองใหม่อีกครั้ง</p>
        <button
          type="button"
          className="w-full font-semibold relative overflow-hidden bg-blue-100 text-blue-800 border border-blue-800 hover:outline-2 focus:outline-2 outline-blue-800 hover:outline-blue-800 hover:focus:outline-blue-800  outline-offset-2 py-2 rounded-full hover:bg-blue-800 hover:text-white transition-colors duration-300 hover:cursor-pointer"
          onMouseUp={(e) => ripple.create(e, "light")}
          onClick={() => window.location.href = "http://www.gstatic.com/generate_204"}
        >
            <p className="flex gap-1 justify-center items-center"><RotateCw size={18} /> ลองใหม่</p>
        </button>
      </div>
    </div>
  );
}
