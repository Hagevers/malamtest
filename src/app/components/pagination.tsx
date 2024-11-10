"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

function PaginationKeys() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentOffset = parseInt(searchParams.get("offset") || "0", 10);

  const handleNextClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOffset = parseInt(params.get("offset") || "0", 10);

    // Increment offset by 10
    const newOffset = currentOffset + 5;
    params.set("offset", newOffset.toString());

    // Update the URL with the new offset
    router.push(`?${params.toString()}`);
  };

  const handlePreviousClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOffset = parseInt(params.get("offset") || "0", 10);

    if (currentOffset <= 10) {
      const newOffset = Math.max(currentOffset - 5, 0);
      params.set("offset", newOffset.toString());

      // Update the URL with the new offset
      router.push(`?${params.toString()}`);
    }
    // Decrement offset by 10
    const newOffset = Math.max(currentOffset - 5, 0);
    params.set("offset", newOffset.toString());

    // Update the URL with the new offset
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={handlePreviousClick}
        >
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationLink isActive>
            {Math.floor(currentOffset / 5) + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationLink href={`?offset=${currentOffset + 5}`}>
            {Math.floor(currentOffset / 5) + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationLink href={`?offset=${currentOffset + 10}`}>
            {Math.floor(currentOffset / 5) + 3}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className="cursor-pointer" onClick={handleNextClick}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationKeys;
