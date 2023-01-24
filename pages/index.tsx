import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { useState } from "react";
import { useEffect } from "react";
interface PageProps {
    title: string;
    videoBackground: string;
    description: string;
}

export default function HomePage({ page }: { page: PageProps }) {
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    useEffect(() => {
        const cookie = document.cookie.split("; ").find((row) => row.startsWith("visited"));
        if (cookie) {
            setIsFirstVisit(false);
        } else {
            document.cookie = "visited=true; max-age=60";
        }
    }, []);
    return (
        <div>
            <div className={`vimeo-wrapper  ${isFirstVisit ? "" : "visited"}`}>
            <iframe src={page.videoBackground} 
          ></iframe>
       
            </div>

            <p className="z-10 pl-24 translate w-full text-center pr-24 fixed left-2/4 top-2/4 transl">{page.description}</p>
        </div>
    );
}

export async function getStaticProps() {
    const query = groq`*[_type == 'page'  && title == 'Home Page' ] {title, videoBackground, description}`;
    const data = await client.fetch(query);
    if (data && data.length > 0) {
        return {
            props: {
                page: data[0]
            },
        }
    }
    return { props: { page: null } }
}


 