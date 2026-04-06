import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex items-center gap-2" href="/">
      <Image
        alt="Logo"
        height={32}
        priority
        src="/images/logo.png"
        width={32}
      />
    </Link>
  );
}
