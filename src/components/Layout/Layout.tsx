import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Nav } from "../Nav/Nav";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const Layout: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Head>
          <title>Candor</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav title={title} />

        {children}

        <footer
          className={
            "flex flex-col justify-items-center justify-center items-center border border-solid border-white w-full h-24"
          }
        >
          © correttoweb 2020
        </footer>
      </div>
    </QueryClientProvider>
  );
};
