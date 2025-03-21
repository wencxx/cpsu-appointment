import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col items-center self-center font-medium">
          <div className="w-20 aspect-square">
            <img src="src/assets/logo.png" alt="" />
          </div>
          <p className="text-center">Central Philippines State University<br></br> Appointment System.</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
} 