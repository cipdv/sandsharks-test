import AboutTheLeague from "@/components/AboutTheLeague";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  return (
    <section className="w-full flex-center mt-6">
      <h1 className="text-3xl font-bold">
        Toronto SandSharks is a beach volleyball league for LGBTQ+ folks and
        allies.
      </h1>
      <Image
        src="/images/sandsharks-group.jpg"
        width={100}
        height={100}
        className="w-full object-cover mt-4"
        alt="Sandsharks group photo"
      />
      <AboutTheLeague />
      <Link href="/signup">
        <button className="btn mt-4">Become a member</button>
      </Link>
    </section>
  );
}
