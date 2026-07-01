export const dynamic = "force-dynamic";

import Link from "next/link";
import { getProductById } from "@/lib/api/product.api";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Link href="/" className="inline-block mb-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft size={16} />
          Back to Products
        </Button>
      </Link>

      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold mt-3">${product.price}</p>
            <Badge className="mt-3">{product.category}</Badge>
            <p className="mt-6 text-muted-foreground">
              {product.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
