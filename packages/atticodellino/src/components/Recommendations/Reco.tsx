import React from "react";
import { AnchorPointer } from "@packages/ui/AnchorPointer";
import { useTranslations } from "@/hooks/useTranslations/useTranslations";
import { useReactQuery } from "@correttojs/next-utils/useReactQuery";

import { Loading } from "../@UI/Loading";
import { Section } from "../@UI/Section";
import { H2, H3 } from "../@UI/Texts";
import { RecoDocument } from "./reco.generated";

export const RecoPage: React.FC = () => {
  const { data, isLoading, error } = useReactQuery(RecoDocument);

  const translate = useTranslations();
  if (isLoading && !error) {
    return <Loading />;
  }

  return (
    <div className="pb-8">
      <Section>
        <AnchorPointer id="reco" />
        <H2 className="mr-2 ">{translate("RECO")}</H2>
      </Section>
      {(data?.reco ?? []).map((item, i) => (
        <div key={"reco" + i}>
          <Section className="py-4" id={"recos" + i}>
            {item?.link ? (
              <a
                href={item?.link ?? ""}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                <H3>{item?.title}</H3>
              </a>
            ) : (
              <H3>{item?.title}</H3>
            )}

            <div
              css={`
                min-width: 320px;
              `}
              dangerouslySetInnerHTML={{
                __html: item?.description.html ?? "",
              }}
            />
          </Section>
        </div>
      ))}
    </div>
  );
};
