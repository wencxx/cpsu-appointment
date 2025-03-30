import { BookOpen, Briefcase, GraduationCap, HeartHandshake, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUs() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About Us</h1>
        <div className="h-1 w-20 bg-primary-color mx-auto mb-6"></div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The CPSU Office of Student Services and Affairs (OSSA)
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card className="border-l-4 border-l-primary-color">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The CPSU Office of Student Services and Affairs (OSSA) aims to enhance student development and well-being
              by providing various services and programs that support academic success and personal growth.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-color">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-primary" />
              Our Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The OSSA at CPSU plays a crucial role in supporting student development and well-being, creating an
              environment where students can thrive academically, professionally, and personally.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-color">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We are committed to providing comprehensive support services that address the diverse needs of our student
              body, ensuring that every student has access to the resources they need to succeed.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Career and Employment Coaching
              </CardTitle>
              <CardDescription>Preparing students for professional success</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We provide comprehensive career guidance, resume building workshops, interview preparation, and job
                placement assistance to help students transition successfully into the workforce.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Customer Service Training
              </CardTitle>
              <CardDescription>Developing essential professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our customer service training programs equip students with valuable interpersonal skills, communication
                techniques, and service excellence principles that are essential in today's workplace.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Student Affairs and Services</h2>
        <p className="mb-6">
          The OSSA facilitates regular discussions and programs focused on student affairs and services, addressing
          topics such as:
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary-color flex items-center justify-center mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span>Student leadership development</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary-color flex items-center justify-center mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span>Campus engagement opportunities</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary-color flex items-center justify-center mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span>Mental health and wellness resources</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary-color flex items-center justify-center mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span>Academic support services</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary-color flex items-center justify-center mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span>Student rights and responsibilities</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary-color flex items-center justify-center mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span>Community outreach initiatives</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

