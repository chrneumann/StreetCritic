"use client";

import Header from "@/components/header";
import { createTheme, MantineProvider, rem } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  headings: {
    sizes: {
      h1: {
        fontSize: rem(36),
      },
      h2: { fontSize: rem(30), lineHeight: "1.5" },
      // ...up to h6
      h6: { fontWeight: "900" },
    },
  },
  /* colors: {
   *   'streetcritic-green': [
   *     "#fcffeb",
   *     "#f8fed5",
   *     "#effea4",
   *     "#e7fe6f",
   *     "#e0fe48",
   *     "#dbfe34",
   *     "#d8fe2b",
   *     "#bee221",
   *     "#a8c916",
   *     "#90ad00"
   *   ],
   * },
   * primaryColor: "streetcritic-green", */
});

import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_KEYCLOAK_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI,
  onSigninCallback: (_user: any): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

type Props = {
  children: React.ReactNode;
};

export default function App({ children }: Props) {
  return (
    <AuthProvider {...oidcConfig}>
      <MantineProvider theme={theme}>
        <Header />
        {children}
      </MantineProvider>
    </AuthProvider>
  );
}