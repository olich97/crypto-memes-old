export type MemeType = {
  id: string;
  code: string;
  text: string;
  contentKey: string;
  contentUrl: string;
  publishDate?: Date;
};

export type MemeInfo = {
  id: string;
  owner: string;
  createdAt: Date;
  price: number;
  isForSale: boolean;
  text: string;
  content: string;
};

export type MemeOutput = {
  memes?: MemeInfo[];
  isError: boolean;
};
