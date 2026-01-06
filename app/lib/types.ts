// types.ts or in the same file
export interface Book {




 id: string;
  title: string;
  author: string;
  subTitle?: string;
  imageLink?: string;
  averageRating?: number;
  totalRating?: number;
  subscriptionRequired?: boolean;
  tags: string[];
  bookDescription?: string;
  authorDescription?: string;
  audioLink?: string;
  summary: string;
}