import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/lib/api/product.api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} prefetch className="group h-full">
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="relative w-full h-48 bg-muted rounded-md flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 300px"
              priority={false}
            />
          </div>

          <div className="mt-4 flex-1">
            <h2 className="font-semibold text-sm line-clamp-2">
              {product.title}
            </h2>
          </div>

          <p className="text-primary font-bold mt-2">
            ${product.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
