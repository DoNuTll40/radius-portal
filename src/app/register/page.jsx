"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Ripple from "material-ripple-effects";
import axios from "@/configs/axios.mjs";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";

export default function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const ripple = new Ripple();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (username.length !== 13) {
      setError("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const rs = await axios.post("/register", { username, password });
      if (rs.status === 200) {
        toast.success("สร้างผู้ใช้งานเรียบร้อยแล้ว!");
        window.location.href = "http://www.gstatic.com/generate_204"
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response.data.message || "เกิดข้อผิดพลาดอะไรสักอย่างกับระบบ!"
      );
    }
  };

  return (
    <div className="px-4 py-8 md:p-8 w-dvw h-dvh mx-auto bg-white rounded shadow">
      <div className="max-w-md mx-auto">
        <div className="max-w-[140px] mx-auto">
          <img src="/images/logo/moph-logo.png" alt="moph-logo" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center mt-3">
          สมัครใช้งานอินเทอร์เน็ต
        </h1>
        <p className="text-center text-sm text-gray-800 mb-4">
          กรุณากรอกข้อมูลเพื่อสมัครใช้งานอินเทอร์เน็ตของโรงพยาบาล
        </p>

        {error && (
          <div className="bg-red-600 mt-2 mb-4">
            <p className="text-sm md:text-base ml-2 px-2 bg-red-100 py-2 text-red-600 font-black">
              ข้อผิดพลาด : {error}
            </p>
          </div>
        )}

        <form onSubmit={onSubmit}>
          {/* เลขบัตร */}
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={13}
            className="w-full p-2 px-3 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg mb-3"
            placeholder="หมายเลขบัตรประชาชน"
            name="username"
            value={username}
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value.replace(/[^0-9]/g, ""));
            }}
            required
          />

          <p className="text-xxs text-center mb-1 text-red-600 font-semibold">
            * รหัสผ่านจะต้องประกอบไปด้วยตัวอักษร, ตัวเลข และอักษรพิเศษ
            เช่น @ * / ' " เป็นต้น
          </p>

          {/* รหัสผ่าน */}
          <div className="relative select-none mb-4">
            <input
              className="w-full p-2 pl-3 pr-10 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg"
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              name="password"
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value.trim());
              }}
              value={password}
              required
            />
            {showPassword ? (
              <Eye
                size={19}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                size={19}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* ยืนยันรหัสผ่าน */}
          <div className="relative select-none mb-4">
            <input
              className="w-full p-2 pl-3 pr-10 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="ยืนยันรหัสผ่าน"
              name="confirmPassword"
              onChange={(e) => {
                setError(null);
                setConfirmPassword(e.target.value.trim());
              }}
              value={confirmPassword}
              required
            />
            {showConfirmPassword ? (
              <Eye
                size={19}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <EyeOff
                size={19}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full font-semibold relative overflow-hidden bg-blue-800 hover:outline-2 focus:outline-2 outline-blue-800 hover:outline-green-800 hover:focus:outline-green-800  outline-offset-2 text-white py-2 rounded-full hover:bg-green-800 transition-colors duration-300 hover:cursor-pointer"
              onMouseUp={(e) => ripple.create(e, "light")}
            >
              สมัครใช้งาน
            </button>

            <button
              type="button"
              className="w-full font-semibold relative overflow-hidden bg-blue-100 text-blue-800 border border-blue-800 hover:outline-2 focus:outline-2 outline-blue-800 hover:outline-blue-800 hover:focus:outline-blue-800  outline-offset-2 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300 hover:cursor-pointer"
              onMouseUp={(e) => ripple.create(e, "light")}
              onClick={() => window.location.href = "http://www.gstatic.com/generate_204"}
            >
              เข้าสู่ระบบ
            </button>
          </div>

          <hr className="my-6 text-gray-300 mx-6" />

          <Footer />
        </form>
      </div>
    </div>
  );
}
