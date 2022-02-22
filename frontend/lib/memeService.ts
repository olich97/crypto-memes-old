import useSWR from 'swr';
import { MemeType } from './types/meme';
import config from './config';

/* NOT USED FOR NOW */

export type MemeOutput = {
  memes?: MemeType[];
  meme?: MemeType;
  isLoading: boolean;
  isError: boolean;
};

export type UploadMemeOutput = {
  isError: boolean;
  message: string;
  description: string;
};

const fetcher = async url => {
  //https://swr.vercel.app/docs/error-handling
  const response = await (await fetch(url)).json();
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response) {
    throw new Error(`An error occurred while fetching the data: ${response.message}`);
  }

  return response;
};

export function getMemes(size: number, page: number, text: string): MemeOutput {
  const searchQuery = text !== '' ? `text=${text}` : '';
  const { data, error } = useSWR(`${config.MEMES_ENDPOINT}?page=${page}&size=${size}&${searchQuery}`, fetcher);

  data?.map(item => {
    item.contentUrl = `${config.CONTENT_ENDPOINT}/${item.id}`;
  });

  return {
    memes: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getMeme(id: string): MemeOutput {
  const { data, error } = useSWR(`${config.MEMES_ENDPOINT}/${id}`, fetcher);

  if (data) data.contentUrl = `${config.CONTENT_ENDPOINT}/${data?.id}`;

  return {
    meme: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function postMeme(text: string, memeFile: File): Promise<UploadMemeOutput> {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('memeFile', memeFile);

  const requestOptions = {
    method: 'POST',
    body: formData,
  };
  const response = await (await fetch(config.MEMES_ENDPOINT, requestOptions)).json();
  return {
    message: response.message,
    description: response.description,
    isError: !response.success,
  };
}
