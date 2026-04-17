import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
}

export default function Link({ children, ...rest }: LinkProps) {
  return (
    <NextLink
      {...rest}
      className={
        "flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95 min-w-30"
      }
    >
      {children}
    </NextLink>
  );
}
