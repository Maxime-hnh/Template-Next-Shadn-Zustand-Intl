
import { PropsWithChildren } from "react";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import { Toaster } from "@/_components/ui/sonner";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { NextIntlClientProvider } from "next-intl";

export function PublicProviders(props: PropsWithChildren) {

  return (
    <NextIntlClientProvider>
      <IsMobileObserver />
      <Toaster />
      <div className="flex min-h-screen flex-col" id="rootLayout">
        <Header />

        <main className="flex-1 mt-4 pt-[60px] px-1 lg:px-4">{props.children}</main>

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
