import { PageQuery } from "../../generated/codegen";
import { FaMapMarker, FaAirbnb, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IconText } from "../IconText/IconText";
import { useTranslations } from "../../hooks/useTranslations";
import { useForm } from "react-hook-form";
import { useSwrGql } from "../../hooks/useSwrGql";
import {
  SendMessageDocument,
  SendMessageMutationVariables,
} from "../../generated/local-codegen";
import { gqlRequest } from "../../hooks/gqlRequest";
import React, { useState } from "react";
import { AnchorPointer } from "../AnchorPointer/AnchorPointer";

const Error: React.FC = ({ children }) => (
  <p className="text-xs italic text-red-500">{children}</p>
);

export const Contact: React.FC<{
  apartment: PageQuery["apartment"];
}> = ({ apartment }) => {
  const translate = useTranslations();
  const className =
    "py-3 px-3 w-full border border-gray-400 placeholder-gray-500 text-gray-800 focus:outline-none";
  const [submitState, setSubmitState] = useState(-1);
  const onSubmit = async (data: SendMessageMutationVariables) => {
    try {
      const res = await gqlRequest(SendMessageDocument, data);
      if (res) {
        setSubmitState(1);
      }
    } catch (e) {
      setSubmitState(0);
    }
  };
  useSwrGql;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMessageMutationVariables>();
  return (
    <div className="py-10  ">
      <AnchorPointer id="contacts" />
      <section className="main">
        <h2 className="pb-8 text-center h2">{translate("CONTACTS")}</h2>
        <div className="md:grid md:grid-cols-2">
          <div className="pb-8 leading-8">
            <a
              href={`mailto:${apartment?.email}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconText Icon={IoMdMail}>{apartment?.email}</IconText>
            </a>

            <a
              href={`tel:${apartment?.phone}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconText Icon={FaPhone}>{apartment?.phone}</IconText>
            </a>

            <a
              href={`https://www.airbnb.com/rooms/${apartment?.airbnb}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconText Icon={FaAirbnb}>Airbnb</IconText>
            </a>
            <a href={apartment?.mapLink ?? ""} target="_blank" rel="noreferrer">
              <IconText Icon={FaMapMarker}>{apartment?.address}</IconText>
            </a>
          </div>
          <form className="bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
            {submitState !== 1 && (
              <>
                <div className="gap-4 md:grid md:grid-cols-2">
                  <div className="mb-4">
                    <input
                      className={className}
                      id="name"
                      type="text"
                      placeholder={translate("INPUT_NAME")}
                      {...register("name", { required: true, minLength: 3 })}
                    />
                    {errors.name && (
                      <Error>{translate("INPUT_ERROR_NAME")}</Error>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      className={className}
                      id="email"
                      type="text"
                      placeholder={translate("INPUT_EMAIL")}
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    {errors.email && (
                      <Error>{translate("INPUT_ERROR_EMAIL")}</Error>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    className={className}
                    id="message"
                    placeholder={translate("INPUT_MESSAGE")}
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <Error>{translate("INPUT_ERROR_MESSAGE")}</Error>
                  )}
                </div>
                <div className="flex justify-end items-center">
                  <button className="button" type="submit">
                    {translate("INPUT_SEND")}
                  </button>
                </div>
              </>
            )}
            {submitState === 0 && (
              <Error>{translate("INPUT_ERROR_SUBMIT")}</Error>
            )}
            {submitState === 1 && translate("INPUT_STATUS_OK")}
          </form>
        </div>
      </section>
    </div>
  );
};