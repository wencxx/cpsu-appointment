import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import endpoint from "@/connection/connection"
import axios from "axios"
import useAuthStore from "@/store/authStore"

export function LoginForm({
  className,
  ...props
}) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const store = useAuthStore()
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const res = await axios.post(`${endpoint()}/login`, credentials)
      
      if(res.data.message === 'Login successful'){
        store.login((res.data.userData))
        navigate('/')
      }else{
        setErr(res.data)
      }
    } catch (error) {
      console.log(error)
      setErr(error.message)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setErr('')
      }, 5000)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Username and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {err && <p className="bg-red-500 pl-2 rounded text-white mb-2 py-1">{err}</p>}
          <form onSubmit={login}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" type="text" value={credentials.username} onChange={handleSubmit} required />
                </div>
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" name="password" type="password" value={credentials.password} onChange={handleSubmit} required />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
