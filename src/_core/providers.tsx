import { PropsWithChildren } from "react";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import { ThemeProvider } from "@/_components/ui/theme-provider";
import IsMobileObserver from "@/_components/IsMobileObserver";
import { NextIntlClientProvider } from "next-intl";

export function Providers(props: PropsWithChildren) {

  return (
    <NextIntlClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="theme"
      >
        <IsMobileObserver />
        <Toaster />
        <div className="flex min-h-screen flex-col" id="rootLayout">
          <Header />

          <main className="flex-1 mt-4 pt-[60px] px-1 lg:px-4">{props.children}</main>

          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
