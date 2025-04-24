"use client";

import { useState, useRef, useEffect } from "react";

export default function LoginPage() {
  const [postUrl, setPostUrl] = useState("http://192.168.106.1:1000/fgtauth");
  const [magic, setMagic] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  // ดึงค่าจาก URL เช่น ?post=...&magic=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const post = params.get("post");
    const magicParam = params.get("magic");

    if (post) setPostUrl(post);
    if (magicParam) setMagic(magicParam);
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
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Network</h1>

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

      {/* ฟอร์มลับไว้ส่งกลับไป FortiGate */}
      <form ref={formRef} method="POST" action={postUrl} target="_blank">
        <input type="hidden" name="magic" value={magic} />
        <input type="hidden" name="username" value={username} />
      </form>
    </div>
  );
}
