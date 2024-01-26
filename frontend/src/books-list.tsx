import { BookProps } from "./props";

export default function BooksList({
  list,
  mainList,
}: {
  list: BookProps[];
  mainList: BookProps[];
}) {
  return (
    <div className="max-w-2xl w-full  pb-20">
      <div className="h-full flex flex-col gap-2 bg-gray-100 rounded-xl p-4">
        {(list.length ? list : mainList).map((book) => {
          return (
            <div className="bg-white p-2 rounded-lg">
              <div className="font-bold text-xl ">{book.name}</div>
              <div className="mt-1">{book.description}</div>
              <div className="text-xs mt-1">
                <span className="italic">by : {book.author}</span>
                <span> - {book.year}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
