import { LoginForm } from "@/components/login-form"
import Logo from '@/assets/logo.png'

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center self-center font-medium">
          <div className="w-20 aspect-square">
            {/* <GalleryVerticalEnd className="size-4" /> */}
            <img src={Logo} alt="" />
          </div>
          <p className="text-center">Central Philippines State University<br></br>OSSA Appointment Scheduler.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}