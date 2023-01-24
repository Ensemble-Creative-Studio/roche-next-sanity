import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import React from "react";
import Image from "next/image";
import urlFor from "../../lib/urlFor";

interface PageProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  textLegal: Text[];
  _updatedAt: Date;
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
    <div className="pt-24 pl-4 nl:pl-12 grid grid-cols-6 pr-4 pb-12">
 <div className="col-span-6 nl:col-span-3">
      {page.textLegal.map((block) => {
    return block.children.map((child) => {
        if (block.style === "h3") {
          return <h3 className="text-base">{child.text.split("\n").map((text, i) => <React.Fragment key={i}>{text}</React.Fragment>)}</h3>;
        }
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
    </div>
   
  );
}

export async function getStaticProps() {
  const query = groq`*[_type == 'page' && title == 'Legal' ] {textLegal,}`;
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
