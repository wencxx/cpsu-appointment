import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, BadgeIcon as IdCard, FileCheck, Bell, CheckCircle } from "lucide-react"

export default function UserManual() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">CPSU OSSA Appointment Scheduler</h1>
        <p className="text-muted-foreground text-lg">User Manual for Document Request System</p>
      </div>

      <Alert className="mb-8 border-primary/50 bg-primary/10">
        <InfoIcon className="h-5 w-5" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          This system allows you to request Good Moral Certificates and ID Cards. You will receive SMS notifications
          when your requests are approved and when you claim your documents.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="id-card">ID Card Application</TabsTrigger>
          <TabsTrigger value="good-moral">Good Moral Certificate</TabsTrigger>
          <TabsTrigger value="notifications">SMS Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>
                The CPSU OSSA Appointment Scheduler helps students request and track documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Central Philippines State University (CPSU) Office of Student Services and Affairs (OSSA)
                Appointment Scheduler is a web-based system that allows students to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Apply for Student ID Cards</li>
                <li>Request Good Moral Certificates</li>
                <li>Track the status of their applications</li>
                <li>Receive SMS notifications about application status</li>
              </ul>
              <p>This user manual will guide you through the process of using the system effectively.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="id-card" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IdCard className="h-5 w-5" />
                Student ID Card Application
              </CardTitle>
              <CardDescription>How to apply for a new Student ID Card</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md overflow-hidden border">
                <img
                  src="https://res.cloudinary.com/djgmga5gf/image/upload/v1743350909/Screenshot_2025-03-31_000810_gxrgj3.png"
                  alt="ID Card Application Interface"
                  width={800}
                  height={450}
                  className="w-full"
                />
              </div>

              <h3 className="text-lg font-semibold mt-4">Application Process:</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Navigate to the ID Card Application page:</strong>
                  <p>Click on "Student ID Card" in the left sidebar menu.</p>
                </li>
                <li>
                  <strong>Start a new application:</strong>
                  <p>Click the "Apply for student ID Card" button in the top right corner.</p>
                </li>
                <li>
                  <strong>Fill in the application form:</strong>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Personal Information (Name, Course/Year, Address)</li>
                    <li>Contact Number (for SMS notifications)</li>
                    <li>Birthday</li>
                    <li>Guardian Information</li>
                    <li>Preferred Schedule Date for pickup</li>
                  </ul>
                </li>
                <li>
                  <strong>Submit your application:</strong>
                  <p>Review all information and click the "Submit" button.</p>
                </li>
                <li>
                  <strong>Track your application:</strong>
                  <p>Your application will appear in the list with a "Pending" status initially.</p>
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">Application Status:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Pending:</strong> Your application is under review
                </li>
                <li>
                  <strong>Approved:</strong> Your ID Card is ready for pickup on the scheduled date
                </li>
                {/* <li>
                  <strong>Rejected:</strong> Your application was not approved (check for notification with reason)
                </li> */}
                <li>
                  <strong>Claimed:</strong> You have already picked up your ID Card
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="good-moral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Good Moral Certificate Request
              </CardTitle>
              <CardDescription>How to request a Good Moral Certificate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md overflow-hidden border">
                <img
                  src="https://res.cloudinary.com/djgmga5gf/image/upload/v1743351012/Screenshot_2025-03-31_000936_j3wfcj.png"
                  alt="Good Moral Certificate Request Interface"
                  width={800}
                  height={450}
                  className="w-full"
                />
              </div>

              <h3 className="text-lg font-semibold mt-4">Request Process:</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Navigate to the Good Moral Certificate page:</strong>
                  <p>Click on "Good Moral" in the left sidebar menu.</p>
                </li>
                <li>
                  <strong>Start a new request:</strong>
                  <p>Click the "Request Good Moral" button in the top right corner.</p>
                </li>
                <li>
                  <strong>Fill in the request form:</strong>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Personal Information (Name, Course/Year, Gender)</li>
                    <li>Contact Number (for SMS notifications)</li>
                    <li>School Year Information (Graduated/Currently Enrolled)</li>
                    <li>Purpose of the certificate (exam, employment, etc.)</li>
                    <li>Preferred Schedule Date for pickup</li>
                  </ul>
                </li>
                <li>
                  <strong>Submit your request:</strong>
                  <p>Review all information and click the "Submit" button.</p>
                </li>
                <li>
                  <strong>Track your request:</strong>
                  <p>Your request will appear in the list with a "Pending" status initially.</p>
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">Request Status:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Pending:</strong> Your request is under review
                </li>
                <li>
                  <strong>Approved:</strong> Your Good Moral Certificate is ready for pickup on the scheduled date
                </li>
                {/* <li>
                  <strong>Rejected:</strong> Your request was not approved (check for notification with reason)
                </li> */}
                <li>
                  <strong>Claimed:</strong> You have already picked up your Good Moral Certificate
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                SMS Notifications
              </CardTitle>
              <CardDescription>Understanding the SMS notification system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The CPSU OSSA Appointment Scheduler uses SMS notifications to keep you informed about your document
                requests. Make sure your contact number is correct when submitting applications.
              </p>

              <h3 className="text-lg font-semibold mt-4">Types of SMS Notifications:</h3>

              <div className="space-y-4 mt-2">
                <div className="p-4 border rounded-md bg-green-50">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Approval Notification
                  </h4>
                  <p className="mt-2 text-sm">
                    <strong>When:</strong> After your application is approved
                  </p>
                  <p className="text-sm">
                    <strong>Example:</strong> "Request has been approved. Please settle your payment at Cashier's Office."
                  </p>
                </div>

                <div className="p-4 border rounded-md bg-blue-50">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Claim Confirmation
                  </h4>
                  <p className="mt-2 text-sm">
                    <strong>When:</strong> After you have claimed your document
                  </p>
                  <p className="text-sm">
                    <strong>Example:</strong> "Your request was successfully given to you"
                  </p>
                </div>

                {/* <div className="p-4 border rounded-md bg-amber-50">
                  <h4 className="font-medium flex items-center gap-2">
                    <InfoIcon className="h-4 w-4 text-amber-500" />
                    Reminder Notification
                  </h4>
                  <p className="mt-2 text-sm">
                    <strong>When:</strong> One day before your scheduled pickup date
                  </p>
                  <p className="text-sm">
                    <strong>Example:</strong> "REMINDER: Your Student ID Card is ready for pickup tomorrow, Oct 23, 2025
                    at 2:30 AM. Please bring your OR and valid ID. -CPSU OSSA"
                  </p>
                </div> */}
              </div>

              <h3 className="text-lg font-semibold mt-6">Important Notes:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensure your contact number is correct when submitting applications</li>
                {/* <li>Standard SMS rates may apply depending on your mobile carrier</li> */}
                <li>If you don't receive SMS notifications, check your application status online</li>
                <li>For any issues with SMS notifications, contact the OSSA office</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Document Claiming Process</CardTitle>
          <CardDescription>How to claim your approved documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Wait for approval notification:</strong>
              <p>You will receive an SMS when your document request is approved.</p>
            </li>
            <li>
              <strong>Note the scheduled date and time:</strong>
              <p>Once approved, you can claim your document on your selected date and time.</p>
            </li>
            <li>
              <strong>Bring required items:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Official Receipt (OR)</li>
                <li>Valid ID</li>
              </ul>
            </li>
            <li>
              <strong>Visit the OSSA office:</strong>
              <p>Go to the OSSA office on your scheduled date and time.</p>
            </li>
            <li>
              <strong>Claim your document:</strong>
              <p>Present your requirements to the staff and claim your document.</p>
            </li>
            <li>
              <strong>Receive confirmation:</strong>
              <p>You will receive an SMS confirming that you have claimed your document.</p>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How long does it take to process my application?</h3>
              <p className="text-muted-foreground">Most applications are processed within 3-5 working days.</p>
            </div>

            <div>
              <h3 className="font-semibold">What if I can't claim my document on the scheduled date?</h3>
              <p className="text-muted-foreground">Contact the OSSA office to reschedule your pickup date.</p>
            </div>

            <div>
              <h3 className="font-semibold">Can someone else claim my document for me?</h3>
              <p className="text-muted-foreground">
                Yes, but they must bring an authorization letter signed by you, along with their valid ID and your
                requirements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">What if I don't receive an SMS notification?</h3>
              <p className="text-muted-foreground">
                Check your application status online through the system. If it shows as approved, contact the OSSA
                office.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">How can I check the status of my application?</h3>
              <p className="text-muted-foreground">
                Log in to the CPSU OSSA Appointment Scheduler and navigate to the respective document request page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

