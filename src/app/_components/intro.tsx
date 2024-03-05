import { CMS_NAME } from "@/app/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex mt-16 mb-16 md:mb-12 items-center justify-center">
      <h1 className="text-xl md:text-2xl font-bold tracking-tighter leading-tight md:pr-4 text-center">
        Li Yunmeng's Blog.
      </h1>
      {/* <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and {CMS_NAME}.
      </h4> */}
    </section>
  );
}
