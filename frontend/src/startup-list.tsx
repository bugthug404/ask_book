import { StartupProps } from "./props";

export default function StartupList({
  list,
  mainList,
}: {
  list: StartupProps[];
  mainList: StartupProps[];
}) {
  return (
    <div className="max-w-2xl w-full bg-gray-100 rounded-xl p-4 ">
      <div className="h-full flex flex-col gap-2">
        {(list.length ? list : mainList)?.map((book) => {
          return (
            <div className="bg-white p-2 rounded-lg flex gap-2 items-start">
              <div className="w-full">
                <div className="font-bold text-xl ">{book.alt}</div>
                <div className="mt-1">{book.description}</div>
                <div className="text-xs mt-1">
                  <span className="italic">City : {book.city} - </span>
                  <a
                    href={book.link}
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    {book.name}
                  </a>
                </div>
              </div>
              <img
                src={book.images}
                className="rounded-lg shadow-md border"
                alt={book.alt}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
