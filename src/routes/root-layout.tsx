import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const RootLayout = () => {
  return (
    <>
      <SiteHeader />
      {/* Content */}
      <main className="flex flex-wrap pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </div>
      </main>
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </>
  );
};

export { RootLayout };
