import NewTable from "./components/newTable";
// import Table from "./components/table";

const all_fields = [
  "_id",
  "mispar_rechev",
  "tozeret_cd",
  "sug_degem",
  "tozeret_nm",
  "shnat_yitzur",
  "baalut",
  "kinuy_mishari",
  "tzeva_rechev",
];

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  // get search params

  const params = await searchParams;
  const searchTerm = params?.search || "";

  const searchSeq = searchTerm
    ? `&filters={"mispar_rechev":"${searchTerm}"}`
    : "";

  const offSet = params?.offset || 0;

  const response = await fetch(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=5${searchSeq}&offset=${offSet}&fields=${all_fields.join(
      ","
    )}`,
    {
      method: "POST",
    }
  );
  const jsonResponse = await response.json();
  const data = jsonResponse.result?.records;

  const fields = jsonResponse.result?.fields as VehicleField[];

  // const records = data.result?.records as VehicleDataArray;
  const totalRecords = jsonResponse.result?.total as number;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Table fields={fields} data={data} totalRows={totalRecords} /> */}
        <NewTable data={data} totalRows={totalRecords} fields={fields} />
      </main>
    </div>
  );
}
