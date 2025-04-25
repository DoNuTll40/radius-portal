"use client";

import { useState, useEffect } from "react";

export default function LoginPage() {
  const [magic, setMagic] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("magic");
    const e = params.get("Auth");

    if (m) {
      setMagic(m);
      localStorage.setItem("m", m); // ✅ แก้ตรงนี้
    } else {
      const storedMagic = localStorage.getItem("m");
      if (storedMagic) setMagic(storedMagic);
    }

    if (e) setError(e);
  }, []);

  return (
    <div className="p-8 w-dvw h-dvh mx-auto bg-white rounded shadow">
      <div className="max-w-md mx-auto">
        <div className="max-w-[150px] mx-auto">
          <img src="/images/logo/moph-logo.png" alt="moph-logo" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center mt-3">
          เข้าสู่ระบบอินเทอร์เน็ต
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          กรุณาเข้าสู่ระบบเพื่อใช้งานอินเทอร์เน็ตของโรงพยาบาลอากาศอำนวย
        </p>

        {error && (
          <p className="text-md my-2 text-red-600 font-black text-center">
            ข้อผิดพลาด: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!
          </p>
        )}

        <form method="POST" action={`http://192.168.25.1:1000/fgtauth`}>
          <input type="hidden" name="magic" value={magic} />
          <input type="hidden" name="4Tredir" value="http://www.akathospital.com" />

          <input
            className="w-full p-2 border rounded mb-3"
            placeholder="ชื่อผู้ใช้"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <input
            className="w-full p-2 border rounded mb-4"
            type="password"
            placeholder="รหัสผ่าน"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            เข้าสู่ระบบ
          </button>

          <a
            href={`https://uat-provider.id.th/oauth/redirect?client_id=9cdb01a8-c108-4a87-90bf-af6206aa1e0d&redirect_uri=http://localhost:3000/callback&response_type=code&state=123`}
          >
            เข้าสู่ระบบด้วย Health ID
          </a>

          <div className="w-full flex justify-center">
            <p className="text-sm mt-5 text-gray-400">v 0.0.01</p>
          </div>
        </form>
      </div>
    </div>
  );
}
