'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [magic, setMagic] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ดึง magic จาก URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const m = params.get('magic')
    if (m) setMagic(m)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // เรียก API backend เพื่อตรวจสอบกับ RADIUS
      const res = await axios.post('http://10.10.10.3:2545/api/login', {
        username,
        password,
      })

      const data = res.data
      if (data.success) {
        console.log('✅ Login success, redirecting to FortiGate with magic')

        const formData = new URLSearchParams()
        formData.append('username', username)

        // ส่งกลับ FortiGate ผ่านพอร์ต 1000 พร้อม magic
        await axios.post(
          `http://192.168.106.1:1000/fgtauth?magic=${magic}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )

        // optional: อาจ redirect ไปหน้า success ของเราเอง หรือแสดงข้อความเฉยๆ ก็ได้
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
    } catch (err) {
      console.error('❌ Error:', err)
      setError('ไม่สามารถเชื่อมต่อระบบได้')
    } finally {
      setLoading(false)
    }
  }

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
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
    </div>
  )
}
