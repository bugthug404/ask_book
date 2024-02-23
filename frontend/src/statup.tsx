import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import BooksList from "./books-list";
import { calling } from "./utils";
import { BookProps, StartupProps } from "./props";
import { uploadData } from "./startup-utils";
import StartupList from "./startup-list";

export default function Startup() {
  const buttonClass =
    " px-4 py-2 bg-blue-200 rounded-full cursor-pointer max-w-48 flex-none text-center";
  const [mailList, setMainList] = useState<StartupProps[]>([]);
  const [list, setList] = useState<StartupProps[]>([]);
  const [input, setInput] = useState<string>("");

  async function getData() {
    try {
      const response = await calling("startups/list");
      console.log("response", response);
      response && setMainList(response);
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
        {/* <div className="p-4 bg-gray-100 rounded-3xl max-w-2xl w-full flex gap-2">
          <div className={buttonClass} onClick={uploadData}>
            upload data
          </div>
        </div> */}
        <div className="p-4 bg-gray-100 rounded-3xl max-w-2xl w-full flex flex-col  gap-2">
          <div className="flex gap-2">
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
                setInput("");
                setList([]);
              }}
            >
              clear
            </div>
            <div
              className={`${buttonClass} `}
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
          <div className="flex gap-2 items-center justify-start">
            <span>Example:</span>
            <div
              className={`${buttonClass} px-2 w-fit mx-0`}
              onClick={() => {
                setInput("AI");
                handleSearch("AI");
              }}
            >
              AI
            </div>
            <div
              className={`${buttonClass} px-2 w-fit mx-0`}
              onClick={() => {
                setInput("Allen");
                handleSearch("Allen");
              }}
            >
              Allen
            </div>
            <div
              className={`${buttonClass} px-2 w-fit mx-0`}
              onClick={() => {
                setInput("zip");
                handleSearch("zip");
              }}
            >
              zip
            </div>
          </div>
        </div>
        <StartupList list={list} mainList={mailList} />
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
