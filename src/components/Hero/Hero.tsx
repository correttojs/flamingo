import Image from "next/image";
import React from "react";
import { useMounted } from "../../hooks/useMounted";
import { useTranslations } from "../../hooks/useTranslations";
import background from "./background.jpg";

export const Hero: React.FC<{ title: string }> = ({ title }) => {
  const isMounted = useMounted();
  const translate = useTranslations();
  // const { data } = useSwrGql(
  //   ApartmentListDocument,
  //   {},
  //   { url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT }
  // );
  // console.log(data);
  return (
    <div className={"flex flex-col justify-center h-screen bg-black"}>
      <div className={"overflow-hidden absolute w-screen h-screen"}>
        <Image
          alt="Candor"
          src={background}
          layout="fill"
          objectFit="cover"
          quality={100}
          placeholder="blur"
        />
      </div>
      <div className="z-10 text-center text-white drop-shadow-lg text-shadow">
        <h3
          className={`m-4 text-xl uppercase transform transition-transform duration-500 ${
            isMounted ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          Loc. Pre - Garda lake - Verona
        </h3>
        <h1 className="font-bold h1">{`Welcome to Residence ${title}`}</h1>
        <button
          className={`m-8 text-l  transform transition-all duration-500 ${
            isMounted ? "translate-y-0" : "translate-y-full"
          } border border-1 border-white px-6 py-2 hover:bg-white hover:text-gray-900`}
        >
          {translate("Hero_ReadMore")}
        </button>
      </div>

      <div>{/* <Card /> */}</div>
    </div>
  );
};
