"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import apiFortigate from "@/configs/axios.mjs"
import Ripple from "material-ripple-effects";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [magic, setMagic] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [netSuccess, setNetSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);

  const ripple = new Ripple();

  const formRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("magic");
    const e = params.get("Auth");

    if (e) {
      alert("Login ผิด กรุณารอสักครู่ กำลังรีเซ็ตการเชื่อมต่อ...");
      window.location.href = "http://www.gstatic.com/generate_204";
    }

    if (m) {
      setMagic(m);
      localStorage.setItem("m", m);
    } else {
      const storedMagic = localStorage.getItem("m");
      if (storedMagic) setMagic(storedMagic);
    }

    if (e) setError(e);

    checkNet();

    // --- เพิ่มส่วนตั้งเวลา ---
    const timeoutDuration = 5 * 60 * 1000; // 5 นาที (แปลงเป็นมิลลิวินาที)

    const timerId = setTimeout(() => {
      // เมื่อครบ 5 นาที ให้แสดง alert
      alert("หมดเวลาเข้าสู่ระบบ โปรดลองใหม่");
      // คุณอาจจะต้องการเพิ่มโค้ดอื่นๆ ตรงนี้ เช่น รีโหลดหน้าเว็บ
      window.location.href = "http://www.gstatic.com/generate_204";
    }, timeoutDuration);
    // --- สิ้นสุดส่วนตั้งเวลา ---

    // --- ฟังก์ชัน Cleanup ---
    // ฟังก์ชันนี้จะทำงานเมื่อ component ถูก unmount (ออกจากหน้า)
    // เพื่อยกเลิก timer ป้องกัน alert แสดงขึ้นมาหลังจากเปลี่ยนหน้าไปแล้ว
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const checkNet = async () => {
    try {
      const rs = await axios.get("https://ipapi.co/json/");
      if (rs.status === 200) {
        setNetSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await apiFortigate.post("/check", { username, password });

      if(rs.status === 200){
        formRef?.current.submit()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // if (netSuccess) {
  //   return <div className="h-dvh w-dvw flex justify-center items-center">
  //     <p className="font-itim text-xl md:text-3xl">คุณเชื่อมต่ออินเทอร์เน็ตแล้ว</p>
  //   </div>;
  // }


  return (
    <div className="px-4 py-8 md:p-8 w-dvw h-dvh mx-auto bg-white rounded shadow">
      <div className="max-w-md mx-auto">
        <div className="max-w-[140px] mx-auto">
          <img src="/images/logo/moph-logo.png" alt="moph-logo" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center mt-3">
          เข้าสู่ระบบอินเทอร์เน็ต
        </h1>
        <p className="text-center text-xs sm:text-sm md:text-base text-gray-800 mb-4">
          กรุณาเข้าสู่ระบบเพื่อใช้งานอินเทอร์เน็ตของโรงพยาบาลอากาศอำนวย
        </p>

        {error && (
          <p className="text-md my-2 text-red-600 font-black text-center">
            ข้อผิดพลาด: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!
          </p>
        )}

        <form onSubmit={onSubmit}>

          <input
            className="w-full p-2 px-3 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg mb-3"
            placeholder="ชื่อผู้ใช้"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <div className="relative select-none">
          <input
            className="w-full p-2 pl-3 pr-10 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg mb-4"
            type={`${showPassword ? "password" : "text"}`}
            placeholder="รหัสผ่าน"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
            {showPassword ? <Eye size={19} className="absolute right-3 top-1/5 text-gray-400 hover:text-gray-700 cursor-pointer" onClick={ () => setShowPassword(false)} /> : <EyeOff size={19} className="absolute right-3 top-1/5 text-gray-400 hover:text-gray-700 cursor-pointer" onClick={ () => setShowPassword(true)} />}
          </div>

          <button
            type="submit"
            className="w-full font-semibold relative overflow-hidden bg-blue-800 hover:outline-2 focus:outline-2 outline-blue-800 hover:outline-green-800 focus:outline-green-800  outline-offset-2 text-white py-2 rounded-full hover:bg-green-800 transition-colors duration-300 hover:cursor-pointer"
            onMouseUp={(e) => ripple.create(e, 'light')}
          >
            เข้าสู่ระบบ
          </button>

          <hr className="my-6 text-gray-300 mx-6" />

          <div className="select-none w-full flex flex-col gap-1 justify-center items-center text-xxs text-gray-700">
            <p className="font-bold">Captive Protal v0.1.0</p>
            <p>&copy; Copyright 2025 พัฒนาโดยกลุ่มงานสุขภาพดิจิทัล โรงพยาบาลอากาศอำนวย</p>
          </div>
        </form>

        <form method="POST" action={`http://192.168.25.1:1000/fgtauth`} ref={formRef}>
          <input type="hidden" name="4Tredir" value="http://www.akathospital.com" />
          <input type="hidden" name="magic" value={magic} />
          <input type="hidden" name="username" value={username} />
          <input type="hidden" name="password" value={password} />
        </form>

      </div>
    </div>
  );
}
