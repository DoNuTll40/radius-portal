"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import apiFortigate from "@/configs/axios.mjs";
import Ripple from "material-ripple-effects";
import { Eye, EyeOff } from "lucide-react";
import UseInternet from "@/components/UseInternet";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import TimeoutModal from "@/components/TimeoutModal";

export default function LoginPage() {
  const [magic, setMagic] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [netSuccess, setNetSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [vlan, setVlan] = useState()
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const ripple = new Ripple();

  const router = useRouter();
  const formRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("magic");
    const e = params.get("Auth");
    const p = params.get("post");

    const ipParts = p?.split(".");
    if (ipParts?.length === 4) setVlan(ipParts[2]);

    if (e) {
      toast.error("Login ผิด กรุณารอสักครู่ กำลังรีเซ็ตการเชื่อมต่อ...");
      window.location.href = "http://www.gstatic.com/generate_204";
    }

    if (m) {
      setMagic(m);
      localStorage.setItem("m", m);
    } else {
      const storedMagic = localStorage.getItem("m");
      if (storedMagic) setMagic(storedMagic);
    }

    if (e) toast.error(e);

    checkNet();

    const timeoutDuration = 5 * 60 * 1000;
    const timerId = setTimeout(() => {
      setShowTimeoutModal(true);
    }, timeoutDuration);

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
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    setError(null)
    e.preventDefault();
    try {
      const rs = await apiFortigate.post("/check", { username, password });

      if (rs.status === 200) {
        const hash = rs?.data?.result;

        const form = formRef.current;
        form.username.value = username;
        form.password.value = hash;

        form.submit();
        toast.success("เข้าสู่ระบบสำเร็จ!")
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

  // if (netSuccess) {
  //   return <UseInternet />;
  // }

  return (
    <div className="px-4 py-8 md:p-8 w-dvw h-dvh mx-auto bg-white rounded shadow">

      {showTimeoutModal && <TimeoutModal />}

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
          <div className="bg-red-600 mt-2 mb-4">
            <p className="text-sm md:text-base ml-2 px-2 bg-red-100 py-2 text-red-600 font-black">
              ข้อผิดพลาด : {error}
            </p>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full p-2 px-3 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg mb-3"
            placeholder="หมายเลขบัตรประชาชน"
            name="username"
            onChange={(e) => {
              setError(null)
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              setUsername(onlyNums);
            }}
            value={username}
            maxLength="13"
            minLength="13"
            required
          />

          <div className="relative select-none">
            <input
              className="w-full p-2 pl-3 pr-10 focus:outline-2 outline-blue-800 outline-offset-2 border border-gray-400 focus:border-blue-800 rounded-lg mb-4"
              type={`${showPassword ? "password" : "text"}`}
              placeholder="รหัสผ่าน"
              name="password"
              onChange={(e) => {
                setError(null)
                setPassword(e.target.value.trim())
              }}
              value={password}
              required
            />
            {showPassword ? (
              <Eye
                size={19}
                className="absolute right-3 top-1/5 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                size={19}
                className="absolute right-3 top-1/5 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full font-semibold relative overflow-hidden bg-blue-800 hover:outline-2 focus:outline-2 outline-blue-800 hover:outline-green-800 hover:focus:outline-green-800  outline-offset-2 text-white py-2 rounded-full hover:bg-green-800 transition-colors duration-300 hover:cursor-pointer"
              onMouseUp={(e) => ripple.create(e, "light")}
            >
              เข้าสู่ระบบ
            </button>

            <button
              type="button"
              className="w-full font-semibold relative overflow-hidden bg-blue-100 text-blue-800 border border-blue-800 hover:outline-2 focus:outline-2 outline-blue-800 hover:outline-blue-800 hover:focus:outline-blue-800  outline-offset-2 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300 hover:cursor-pointer"
              onMouseUp={(e) => ripple.create(e, "light")}
              onClick={() => router.push("/register")}
            >
              สมัครใช้งาน
            </button>
          </div>

          <hr className="my-6 text-gray-300 mx-6" />

          <Footer />
        </form>

        <form
          method="POST"
          action={`http://192.168.${vlan}.1:1000/fgtauth`}
          ref={formRef}
        >
          <input
            type="hidden"
            name="4Tredir"
            value="http://www.akathospital.com"
          />
          <input type="hidden" name="magic" value={magic} />
          <input type="hidden" name="username" />
          <input type="hidden" name="password" />
        </form>

      </div>
    </div>
  );
}
