import type { GetStaticProps, NextPage } from "next";
import React from "react";
import { Section } from "../../components/Layout/Globals";
import { Layout } from "../../components/Layout/Layout";
import { Links } from "../../generated/codegen";

import { getStaticPathsApartments } from "../../server/getStaticPathsApartments";
import { PageProps, getPageProps } from "../../server/getPageProps";

export const getStaticPaths = getStaticPathsApartments("/howto");

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  return {
    props: await getPageProps({ params, pageType: Links.Howto }),
  };
};

const HowTo: NextPage<PageProps> = ({ page, links, sections, apartment }) => {
  return (
    <Layout title={apartment?.name ?? ""} links={links}>
      <div
        className={Section}
        dangerouslySetInnerHTML={{ __html: page?.content?.html ?? "" }}
      ></div>
      {sections?.map((section, k) => {
        return (
          <div key={k}>
            <h1>{section.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: section?.content?.html ?? "",
              }}
            />
          </div>
        );
      })}
    </Layout>
  );
};

export default HowTo;
