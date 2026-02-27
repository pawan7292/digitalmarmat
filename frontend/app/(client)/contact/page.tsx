import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="p-8 flex flex-col gap-12">
      <div className="text-4xl font-bold text-center">Contact us</div>
      <div className="flex items-center gap-4 text-sm justify-evenly">
        <div>
          <div>
            <div className="text-lg">Phone Number</div>
          </div>

          <div>9802362210</div>
        </div>
        <div>
          <div className="text-lg">Email</div>
          <div>info.dmsservicenepal@gmail.com</div>
        </div>
        <div>
          <div className="text-lg">Address</div>
          <div>Kathmandu, Nepal</div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Contact Us</CardTitle>
              <CardDescription>
                We'd love to hear from you. Please fill out the form below.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="98XXXXXXXX" />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    rows={5}
                  />
                </div>

                {/* Button (UI only) */}
                <Button type="button" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
