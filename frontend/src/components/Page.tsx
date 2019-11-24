/** @jsx jsx */
import { jsx } from "@emotion/core";

import { FunctionComponent } from "react";

import PageHeader from "./PageHeader";

type PageProps = {};

const Page: FunctionComponent<PageProps> = ({ children }) => (
  <div>
    <PageHeader />
    {children}
  </div>
);

export default Page;
