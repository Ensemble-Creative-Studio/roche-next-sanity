import { Image, Reference, Slug } from "sanity";
import { Url } from "url";

type Base ={
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
};

interface Post extends Base{
    author: Author;
    body: Block[];
    categories: Category[];
    mainImage: Image;
    slug: Slug;
    title: string;
    description: string;
}

interface Author extends Base{
    bio: Block[];
    image: Image;
    name: string;
    slug: Slug;
}

interface Image{
    _type:'image';
    asset: Reference;
}

interface Reference {
    _ref: string;
    _type:'reference';
}

interface Slug{
    _type:'slug';
    current: string;
}

interface Block{
    _key: string;
    _type:'block';
    children: Span[];
    markDefs: any[];
    style : 'normal' | "h1" | "h2" | 'h3' | 'h4' | 'blockquote';

}

interface Span{
    _key: string;
    _type:'span';
    marks: string[];
    text: string;
}

interface Category extends Base{
    description: string;
    title: string;
}

interface MainImage{
    _type:'image';
    asset: Reference
}

interface Title{
    _type: 'string';
    current: string;
}

export interface HeaderType {
    _createdAt: Date;
    _id:        string;
    _rev:       string;
    _type:      string;
    name:       string;
    navigation: string[];
    _updatedAt: Date;
}
interface pets {
    name: any;
  }

  export interface Agency {
    _createdAt: Date;
    _id:        string;
    _rev:       string;
    _type:      string;
    image1:     Image;
    image2:     Image;
    image3:     Image;
    image4:     Image;
    image5:     Image;
    image6:     Image;
    image7:     Image;
    text1:      Text[];
    text2:      Text[];
    title:      string;
    _updatedAt: Date;
}

export interface Image {
    _type: string;
    asset: Asset;
}

export interface Asset {
    _ref:  string;
    _type: string;
}

export interface Text {
    _key:     string;
    _type:    string;
    children: Child[];
    markDefs: any[];
    style:    string;
}

export interface Child {
    _key:  string;
    _type: string;
    marks: string[];
    text:  string;
}