import React, { useEffect, useState } from "react";
import axios from "axios";
import BooksList from "./books-list";
import { calling } from "./utils";
import { BookProps } from "./props";

function Books() {
  const buttonClass =
    "px-4 py-2 bg-blue-200 rounded-full cursor-pointer w-48 text-center";
  const [mailList, setMainList] = useState<BookProps[]>([]);
  const [list, setList] = useState<BookProps[]>([]);
  const [input, setInput] = useState<string>("");

  async function getData() {
    try {
      const response = await calling("search/all-books");
      setMainList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSearch(input: string) {
    try {
      const response = await calling(`search/books?query=${input}`);
      setList(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className=" h-screen  flex flex-col gap-4 items-center ">
        <div className="p-4 bg-gray-100 rounded-3xl max-w-2xl w-full flex flex-col gap-2">
          <div className="flex gap-4">
            <input
              value={input}
              onChange={(e) => {
                if (e.target.value.length == 0) {
                  setList([]);
                }
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
          <div className="flex gap-2 items-center justify-start">
            <span>Example:</span>
            <div
              className={`${buttonClass} px-2 w-fit mx-0`}
              onClick={() => {
                setInput("War");
                handleSearch("War");
              }}
            >
              War
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
                setInput("virus");
                handleSearch("virus");
              }}
            >
              Virus
            </div>
          </div>
        </div>
        <BooksList list={list} mainList={mailList} />
      </div>
    </>
  );
}

export default Books;
