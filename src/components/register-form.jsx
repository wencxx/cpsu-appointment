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
import { Link } from "react-router-dom"
import { useState } from "react"
import endpoint from "@/connection/connection"
import axios from "axios"

export function RegisterForm({
  className,
  ...props
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value  })
  }

  const register = async (e) => {
    e.preventDefault()
    setErr('')

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      return setErr("Password must be at least 8 characters long and include letters, numbers, and special characters.")
    }

    if(formData.password !== formData.confirmPassword) return setErr("Password doesn't match")

    const { confirmPassword, ...data } = formData

    try {
      setLoading(true)
      const res = await axios.post(`${endpoint()}/register`, {...data})

      if(res.data === 'User created successfully.'){
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        setSuccess(res.data)
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
        setSuccess('')
      }, 5000)
    }
  }
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter required informations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {err && <p className="bg-red-500 pl-2 rounded text-white mb-2 py-1">{err}</p>}
          {success && <p className="bg-green-500 pl-2 rounded text-white mb-2 py-1">{success}</p>}
          <form onSubmit={register}>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-3">
                <div className="grid gap-3">
                  <Label htmlFor="firstname">First Name:</Label>
                  <Input id="firstname" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastname">Last Name:</Label>
                  <Input id="lastname" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username:</Label>
                  <Input id="username" type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email:</Label>
                  <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password:</Label>
                  <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Confirm Password:</Label>
                  <Input id="password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <Button type="submit" variant="primary" className={`w-full col-span-2 ${loading && 'animate-pulse'}`} disabled={loading}>
                  {loading ? 'Registering' : 'Register'}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
