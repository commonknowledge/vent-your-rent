/** @jsx jsx */
import { jsx } from "@emotion/core";

import { FunctionComponent } from "react";

import PageHeader from "./PageHeader";
import Footer from "./Footer";

type PageProps = {};

const Page: FunctionComponent<PageProps> = ({ children }) => (
  <div>
    <PageHeader />
    {children}
    <Footer />
  </div>
);

export default Page;
