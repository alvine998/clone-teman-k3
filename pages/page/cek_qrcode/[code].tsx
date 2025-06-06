import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome, FaFlag, FaBook, FaUser } from "react-icons/fa";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import axios from "axios";
import Image from "next/image";
import { CONFIG } from "@/config";

export async function getServerSideProps(context: any) {
  try {
    const { code } = context.params;
    const result = await axios.get(
      `${CONFIG.base_url_api}/members?pagination=true&search=${code}`,
      {
        headers: {
          "bearer-token": "temank3ku",
        },
      }
    );
    return {
      props: {
        detail: result.data.items.rows || [],
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Qrcode({ detail }: { detail: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const details = detail?.[0];
  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  const keys = [
    { label: "Nama", value: details?.name },
    { label: "Tempat Lahir", value: details?.birth_place },
    { label: "Tanggal Lahir", value: details?.birth_date },
    { label: "Jenis Personel", value: details?.personel_type },
    { label: "Jenis Alat", value: details?.tool_type },
    { label: "Klasifikasi", value: details?.clasification },
    { label: "No Registrasi", value: details?.regis_no },
    { label: "Kelas", value: details?.class },
    { label: "Masa Berlaku", value: details?.expired_at },
  ];
  return (
    <div className="relative">
      <div
        className={`w-full ${
          open ? "h-100 absolute" : "h-20"
        } transition-all duration-300 p-2 bg-[#15406A]`}
      >
        <div className="flex justify-between items-center">
          <a href="https://temank3.kemnaker.go.id">
            <img
              src="https://temank3.kemnaker.go.id/public/themes/website/asset/img/logo.png"
              alt="logo"
              className="w-[170px] h-[58px]"
            />
          </a>
          <div className="sm:block hidden sm:px-5 px-0">
            <ul className="flex">
              <li className="flex items-center px-4 py-2 gap-1">
                <FaHome className="text-lg text-white" />
                <a
                  href="https://temank3.kemnaker.go.id"
                  className="block text-white"
                >
                  BERANDA
                </a>
              </li>
              <li className="flex items-center px-4 py-2 gap-1">
                <FaFlag className="text-lg text-white" />
                <a
                  href="https://temank3.kemnaker.go.id/page/flowchart"
                  className="block text-white"
                >
                  FLOW CHART LAYANAN
                </a>
              </li>
              <li className="flex items-center px-4 py-2 gap-1">
                <a
                  href="https://temank3.kemnaker.go.id/page/news"
                  className="block text-white"
                >
                  INFO & ARTIKEL
                </a>
              </li>
              <li className="flex items-center px-4 py-2 gap-1">
                <FaBook className="text-lg text-white" />
                <a
                  href="https://temank3.kemnaker.go.id/page/perundangan"
                  className="block text-white"
                >
                  DOKUMEN K3
                </a>
              </li>
              <li className="flex items-center px-4 py-2 gap-1">
                <FaUser className="text-lg text-white" />
                <a
                  href="https://temank3.kemnaker.go.id/page/kontak"
                  className="block text-white"
                >
                  HUBUNGI KAMI
                </a>
              </li>
              <li className="flex items-center px-4 py-2 gap-1">
                <a
                  href="https://temank3.kemnaker.go.id/login"
                  className="block text-white"
                >
                  LOGIN
                </a>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="border sm:hidden border-[#FFFFFF8C] focus:border-2 p-2 rounded-md w-16 flex items-center justify-center"
          >
            <RxHamburgerMenu className="text-[#FFFFFF8C]" fontSize={30} />
          </button>
        </div>
        <div className={`${open ? "block" : "hidden"}`} id="dropdown-menu">
          <ul>
            <li className="flex items-center px-4 py-2 gap-1">
              <FaHome className="text-lg text-white" />
              <a
                href="https://temank3.kemnaker.go.id"
                className="block text-white"
              >
                BERANDA
              </a>
            </li>
            <li className="flex items-center px-4 py-2 gap-1">
              <FaFlag className="text-lg text-white" />
              <a
                href="https://temank3.kemnaker.go.id/page/flowchart"
                className="block text-white"
              >
                FLOW CHART LAYANAN
              </a>
            </li>
            <li className="flex items-center px-4 py-2 gap-1">
              <a
                href="https://temank3.kemnaker.go.id/page/news"
                className="block text-white"
              >
                INFO & ARTIKEL
              </a>
            </li>
            <li className="flex items-center px-4 py-2 gap-1">
              <FaBook className="text-lg text-white" />
              <a
                href="https://temank3.kemnaker.go.id/page/perundangan"
                className="block text-white"
              >
                DOKUMEN K3
              </a>
            </li>
            <li className="flex items-center px-4 py-2 gap-1">
              <FaUser className="text-lg text-white" />
              <a
                href="https://temank3.kemnaker.go.id/page/kontak"
                className="block text-white"
              >
                HUBUNGI KAMI
              </a>
            </li>
            <li className="flex items-center px-4 py-2 gap-1">
              <a
                href="https://temank3.kemnaker.go.id/login"
                className="block text-white"
              >
                LOGIN
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`lg:px-[35%] px-4 p-4 ${open ? "pt-24" : ""} `}>
        {detail?.length > 0 ? (
          <>
            <h1 className="text-[26px] text-[#15406A] text-center font-semibold">
              Hasil Scan QR Personil
            </h1>
            <div className="border-4 sm:border-[7px] sm:rounded-xl border-[#15406A] rounded-lg bg-white mt-2 relative">
              <div className="bg-[#15406A] w-full lg:h-auto p-3 lg:-mt-1 -mt-0 relative z-20">
                <img
                  src="https://temank3.kemnaker.go.id/public/themes/website/asset/img/logo.png"
                  alt="logo"
                  className="w-[170px] h-[58px]"
                />
                {/* <h1 className='text-center font-semibold text-xl text-white'>BIODATA PERSONIL</h1> */}
              </div>
              <div className="relative z-20 -mt-1">
                <Image
                  alt="card"
                  src={"/topper2.png"}
                  layout="relative"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div className="relative -mt-10 mb-4 z-20">
                <div className="flex justify-center items-center">
                  <img
                    alt="photo-user"
                    src={details?.photo}
                    className="w-[150px] h-[200px]"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2 pl-5 mt-5">
                    {keys?.map((item: any) => (
                      <p className="font-bold lg:text-sm text-xs uppercase">
                        {item?.label}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 pl-5 mt-5">
                    {keys?.map((item: any) => (
                      <p
                        className={`font-bold text-[#15406A] mr-14 ${
                          item?.value?.length > 20
                            ? "text-xs lg:mr-10"
                            : "lg:text-sm text-xs lg:mr-28"
                        } ${
                          item?.label == "Jenis Personel"
                            ? ""
                            : item?.label == "Kelas"
                            ? ""
                            : item?.label == "Klasifikasi"
                            ? ""
                            : "uppercase"
                        }`}
                      >
                        : {item?.value}
                      </p>
                    ))}
                  </div>
                </div>
                {/* <p className='font-bold text-sm mt-1'>Nama: {details?.name}</p>
                                    <p className='font-bold text-sm mt-1'>Tempat Lahir: {details?.birth_place}</p>
                                    <p className='font-bold text-sm mt-1'>Tanggal Lahir: {(new Date(details?.birth_date)?.getDate() < 10 ? (("0" + new Date(details?.birth_date)?.getDate())) : new Date(details?.birth_date)?.getDate()) + " " + months?.find((v: any) => v.value == (new Date(details?.birth_date)?.getMonth() + 1))?.label + " " + new Date(details?.birth_date)?.getFullYear()}</p>
                                    <p className='font-bold text-sm mt-1'>Jenis Personel: {details?.personel_type || "-"}</p>
                                    <p className='font-bold text-sm mt-1'>Jenis Alat: {details?.tool_type || "-"}</p>
                                    <p className='font-bold text-sm mt-1'>Klasifikasi: {details?.clasification || "-"}</p>
                                    <p className='font-bold text-sm mt-1'>Kelas: {details?.class}</p>
                                    <p className='font-bold text-sm mt-1'>No. Registrasi: {details?.regis_no}</p>
                                    <p className='font-bold text-sm mt-1'>Masa Berlaku: {(new Date(details?.expired_at)?.getDate() < 10 ? (("0" + new Date(details?.expired_at)?.getDate())) : new Date(details?.expired_at)?.getDate()) + " " + months?.find((v: any) => v.value == (new Date(details?.expired_at)?.getMonth() + 1))?.label + " " + new Date(details?.expired_at)?.getFullYear()}</p> */}
              </div>
              <div className="z-10 absolute top-0 w-full h-full">
                <Image
                  alt="bg"
                  src={"/bg-22.png"}
                  layout="responsive"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div className="relative z-20">
                <Image
                  alt="card"
                  src={"/bottom-remove.png"}
                  layout="responsive"
                  width={500}
                  height={300}
                  className="w-full h-auto -mt-28"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-red-200 p-2">
            <h1 className="text-[28px] text-red-800 text-center font-semibold">
              Data yang Anda Cari Tidak Terdaftar di Database Teman K3
            </h1>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="mt-2">
        <div className="bg-[#15406A] w-full p-2 sm:p-10">
          <div className="sm:px-20 px-0 sm:flex sm:items-center sm:justify-center">
            <img
              alt="support"
              src="https://temank3.kemnaker.go.id/public/themes/website/asset/img/logofooter1.png"
              className="w-full h-100 sm:w-[900px]"
            />
          </div>
          <p className="text-white text-center">
            Jl. Jenderal Gatot Subroto Kav.51, Daerah Khusus Ibukota Jakarta,
            12750, Indonesia
          </p>
        </div>
        <div className="bg-black w-full p-5">
          <p className="text-white text-center font-semibold">
            Copyright GG &copy; 2020-2024 Ditjen Binwasnaker & K3, Kemnaker R.I.
          </p>
        </div>
        <div className="bg-white w-full p-7"></div>
      </div>
    </div>
  );
}
