
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section id="main" className="flex h-full max-md:flex-col-reverse ">
    {/* left section */}
    <div className="flex-col flex-1 p-5">
      <div className="max-md:p-0 p-8">
        <h1 className="max-md:mt-0 mt-[110px] text-4xl font-extrabold text-primary dark:text-white" >
          Connect Seamlessly with <span className="text-gray-600">ChatFlex</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Experience the freedom of communication without worrying about language limitations. ChatFlex offers both voice and video chats, allowing you to connect with people effortlessly.
        </p>
        <div className="flex mt-10 gap-5 max-md:justify-center">
            <Link href={"/chat"}>
              <Button>Get Started</Button>
            </Link>
            <Link href={"/pricing"}>
              <Button  variant={"outline"} className="border-primary hover:text-primary text-primary flex items-center gap-2" >
                View Pricing
                <ArrowRight size={14}/>
              </Button>
            </Link>
        </div>
      </div>
    </div>

    {/* right section */}
    <div className="flex-1 ">
        <div className="flex items-center h-full justify-center">
            <div className="mt-12 w-fit dark:bg-transparent">
               <Image height={600} width={600} src={"/ChatFlex.svg"} alt="ChatFlex" placeholder="empty"/>
            </div>
        </div>
    </div>
  </section>
  );
}
