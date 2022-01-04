import classNames from "classnames";
import React from "react";

export const Section: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...props }) => (
  <section
    className={classNames("p-4 md:p-8 max-w-screen-xl mx-auto", className)}
    {...props}
  >
    {children}
  </section>
);
