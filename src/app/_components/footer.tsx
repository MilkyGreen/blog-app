import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <Container>
        <div className="py-3 flex flex-col lg:flex-row items-center justify-center">
          <h3 className="text-l font-bold tracking-tighter leading-tight text-center items-center">
            Statically Generated with Next.js.
          </h3>
          {/* <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-1 lg:w-1/2">
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-6 lg:px-2 duration-100 transition-colors mb-3 lg:mb-0"
            >
              Read Documentation
            </a>
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="mx-1 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div> */}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
