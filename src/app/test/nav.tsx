/**
 * v0 by Vercel.
 * @see https://v0.dev/t/V918sJhIlYm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Nav() {
  return (
    <div className="h-screenMinusFooter w-40 overflow-y-auto flex flex-col fixed top-20 left-0 mb-20">
      <nav className="flex-1 flex flex-col items-start">
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          {/* <HomeIcon className="h-4 w-4 mr-2" /> */}
          Home
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          {/* <ActivityIcon className="h-4 w-4 mr-2" /> */}
          Activity
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link><Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>
        <Link className="flex items-center w-full py-2 px-4 text-sm" href="#">
          <MessagesSquareIcon className="h-4 w-4 mr-2" />
          Messages
        </Link>

      </nav>
    </div>
  )
}

function ActivityIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}


function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MessagesSquareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
