import { useState } from "react";
import Books from "./Books";
import Startup from "./statup";

function App() {
  const [tab, setTab] = useState<string>("books");

  return (
    <div>
      <div className="fixed bottom-0  w-full left-0 flex justify-center items-center ">
        <div className=" py-2 flex gap-2 bg-black/20 rounded-t-xl max-w-2xl w-full  justify-center">
          <div
            className=" px-4 py-2 bg-blue-200 rounded-full cursor-pointer  "
            onClick={() => {
              setTab("books");
            }}
          >
            Sementic Search
          </div>
          <div
            onClick={() => {
              setTab("startups");
            }}
            className="px-4 py-2 bg-blue-200 rounded-full cursor-pointer  "
          >
            Nural Search
          </div>
        </div>
      </div>
      {tab === "books" && <Books />}
      {tab === "startups" && <Startup />}
    </div>
  );
}

export default App;
