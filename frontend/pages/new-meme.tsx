import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import { postMeme } from '../lib/memeService';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { AlertTypes } from '../types/alert';

export const NewMeme = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState();
  const [memeText, setMemeText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState({ isError: false, message: '', description: '' });
  const [showAlert, setShowAlert] = useState(false);
  // This function will be triggered when the file field change
  const imageChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // This function is triggered on press Save button
  const submit = async () => {
    if (memeText == '' || !selectedImage) {
      setUploadResult({
        isError: true,
        message: 'Campi invalidi!',
        description: 'Testo o il contenuto risultano vuoti!',
      });
      setShowAlert(true);
      return;
    }
    setLoading(true);
    const result = await postMeme(memeText, selectedImage);
    setLoading(false);
    setUploadResult(result);
    setShowAlert(true);
  };

  return (
    <Layout
      customMeta={{
        title: 'New Meme - Crypto Memes',
      }}
    >
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            method="POST"
            onSubmit={async e => {
              // never called
              e.preventDefault();
            }}
          >
            <div className="">
              <div className="px-4 py-4 space-y-4 sm:p-6">
                <div>
                  <label htmlFor="about" className="block text-black dark:text-white text-sm font-medium text-gray-700">
                    Meme Text
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      maxLength={255}
                      className="shadow-sm px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder=" Insert your meme text (max 225 characters) ..."
                      value={memeText}
                      onChange={e => setMemeText(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Meme Gif</label>
                  <div className="mt-1 flex-inline justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="text-sm text-black dark:text-white">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer font-medium text-black dark:text-white focus-within:outline-none"
                        >
                          <svg
                            className="mx-auto h-12 w-12 text-black dark:text-white"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            onChange={imageChange}
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    {selectedImage && (
                      <div className="relative mt-5 mx-auto h-72 w-full md:w-7/12 lg:w-9/12">
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="new Meme Gif"
                          layout="fill" // required
                          objectFit="cover" // change to suit your needs
                        />
                      </div>
                    )}
                  </div>
                </div>
                {uploadResult.isError && showAlert && (
                  <div>
                    <Alert
                      type={AlertTypes.Error}
                      header={uploadResult.message}
                      message={uploadResult.description}
                      onClose={() => setShowAlert(false)}
                    />
                  </div>
                )}
                {!uploadResult.isError && showAlert && uploadResult.message != '' && (
                  <div>
                    <Alert
                      type={AlertTypes.Success}
                      header={uploadResult.message}
                      message={uploadResult.description}
                      onClose={() => setShowAlert(false)}
                    />
                  </div>
                )}
                <div className="text-right">
                  <button
                    type="submit"
                    onClick={submit}
                    className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black float-right"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default NewMeme;
