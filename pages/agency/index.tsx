import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../lib/urlFor";
import AOS from "aos";
import { useEffect } from "react";
interface PageProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  image1: Image;
  image2: Image;
  image3: Image;
  image4: Image;
  image5: Image;
  image6: Image;
  image7: Image;
  text1: Text[];
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
  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <div>
      <div className="flex flex-col nl:flex-row-reverse desktopHeight">
        <div data-aos-duration="1400"
                data-aos-easing="new-easing"
                data-aos-once="true"
                data-aos="opacity"
                 className="flex-1 pb-8 flex ">
          <Image
            className="pr-20 pt-20 pb-20 pl-52 nl:object-contain nl:pb-28 nl:pt-28 nl:pr-16"
            src={urlFor(page.image1).url()}
            width={1800}
            height={1200}
            alt="Agency image"
          />
        </div>

        <div   data-aos-duration="1400"
                data-aos-easing="new-easing"
                data-aos-once="true"
                data-aos="new-fade-top"
                data-aos-delay="300" className="flex-1 flex pl-4 pr-20 pb-36 nl:justify-start nl:items-end nl:pl-12 nl:pb-8  ">
          <div className="nl:max-w-46rem">
            {page.text1.map((block) => {
              return block.children.map((child) => {
                return child.marks.indexOf("strong") !== -1 ? (
                  <strong>{child.text}</strong>
                ) : (
                  child.text
                );
              });
            })}
          </div>
        </div>
      </div>

      <div  data-aos-duration="1400"
                data-aos-easing="new-easing"
                data-aos-once="true"
                data-aos="opacity" className="nl:h-screen">
        <Image
          className="pr-20 pl-20  pb-36 nl:h-full object-contain nl:pt-40 nl:pb-40"
          src={urlFor(page.image7).url()}
          width={1800}
          height={1200}
          alt="Agency image"
        />
      </div>

      <div  className="flex h-96 mb-36 nl:h-80vh">
        <Image
        data-aos-duration="1400"
        data-aos-easing="new-easing"
        data-aos-once="true"
        data-aos="opacity"
          className="w-2/4 object-cover"
          src={urlFor(page.image2).url()}
          width={1800}
          height={1200}
          alt="Agency image"
        />
        <Image
        data-aos-duration="1400"
        data-aos-easing="new-easing"
        data-aos-once="true"
        data-aos="opacity"
        data-aos-delay="300"
          className="w-2/4 object-cover"
          src={urlFor(page.image3).url()}
          width={1800}
          height={1200}
          alt="Agency image"
        />
      </div>
      <div className="nl:flex nl:flex-row-reverse nl:h-screen">
      <div className="flex-1 pl-20 pr-6 pb-36 nl:p-0 nl:flex nl:justify-end nl:pr-12">
        <div data-aos-duration="1400"
                data-aos-easing="new-easing"
                data-aos-once="true"
                data-aos="new-fade-top"
             className="nl:max-w-46rem">
        {page.text2.map((block) => {
          return block.children.map((child) => {
            return child.marks.indexOf("strong") !== -1 ? (
              <strong>{child.text}</strong>
            ) : (
              child.text
            );
          });
        })}
        </div>

      </div>
      <div className="nl:flex-1 nl:p-12 ">
      <Image
         data-aos-duration="1400"
         data-aos-easing="new-easing"
         data-aos-once="true"
         data-aos="opacity"
         data-aos-delay="300"
        className="pr-32 pb-36 nl:flex-1 nl:p-12 nl:h-full   nl:object-contain nl:pb-28 nl:pt-28 nl:pr-16"
        src={urlFor(page.image4).url()}
        width={1800}
        height={1200}
        alt="Agency image"
      />
      </div>

      </div>
  
      <div className="flex nl:h-screen h-auto">
        <Image
            data-aos-duration="1400"
            data-aos-easing="new-easing"
            data-aos-once="true"
            data-aos="opacity"
          className="w-2/4 h-full object-cover"
          src={urlFor(page.image5).url()}
          width={1800}
          height={1200}
          alt="Agency image"
        />
        <Image
             data-aos-duration="1400"
             data-aos-easing="new-easing"
             data-aos-once="true"
             data-aos="opacity"
             data-aos-delay="300"
          className="w-2/4 h-full object-cover"
          src={urlFor(page.image6).url()}
          width={1800}
          height={1200}
          alt="Agency image"
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const query = groq`*[_type == 'page' && title == 'Agency' ] {_id,title,image1,text1,image7,image2,image3,text2,image4,image5,image6}`;
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
