import { FaWhatsapp } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { ServiceDetailsType } from "@/lib/types/service";
import { ViewIcon } from "lucide-react";
import ImageCollection from "@/components/services/details/ImageCollection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProductDetails } from "@/lib/fetches/product";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productData: ServiceDetailsType = await getProductDetails(slug);
  const phoneNumber = "9779860172109";

  const message = encodeURIComponent(
    `Hello, I would like to book ${productData.name}. 
Service link: ${process.env.NEXT_PUBLIC_API_URL}/products/${productData.slug}`,
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <div className="flex justify-center px-12 py-8 gap-8 items-start">
      <div className="flex items-center flex-col rounded-md shadow-sm p-8 px-16 gap-4 max-w-2/3">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold">{productData.name}</div>
          <div className="flex justify-between w-full px-4 items-center">
            <div>{productData.location}</div>
            <Badge className="flex items-center gap-2" variant={"secondary"}>
              <ViewIcon size={"18"} />
              {productData.views}
            </Badge>
            <Badge variant={"outline"}>{productData.bookings} Bookings</Badge>
          </div>
        </div>

        <ImageCollection images={productData.images} />
      </div>
      <div className="flex flex-col  rounded-md items-center px-4 justify-start sticky top-24 gap-4 shadow-sm py-4">
        <div className="shadow-md text-3xl px-4 py-2 rounded-lg">
          {"Rs. "}
          {productData.price}
        </div>
        <div className="">Price Type: {productData.price_type}</div>
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button variant={"book"} className="bg-green-500 hover:bg-green-400">
            <FaWhatsapp />
            Message on Whatsapp
          </Button>
        </Link>
      </div>
    </div>
  );
}
