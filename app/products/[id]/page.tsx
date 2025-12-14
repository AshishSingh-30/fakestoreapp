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
  params: Promise<{ id: string }>;
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
          <div className="group relative w-full h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{product.title}</h1>

            <p className="text-xl font-semibold text-primary mt-3">
              ${product.price}
            </p>

            <Badge variant="secondary" className="w-fit mt-3">
              {product.category}
            </Badge>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
