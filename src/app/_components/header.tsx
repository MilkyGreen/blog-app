import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="underline">
        返回列表
      </Link>
      
    </h2>
  );
};

export default Header;
