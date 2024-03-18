"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Record, Bookmark } from "@/app/interfaces/bookmarks";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function LinkNav({ data }: { data: Bookmark[] }) {
  const pathname = usePathname().substring(6);
  console.log('pathname', pathname);
  return (

    <div className='w-60 fixed top-20 h-screenMinusFooter ml-10'>
      <nav className="flex flex-col space-y-0">
        <ScrollArea className="h-screenMinusFooter">
          {
            data.map((i) => {
              return (
                <Link
                  className={clsx(
                    'm-2 text-gray-500 hover:bg-blue-100 flex items-center py-2 px-4 text-sm pr-2 rounded-xl',
                    {
                      'text-gray-500 no-underline bg-blue-200': decodeURIComponent(pathname) == (i.title),
                    },
                  )}
                  key={i.title} href={`/link/${i.title}`}>{i.title}</Link>
              );
            })}
        </ScrollArea>
      </nav>

    </div>

  );
}

// export default function LinkNav({data}: {data: Bookmark[]}) {
//   const pathname = usePathname();
//   return (
//     <div className='w-70 bg-gray-100  ml-20 overflow-y-auto overflow-x-hidden h-screenMinusFooter flex-col fixed top-20 pt-4 pb-5 mb-20 mb-20'>
//       {/* <ul className="divide-y divide-gray-300 space-y-4 w-full "> */}
//       <nav className="flex flex-col items-center justify-center space-y-0">
//         {
//           data.map((i) => {
//             return (
//               // <li key={i.title}>
//                 <Link
//                   className={clsx(
//                     'm-2 text-blue-500 hover:text-gray-500 flex items-center w-full py-2 px-4 text-sm',
//                     {
//                       'text-gray-500 no-underline': pathname.endsWith(i.title),
//                     },
//                   )}
//                   key={i.title} href={`/link/${i.title}`}>{i.title}</Link>
//               // </li>
//             );
//           })}
//       {/* </ul> */}
//       </nav>
//       {/* <div className='mt-20'>2222</div> */}
//     </div>
//   );
// }