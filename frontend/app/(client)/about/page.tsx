import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Digital Marmat | AC Repair & Appliance Service in Kathmandu",
  description:
    "Digital Marmat provides AC sales, installation, repair and home appliance servicing across Kathmandu Valley with certified technicians and genuine parts.",
  keywords: [
    "AC repair Kathmandu",
    "AC installation Nepal",
    "home appliance repair Kathmandu",
    "Digital Marmat",
  ],
};

export default async function AboutUs() {
  return (
    <div className="min-h-screen bg-muted/40 py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">About Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Digital Marmat is Nepal's trusted home appliance solution provider,
            specializing in AC sales, installation, repair, and maintenance.
          </p>
        </div>

        {/* Intro Card */}
        <Card>
          <CardContent className="pt-6 text-lg leading-relaxed text-gray-700">
            <p>
              Digital Marmat supplies all major AC brands and provides expert
              servicing for homes, offices, and commercial spaces. With a
              skilled team of certified technicians, we deliver fast, reliable,
              and professional support across Kathmandu Valley.
            </p>
          </CardContent>
        </Card>

        {/* What We Do */}
        <Card>
          <CardHeader>
            <CardTitle>What We Do</CardTitle>
            <CardDescription>
              Comprehensive appliance solutions under one roof
            </CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                AC Sales - All Brands
              </h3>
              <p className="text-muted-foreground">
                Daikin • Midea • TCL • Samsung • LG • Beko and more
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                AC Installation & Uninstallation
              </h3>
              <p className="text-muted-foreground">
                Safe, secure, and professional setup for any location.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                AC Repair & Maintenance
              </h3>
              <p className="text-muted-foreground">
                Leakage, cooling issues, gas refilling, servicing & full
                check-up.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Home Appliance Repair
              </h3>
              <p className="text-muted-foreground">
                Washing Machine • Refrigerator • Dishwasher • Microwave
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Digital Marmat?</CardTitle>
            <CardDescription>Trusted by thousands of customers</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-3">
            {[
              "Certified & Experienced Technicians",
              "Warranty on Every Service",
              "Affordable & Transparent Pricing",
              "Same-day Support Available",
              "Genuine Spare Parts",
              "Thousands of Satisfied Customers",
            ].map((item) => (
              <Badge key={item} variant="secondary" className="text-sm">
                ✔ {item}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              To deliver fast, reliable, and affordable home appliance services
              with complete customer satisfaction.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              To become Nepal’s most trusted multi-brand AC supply and service
              provider.
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>📞 +977 9802362210</p>
            <p>📧 info.dmservicenepal.com</p>
            <p>📍 Machhapokhari, Kathmandu</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
