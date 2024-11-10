// "use client";

// // import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import React, { useCallback } from "react";

// function Table({
//   data,
//   totalRows,
//   fields,
// }: {
//   data: VehicleDataArray;
//   totalRows: number;
//   fields: [];
// }) {
//   const headerTranslations: { [K in keyof VehicleData]?: string } = {
//     _id: "מזהה",
//     mispar_rechev: "מספר רכב",
//     tozeret_cd: "תוצרת",
//     tzeva_cd: "צבע",
//     ramat_gimur: "רמת גימור",
//     shnat_yitzur: "שנת ייצור",
//     degem_cd: "דגם",
//     tozeret_nm: "תוצרת",
//     degem_nm: "דגם",
//     mivchan_acharon_dt: "תאריך מבחן אחרון",
//     sug_degem: "סוג דגם",
//     ramat_eivzur_betihuty: "רמת איבזור בטיחותי",
//     degem_manoa: "דגם מנוע",
//     baalut: "בעלות",
//     misgeret: "מסגרת",
//     zmig_ahori: "זמג אחורי",
//     sug_delek_nm: "סוג דלק",
//     kvutzat_zihum: "קבוצת זיהום",
//     tokef_dt: "תוקף",
//     tzeva_rechev: "צבע רכב",
//     horaat_rishum: "הוראת רישום",
//     moed_aliya_lakvish: "מועד עלייה לקבישה",
//     kinuy_mishari: "כינוי משרי",
//     zmig_kidmi: "זמג קדמי",
//     // Add more translations as needed
//   };

//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Get a new searchParams string by merging the current
//   // searchParams with a provided key/value pair
//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value);

//       return params.toString();
//     },
//     [searchParams]
//   );

//   const handleNextClick = () => {
//     const params = new URLSearchParams(searchParams.toString());
//     const currentOffset = parseInt(params.get("offset") || "0", 10);

//     // Increment offset by 10
//     const newOffset = currentOffset + 5;
//     params.set("offset", newOffset.toString());

//     // Update the URL with the new offset
//     router.push(`?${params.toString()}`);
//   };

//   const handlePreviousClick = () => {
//     const params = new URLSearchParams(searchParams.toString());
//     const currentOffset = parseInt(params.get("offset") || "0", 10);

//     // Decrement offset by 10
//     const newOffset = Math.max(currentOffset - 5, 0);
//     params.set("offset", newOffset.toString());

//     // Update the URL with the new offset
//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="-m-1.5 overflow-x-auto">
//         <div className="p-1.5 min-w-full inline-block align-middle">
//           <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
//             <div className="py-3 px-4">
//               <div className="relative max-w-xs">
//                 <label className="sr-only">חיפוש</label>
//                 <input
//                   type="text"
//                   name="hs-table-with-pagination-search"
//                   id="hs-table-with-pagination-search"
//                   className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
//                   placeholder="חיפוש רכבים"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     router.push(
//                       `${pathname}?${createQueryString("search", value)}`
//                     );
//                   }}
//                 />
//                 <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
//                   <svg
//                     className="size-4 text-gray-400 dark:text-neutral-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <circle cx="11" cy="11" r="8"></circle>
//                     <path d="m21 21-4.3-4.3"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div className="overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
//                 <thead className="bg-gray-50 dark:bg-neutral-700">
//                   <tr>
//                     <th scope="col" className="py-3 px-4 pe-0">
//                       <div className="flex items-center h-5">
//                         <input
//                           id="hs-table-pagination-checkbox-all"
//                           type="checkbox"
//                           className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
//                         />
//                         <label
//                           htmlFor="hs-table-pagination-checkbox-all"
//                           className="sr-only"
//                         >
//                           Checkbox
//                         </label>
//                       </div>
//                     </th>
//                     {fields.map((field: any) => (
//                       <th
//                         key={field.id}
//                         scope="col"
//                         className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
//                       >
//                         {headerTranslations[field.id as keyof VehicleData] ||
//                           field.id}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
//                   {data.map((item, rowIndex) => (
//                     <tr
//                       key={rowIndex}
//                       className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
//                       onClick={() => {
//                         router.push(`/vehicle/${item.mispar_rechev}`);
//                       }}
//                     >
//                       <td className="py-3 ps-4">
//                         <div className="flex items-center h-5">
//                           <input
//                             id={`hs-table-pagination-checkbox-${rowIndex}`}
//                             type="checkbox"
//                             className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
//                           />
//                           <label
//                             htmlFor={`hs-table-pagination-checkbox-${rowIndex}`}
//                             className="sr-only"
//                           >
//                             Checkbox
//                           </label>
//                         </div>
//                       </td>
//                       {Object.values(item).map((value, cellIndex) => (
//                         <td
//                           key={cellIndex}
//                           className="p-2 border border-gray-300"
//                         >
//                           {value}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="py-1 px-4">
//               <nav
//                 className="flex items-center space-x-1"
//                 aria-label="Pagination"
//               >
//                 <button
//                   type="button"
//                   className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                   aria-label="Previous"
//                   onClick={handlePreviousClick}
//                 >
//                   <span aria-hidden="true">«</span>
//                   <span className="sr-only">Previous</span>
//                 </button>
//                 <button
//                   type="button"
//                   className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
//                   aria-current="page"
//                 >
//                   1
//                 </button>
//                 <button
//                   type="button"
//                   className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
//                 >
//                   2
//                 </button>
//                 <button
//                   type="button"
//                   className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
//                 >
//                   3
//                 </button>
//                 <button
//                   type="button"
//                   className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
//                   aria-label="Next"
//                   onClick={handleNextClick}
//                 >
//                   <span className="sr-only">Next</span>
//                   <span aria-hidden="true">»</span>
//                 </button>
//               </nav>
//               <p className="text-sm text-gray-500 dark:text-neutral-500">
//                 {" "}
//                 מראה 1 מתוך 10 מתוך {totalRows} רשומות
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Table;
