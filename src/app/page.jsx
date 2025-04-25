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
    if (m) setMagic(m);
    if (e) setError(e);
  }, []);

  return (
    <div className="p-8 w-dvw h-dvh mx-auto bg-white rounded shadow">
      <div className="max-w-md mx-auto">
        <div className="max-w-[150px] mx-auto">
          <img src="/images/logo/moph-logo.png" alt="moph-logo" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center mt-3">
          เข้าสู่ระบบอินเทอร์เน็ต
        </h1>
        <p className="my-2">
          กรุณาเข้าสู่ระบบเพื่อใช้งานอินเทอร์เน็ตของโรงพยาบาล
        </p>

        {error && (
          <p className="text-md my-2 text-red-600 font-black">
            ข้อผิดพลาด {error && "ชื่อผู้หรือรหัสผ่านไม่ถูกต้อง!"}
          </p>
        )}

        <form method="POST" action={`http://192.168.106.1:1000/fgtauth`}>
          <input type="hidden" name="magic" value={magic} />
          <input type="hidden" name="4Tredir" value="www.akathospital.com" />

          <input
            className="w-full p-2 border rounded mb-3"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          {/* ส่ง password */}
          <input
            className="w-full p-2 border rounded mb-4"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            เข้าสู่ระบบ
          </button>

          <div className="w-full flex justify-center">
            <p className="text-sm mt-5">v 0.0.003</p>
          </div>
        </form>
      </div>
    </div>
  );
}
