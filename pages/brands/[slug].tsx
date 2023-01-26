import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../lib/urlFor";
import { Slug } from "../../typings";
import React, { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useLocomotiveScroll } from 'react-locomotive-scroll'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  const  {scroll}  = useLocomotiveScroll()

  const ref = useRef(null);
  const options = {
    smooth: true,
    direction: "horizontal",
    lerp : 0.05,
    class: 'vivisible',
    scrollFromAnywhere: true,
    smartphone: {
      direction: "vertical",
      resetNativeScroll: true,
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    
    }, 100);
   
    AOS.init();

    return () => {
      AOS.refresh();

    };
  }, []);

  return (
    <LocomotiveScrollProvider options={options} watch= {[]} scroll = {scroll} containerRef={ref}  onLocationChange={(scroll: { scrollTo: (arg0: number, arg1: { duration: number; disableLerp: boolean; }) => any; }) => scroll.scrollTo(0, { duration: 0, disableLerp: true })} // If you want to reset the scroll position to 0 for example
    onUpdate={() => console.log('Updated, but not on location change!')}>
      {page && page.length > 0 ? (
        page.map((brand, i) => (
          <div className="fixedPhoto" key={i}>
   <div
          
              className="tofix flex-1 pl-4 pr-24 pt-20 pb-12 nl:flex items-end nl:p-12 "
            >
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
                        | ReactElement<any, string | JSXElementConstructor<any>>
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
            </div> 
          <main      data-aos-duration="1400"
                data-aos-easing="new-easing"
                data-aos-once="true"
                data-aos="new-fade-left" className ='brand fixedPhoto top-0 ' data-load-container data-scroll-container ref={ref}>
         

         {brand.image && brand.image.length > 0 ? (
              brand.image.map(
                (img: { asset: any; },id: React.Key | null | undefined,id2: React.Key | null | undefined) => (
                  <section className="intro" data-scroll-section data-scroll-position = "left" data-scroll-call = 'section' key={id}>
                    <Image
                      key={id2}
                      className=" object-cover h-full nl:w-auto w-full"
                      src={urlFor(img.asset).url()}
                      width={1800}
                      priority
                      height={1200}
                      alt="Agency image"
                    />
                  </section>
                )

              )
            ) : (
              <p>You forgot to add images</p>
            )}
              <section  className="intro  h-full filler" data-scroll-section></section>
              <section className="intro filler h-full" data-scroll-section></section>
          </main>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </LocomotiveScrollProvider>
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
  return { paths, fallback: true  };
}
