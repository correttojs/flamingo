import { Button } from "@packages/ui/Button/Button";
import React from "react";
import { FaRegIdCard } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Modal from "react-modal";

import classNames from "classnames";
import { H3 } from "@packages/ui/Typography";
import { MQ_NOT_MOBILE } from "../Layout";
import { ReservationsQuery } from "./reservations.generated";

export const Reservation: React.FC<{
  reservation: NonNullable<ReservationsQuery["reservations"]>[0];
  onClose: (e: any) => void;
}> = ({ reservation, onClose }) => {
  if (!reservation) {
    return null;
  }
  return (
    <Modal
      isOpen={!!reservation}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      shouldCloseOnOverlayClick={false}
    >
      <div
        css={`
          width: calc(100vw * 0.9);
          @media ${MQ_NOT_MOBILE} {
            width: calc(100vw * 0.8);
          }
        `}
      >
        <H3 className="my-2">{reservation.guest_name}</H3>

        <div className="my-2">
          <p>
            <i className="text-red-900">Apartment:</i> {reservation.home}
          </p>
          <p>
            <i className="text-red-900">Check-in:</i> {reservation.check_in}
          </p>
          <p>
            <i className="text-red-900">Check-out:</i> {reservation.check_out}
          </p>
          <p>
            <i className="text-red-900">Phone:</i> {reservation.phone}
          </p>
          <p>
            <a
              className="underline"
              href={reservation.registrationUrl ?? ""}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <FaRegIdCard style={{ display: "inline" }} /> register
              </span>
            </a>
            {/* {" - "} */}
            {/* <a className="underline" href={reservation.faqUrl} target="_blank">
              <span>
                <MdHelpOutline style={{ display: "inline" }} /> faq
              </span>
            </a> */}
          </p>
        </div>
        <H3 className="mt-4 mb-2 text-red-900">Guests</H3>
        <div className="flex flex-col md:flex-row">
          {reservation?.guests?.map((guest, k) => {
            if (!guest) {
              return null;
            }
            return (
              <div
                key={`guest${k}`}
                className={classNames([`my-2`, k > 0 && `md:ml-2`])}
              >
                <p>
                  <MdAccountCircle style={{ display: "inline" }} />{" "}
                  {guest.lastName} {guest.firstName}
                </p>
                <p>
                  <i className="text-red-900">Document: </i>
                  {guest.docFile ? (
                    <a
                      className="underline"
                      href={guest.docFile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {guest.documentType}
                    </a>
                  ) : (
                    guest.documentType
                  )}
                  : {guest.documentNumber}{" "}
                  {guest.documentPlace && `(${guest.documentPlace})`}
                </p>
                <p>
                  <i className="text-red-900">Nationality: </i>
                  {guest.nationality}
                </p>
                <p>
                  <i className="text-red-900">Birth: </i>
                  {guest.birthDate}
                  {guest.placeOfBirth && `(${guest.placeOfBirth})`}
                </p>
              </div>
            );
          })}
        </div>
        <Button isInverted={true} onClick={onClose} className="m-4">
          Ok
        </Button>
      </div>
    </Modal>
  );
};
