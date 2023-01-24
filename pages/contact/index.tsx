import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../lib/urlFor";
import Link from "next/link";
import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface PageProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  imageContact: Image;

  textContact: Text[];
  text2: Text[];
  title: string;
  _updatedAt: Date;
}

interface Image {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
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

export default function Page({ page }: { page: PageProps }) {
  return (
    <div className="mobile-height-svh flex justify-end nl:justify-start">
     <div className="flex flex-col pt-20 nl:w-full nl:flex-row nl:pt-72">
       
   
        <div className= " pl-4 flex-1 flex flex-col justify-between nl:pl-12">
        <div className="theText">
    {page.textContact.map((block) => {
      return block.children.map((child) => {
        if (child.marks.length > 0) {
          return child.marks.map((markKey) => {
            let mark = block.markDefs.find((mark) => mark._key === markKey);
            if (mark && mark._type === "link") {
              return <a href={mark.href}>{child.text.split("\n").map((text, i) => <React.Fragment key={i}>{text}</React.Fragment>)}</a>
            } else {
              return child.text.split("\n").map((text, i) => <React.Fragment key={i}>{text}<br/></React.Fragment>)
            }
          });
        } else {
          return child.text.split("\n").map((text, i) => <React.Fragment key={i}>{text}<br/></React.Fragment>)
        }
      });
    })}
  </div>



      <div className="flex pb-4">
      <p className=" pr-8">©Roche agency 2022</p> 
      <Link className='flex items-center ' href="/legal">Legal</Link>

      </div>

      </div>
      <div className="flex-1 nl:flex-75">
        <Image
        className="object-cover w-full h-full"
        src={urlFor(page.imageContact).url()}
        width={1800}
        height={1200}
        alt="Agency image"
      />
        </div>
     </div>
    

   
     
    </div>
  );
}

export async function getStaticProps() {
  const query = groq`*[_type == 'page' && title == 'Contact' ] {title,imageContact,textContact}`;
  const data = await client.fetch(query);
  if (data && data.length > 0) {
    return {
      props: {
        page: data[0],
      },
    };
  }
  return { props: { page: null } };
}
