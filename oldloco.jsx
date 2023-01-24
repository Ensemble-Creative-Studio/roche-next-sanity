import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import Image from "next/image";
export default function BrandsPost({ page }: { page: PageProps }) {
  const ref = useRef(null);

  const options = {
    smooth: true,
    direction : 'horizontal'
  } 

  return (
    <LocomotiveScrollProvider options={options} containerRef={ref}>
      <main data-scroll-container ref={ref}>
        <section className="intro" data-scroll-section>
        <Image
            className="pr-20 pt-20 pb-20 pl-52 nl:object-contain nl:pb-28 nl:pt-28 nl:pr-16"
            src='/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Freejd2e7%2Fproduction%2F0470ac1509a010e1824a00b414d61a7bb069ad62-1260x1683.jpg&w=3840&q=75'
            width={1800}
            height={1200}
            alt="Agency image"
          />              </section>
        <section className="contents" data-scroll-section>
          <h1>I Love React</h1>
        </section>
        <section className="footer" data-scroll-section>
          <h1>Let's end the application with this Footer</h1>
        </section>
      </main>
    </LocomotiveScrollProvider>
  );
}