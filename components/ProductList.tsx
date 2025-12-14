"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "@/lib/api/product.api";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiLayoutGridFill, RiLayoutGrid2Fill } from "react-icons/ri";
import { useDebounce } from "@/hooks/useDebounce";

type CategoryFilter = "all" | string;
type SortType = "none" | "low-high" | "high-low";
type ViewMode = "grid-3" | "grid-5";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortType>("none");
  const [page, setPage] = useState(1);

  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const ITEMS_PER_PAGE = viewMode === "grid-3" ? 6 : 10;

  const gridClass =
    viewMode === "grid-3"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className={`grid ${gridClass} gap-6`}>
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load products</p>;
  }

  let filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((p) =>
      selectedCategory === "all" ? true : p.category === selectedCategory
    );

  if (sort === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full md:w-[95%] mx-auto p-2">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="sm:w-1/4"
        />

        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value as SortType);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Sorting</SelectItem>
            <SelectItem value="low-high">Price: Low → High</SelectItem>
            <SelectItem value="high-low">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={viewMode === "grid-3" ? "default" : "outline"}
            size="icon"
            onClick={() => {
              setViewMode("grid-3");
              setPage(1);
            }}
          >
            <RiLayoutGridFill />
          </Button>

          <Button
            variant={viewMode === "grid-5" ? "default" : "outline"}
            size="icon"
            onClick={() => {
              setViewMode("grid-5");
              setPage(1);
            }}
          >
            <RiLayoutGrid2Fill />
          </Button>
        </div>
      </div>

      <div className={`grid ${gridClass} gap-6`}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
