'use client'

import { useState, useRef, useEffect } from 'react'

export default function LoginPage() {
  const [postUrl, setPostUrl] = useState('http://192.168.106.1:1000/fgtauth')
  const [magic, setMagic] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setPostUrl(params.get('post') || 'http://192.168.106.1:1000/fgtauth')
    setMagic(params.get('magic') || '')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError('')

    const res = await fetch('http://10.10.10.3:2545/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()
    setLoading(false)

    if (data.success) {
      formRef.current?.submit()
    } else {
      setError('เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Network</h1>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={loading}
      />

      <input
        className="w-full p-2 border rounded mb-4"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
      />

      <button
        onClick={() => handleLogin() }
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

      {/* ส่งกลับ FortiGate */}
      <form ref={formRef} method="POST" action={postUrl}>
        <input type="hidden" name="magic" value={magic} />
        <input type="hidden" name="username" value={username} />
      </form>
    </div>
  )
}
