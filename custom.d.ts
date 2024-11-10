declare global {
  export type VehicleField = {
    id: string;
    type: string;
  };
  export type VehicleData = {
    _id: number;
    mispar_rechev: number;
    tozeret_cd: number;
    sug_degem: string;
    tozeret_nm: string;
    degem_cd: number;
    degem_nm: string;
    ramat_gimur: string;
    ramat_eivzur_betihuty: number;
    kvutzat_zihum: number;
    shnat_yitzur: number;
    degem_manoa: string;
    mivchan_acharon_dt: string; // Date string in "YYYY-MM-DD" format
    tokef_dt: string; // Date string in "YYYY-MM-DD" format
    baalut: string;
    misgeret: string;
    tzeva_cd: number;
    tzeva_rechev: string;
    zmig_kidmi: string;
    zmig_ahori: string;
    sug_delek_nm: string;
    horaat_rishum: number;
    moed_aliya_lakvish: string; // Format could vary (e.g., "YYYY-MM")
    kinuy_mishari: string;
  };

  // Example array type
  export type VehicleDataArray = VehicleData[];
}

export default global;
