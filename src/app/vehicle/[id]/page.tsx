import Image from "next/image";
import Link from "next/link";
import React from "react";

// get params
async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const vehicle_data = await fetch(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={"mispar_rechev":"${id}"}`
  );
  const tav_raw = await fetch(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&filters={"MISPAR RECHEV":"${id}"}`
  );
  const tav_json = await tav_raw.json();

  const is_tav = tav_json.result?.total > 0;

  const vehicle_json = await vehicle_data.json();

  const data = vehicle_json.result?.records[0] as VehicleData;

  return (
    <div className="flex flex-row py-12 justify-center items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 512 512"
            className="cursor-pointer fill-current text-red-500"
            // onClick={}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M244 400L100 256l144-144M120 256h292"
            />
          </svg>
        </Link>
        <Image
          width={500}
          className="w-full"
          src="https://hips.hearstapps.com/hmg-prod/images/2019-hyundai-kona-1548195339.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {data.tozeret_nm} {data.tozeret_cd}
          </div>
          <p className="text-gray-700 text-base">
            אוטו נהדר עם תכונות מדהימות ומנוע חזק
          </p>
          <p className="text-gray-700 text-base">
            מספר רכב : {data.mispar_rechev}
          </p>
          <p className="text-gray-700 text-base">
            סוג דגם : {data.sug_degem} שנת ייצור : {data.shnat_yitzur}
          </p>
          <p className="font-bold">
            האם יש תו נכה?
            {is_tav ? "כן" : "לא"}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {data.baalut}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {data.tzeva_rechev}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {data.shnat_yitzur}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {data.sug_delek_nm}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VehiclePage;
