"use client"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const [magic, setMagic] = useState("")
  const [postUrl, setPostUrl] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const magicParam = params.get("magic")
    const postParam = params.get("post")

    if (magicParam && postParam) {
      setMagic(magicParam)
      setPostUrl(`${postParam}?${magicParam}`)
    }
  }, [])

  return (
    <form
      method="POST"
      action={postUrl}
      className="p-8 max-w-md mx-auto bg-white shadow rounded"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-2 border mb-4 rounded"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      {/* password จะไม่ถูกใช้งานโดย FortiGate แต่ใส่ไว้ให้ผู้ใช้รู้สึกปกติ */}
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-4 rounded"
        disabled
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  )
}
