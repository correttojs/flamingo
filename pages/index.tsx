import type { NextPage } from "next";
import { gqlRequest } from "../gql/gqlRequest";
import gql from "graphql-tag";
import { Hero } from "../components/Hero/Hero";
import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Section } from "../components/Layout/Globals";

export const getStaticProps = async () => {
  const data = await gqlRequest(gql`
    query Page {
      page(where: { link: "/" }) {
        title
        content {
          html
        }
      }
    }
  `);
  return {
    props: data,
  };
};

const Home: NextPage<any> = ({ page }) => {
  return (
    <Layout>
      <Hero title={page.title} />
      <div
        className={Section}
        dangerouslySetInnerHTML={{ __html: page.content.html }}
      ></div>
    </Layout>
  );
};

export default Home;
