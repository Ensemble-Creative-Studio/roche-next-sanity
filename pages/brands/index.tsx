import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../lib/urlFor";
import { Slug } from "../../typings";
import Link from "next/link";
import { useRouter } from "next/router";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import gsap from "gsap";

import { useState } from "react";
interface PageProps {
  length: number;
  map(arg0: (brand: any, i: any) => JSX.Element): import("react").ReactNode;
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  image: Image[];
  name: string;
  text: Text[];
  slug: Slug;
}

interface Image {
  _key: string;
  _type: ImageType;
  asset: Asset;
}

enum ImageType {
  Image = "image",
}

interface Asset {
  _ref: string;
  _type: AssetType;
}

enum AssetType {
  Reference = "reference",
}

interface Text {
  _key: string;
  _type: string;
  children: Child[];
  markDefs: any[];
  style: string;
}

interface Child {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
}

export default function Brands({ page }: { page: PageProps }) {

  return (
    <div className="mobile-height-svh flex justify-end">
    <div className="grid grid-cols-2 grid-rows-2 nl:grid-cols-4 nl:grid-rows-1">
      {page && page.length > 0 ? (
        page.map((brand, i) => (
 
          <div className="animated row-start-2 flex justify-end" key={i}>
            
                       <Link className='flex p-4 flex-col-reverse items-start nl:pr-12 nl:pl-12 nl:pb-8 '  href={`/brands/${encodeURIComponent(brand.slug?.current) }`}>
            <h2 className="pt-4">{brand.name}</h2>
    
            {brand.image ? (
              <Image
                className="object-cover nl:h-full"
                src={urlFor(brand.image).url()}
                width={1800}
                height={1200}
                alt="Agency image"
              />
            ) : (
              <p>You forgot to add images</p>
            )}
            </Link>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
    </div>
  );
}

export async function getStaticProps() {
  const query = groq`*[_type == 'brands'  ]{name, image[1], slug}`;
  const data = await client.fetch(query);
  if (data && data.length > 0) {
    return {
      props: {
        page: data,
      },
    };
  }
  return { props: { page: null } };
}
