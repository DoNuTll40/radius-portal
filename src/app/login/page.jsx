"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";

export default function LoginPage() {
  const [postUrl, setPostUrl] = useState(""); // URL ที่จะ POST กลับไปหา FortiGate พร้อม magic
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  // ดึงค่า magic จาก URL แล้วประกอบ URL สำหรับส่งกลับ FortiGate
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const magicParam = params.get("magic");

    if (magicParam) {
      // FortiGate ต้องการให้ magic อยู่ใน URL, ไม่ใช่ใน form field
      setPostUrl(`http://192.168.106.1:1000/fgtauth?${magicParam}`);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://10.10.10.3:2545/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        console.log("✅ Login success. Submitting to FortiGate:", postUrl);
        formRef.current?.submit();
      } else {
        setError("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setLoading(false);
      setError("ไม่สามารถเชื่อมต่อระบบได้");
    }
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const res = await fetch("http://10.10.10.3:2545/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
          console.log(
            "✅ Login success. Sending to FortiGate via axios:",
            postUrl
          );

          const formData = new URLSearchParams();
          formData.append("username", username);

          await axios.post(postUrl, formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          console.log("✅ Magic POST complete. FortiGate should unlock.");
        } else {
          setError("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล");
        }
      } catch (err) {
        console.error("❌ Error:", err);
        setLoading(false);
        setError("ไม่สามารถเชื่อมต่อระบบได้");
      }
    };
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Network</h1>

      {/* ฟอร์มสำหรับกรอก username/password */}
      <form onSubmit={handleLogin}>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={loading}
          required
        />

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loading}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
    </div>
  );
}
