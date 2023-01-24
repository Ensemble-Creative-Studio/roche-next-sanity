import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../lib/urlFor";
import { Slug } from "../../typings";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
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

export default function BrandsPost({ page }: { page: PageProps }) {
  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = "/js/slide.js";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   }

  // }, []);

  const mainRef = useRef(null);
  var tl = gsap.timeline();
  const handleWheel = (event: {
    preventDefault: () => void;
    deltaY: number;
  }) => {
    var container = document.getElementById("wrapper");
    gsap.to(container, {
      xPercent: -100,
      ease: "none",
    });
  };

  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div>
      {page && page.length > 0 ? (
        page.map((brand, i) => (
          <div
            ref={mainRef}
            onWheel={handleWheel}
            id="main"
            className="nl:flex nl:h-screen nl:fixed nl:top-0 -z-10 overflow-scroll scrollable"
            key={i}
          >
  
              {/* <div className="flex-1 pl-4 pr-24 pt-20 pb-12 nl:flex items-end nl:p-12 ">
                <div
                  data-aos-duration="1400"
                  data-aos-easing="new-easing"
                  data-aos-once="true"
                  data-aos="new-fade-left"
                  data-aos-delay="200"
                  className=" nl:max-w-xl nl:fixed nl:-z-10"
                >
                  {brand.text.map((block: { children: any[] }) => {
                    return block.children.map(
                      (child: {
                        marks: string | string[];
                        text:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | ReactFragment
                          | ReactPortal
                          | null
                          | undefined;
                      }) => {
                        return child.marks.indexOf("strong") !== -1 ? (
                          <strong>{child.text}</strong>
                        ) : (
                          child.text
                        );
                      }
                    );
                  })}
                </div>
              </div> */}

              <div
                id="scroller"
                data-aos-duration="1400"
                data-aos-easing="new-easing"
                data-aos-once="true"
                data-aos="new-fade-left"
                className=" nl:relative nl:left-2/4 nl:pl-24 nl:flex scrollable "
              >
                {brand.image && brand.image.length > 0 ? (
                  brand.image.map(
                    (img: { asset: any }, idx: Key | null | undefined) => (
                      <Image
                        key={idx}
                        className=" object-cover h-full "
                        src={urlFor(img.asset).url()}
                        width={1800}
                        height={1200}
                        alt="Agency image"
                      />
                    )
                  )
                ) : (
                  <p>You forgot to add images</p>
                )}
              </div>
            </div>
 
 
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export const getStaticProps = async (context: { params: { slug: any } }) => {
  const { slug } = context.params;
  const query = groq`*[_type == 'brands' && slug.current == $slug]`;
  const data = await client.fetch(query, { slug });
  return {
    props: {
      page: data,
    },
  };
};

export async function getStaticPaths() {
  const query = groq`*[_type == 'brands'  ]{slug, image,text}`;
  const data = await client.fetch(query);
  const paths = data
    .filter((brand: { slug: null }) => brand.slug !== null)
    .map((brand: { slug: { current: any } }) => ({
      params: { slug: brand.slug.current },
    }));
  return { paths, fallback: false };
}
