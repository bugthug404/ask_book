import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import BooksList from "./books-list";
import { calling } from "./utils";
import { BookProps } from "./props";
import { uploadData } from "./startup-utils";

export default function Startup() {
  const buttonClass =
    "mx-auto px-4 py-2 bg-blue-200 rounded-full cursor-pointer w-48 text-center";
  const [mailList, setMainList] = useState<BookProps[]>([]);
  const [list, setList] = useState<BookProps[]>([]);
  const [input, setInput] = useState<string>("");

  async function getData() {
    try {
      const response = await calling("startups/search");
      response && setMainList(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSearch(input: string) {
    try {
      const response = await calling(`startups/search?query=${input}`);
      console.log("response", response);
      response && setList(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className=" h-screen  flex flex-col gap-4 items-center p-4">
        <div className="p-4 bg-gray-100 rounded-3xl max-w-md w-full flex gap-2">
          <div className={buttonClass} onClick={uploadData}>
            upload data
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-3xl max-w-md w-full flex gap-2">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            className="w-full rounded-xl outline-none px-2"
          />
          <div
            className={buttonClass}
            onClick={() => {
              if (input.trim().length > 0) {
                handleSearch(input);
              } else {
                setList([]);
              }
            }}
          >
            Search Books
          </div>
        </div>
        <BooksList list={list} mainList={mailList} />
      </div>
    </>
  );
}

{
  /* <div
className={buttonClass}
onClick={() => {
  calling("search/add-books");
}}
>
Add Books
</div> */
}
