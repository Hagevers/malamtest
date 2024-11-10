"use client";

// import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useCallback } from "react";
import PaginationKeys from "./pagination";

function NewTable({
  data,
  totalRows,
  fields,
}: //   fields,
{
  data: VehicleDataArray;
  totalRows: number;
  fields: VehicleField[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const headerTranslations: { [K in keyof VehicleData]?: string } = {
    _id: "מזהה",
    mispar_rechev: "מספר רכב",
    tozeret_cd: "תוצרת",
    tzeva_cd: "צבע",
    ramat_gimur: "רמת גימור",
    shnat_yitzur: "שנת ייצור",
    degem_cd: "דגם",
    tozeret_nm: "תוצרת",
    degem_nm: "דגם",
    mivchan_acharon_dt: "תאריך מבחן אחרון",
    sug_degem: "סוג דגם",
    ramat_eivzur_betihuty: "רמת איבזור בטיחותי",
    degem_manoa: "דגם מנוע",
    baalut: "בעלות",
    misgeret: "מסגרת",
    zmig_ahori: "זמג אחורי",
    sug_delek_nm: "סוג דלק",
    kvutzat_zihum: "קבוצת זיהום",
    tokef_dt: "תוקף",
    tzeva_rechev: "צבע רכב",
    horaat_rishum: "הוראת רישום",
    moed_aliya_lakvish: "מועד עלייה לקבישה",
    kinuy_mishari: "כינוי משרי",
    zmig_kidmi: "זמג קדמי",
    // Add more translations as needed
  };

  return (
    <>
      <label className="sr-only">חיפוש</label>
      <input
        type="text"
        name="hs-table-with-pagination-search"
        id="hs-table-with-pagination-search"
        className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        placeholder="חיפוש רכבים"
        onChange={(e) => {
          const value = e.target.value;
          router.push(`${pathname}?${createQueryString("search", value)}`);
        }}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {fields.map((field) => (
              <TableHead key={field.id}>
                {headerTranslations[field.id as keyof VehicleData] || field.id}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item._id}
              className="cursor-pointer"
              onClick={() => {
                router.push(`/vehicle/${item.mispar_rechev}`);
              }}
            >
              {Object.keys(item).map((key) => (
                <TableCell key={key}>
                  {item[key as keyof VehicleData]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{totalRows}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <PaginationKeys />
    </>
  );
}

export default NewTable;
