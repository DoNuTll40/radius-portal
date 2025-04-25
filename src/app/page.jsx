'use client'

import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [magic, setMagic] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const m = params.get('magic')
    if (m) setMagic(m)
  }, [])

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Network</h1>

      {/* ฟอร์มที่ส่งข้อมูลไปยัง FortiGate */}
      <form
        method="POST"
        action={`http://192.168.106.1:1000/fgtauth`}
      >
        {/* ส่งกลับเว็บเดิมเมื่อ login สำเร็จ (แนะนำให้ใส่) */}
        <input
          type="hidden"
          name="magic"
          value={magic}
        />
        <input
          type="hidden"
          name="4Tredir"
          value="http://www.msftconnecttest.com/redirect"
        />

        {/* ส่ง username */}
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
          <p className="text-sm mt-5">v 0.0.002</p>
        </div>
      </form>
    </div>
  )
}
