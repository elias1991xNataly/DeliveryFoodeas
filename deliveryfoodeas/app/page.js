
import { Button } from "/components/ui/button";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import { ChevronDown, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";




export default function Home() {



  return (
    <div className="">
      {/* flex flex-col flex-wrap justify-center items-start align-center w-screen */}
      {/* <p>HOLA Elias</p>
      <Button
      >Pulsar aquí</Button>
      <ChevronDown></ChevronDown>
      <div className="flex w-60 bg-gray-400 font-bold rounded-full border-2 items-center justify-center">
        <LinkIcon></LinkIcon>
        <Link href="/about">ABOUT</Link>
      </div> */}
      <CategoryList />
      <BusinessList />


    </div>
  );
}
