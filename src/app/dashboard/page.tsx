
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || !role) {
      router.push("/login")
      return
    }

    switch (role) {
      case "ADMIN":
        router.push("/dashboard/admin")
        break
      case "LOAN":
        router.push("/dashboard/loan")
        break
      case "PROJECT":
        router.push("/dashboard/project")
        break
      case "FINANCE":
        router.push("/dashboard/finance")
        break
      case "MANAGEMENT":
        router.push("/dashboard/management")
        break
      default:
        router.push("/login")
    }
  }, [router])

  return <p>Redirecting...</p>
}
