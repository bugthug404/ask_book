import { useState } from "react";
import Books from "./Books";
import Startup from "./statup";
import TabButton from "./components/tab-button";

function App() {
  const [tab, setTab] = useState<string>("books");

  return (
    <div>
      <div className="  w-full  flex justify-center items-center mb-4">
        <div className=" py-2 flex gap-2 bg-black/5 rounded-b-xl max-w-2xl w-full  justify-center">
          <TabButton
            text="Semantic Search"
            onClick={() => setTab("books")}
            active={tab === "books"}
          />
          <TabButton
            text="Nural Search"
            onClick={() => setTab("startups")}
            active={tab === "startups"}
          />
        </div>
      </div>
      {tab === "books" && <Books />}
      {tab === "startups" && <Startup />}
    </div>
  );
}

export default App;
