import { useEffect, useState } from "react";
import { fetchLinks } from "../api";
import PreLoader from "./PreLoader";

interface Link {
  date: string;
  from: string;
  email: string;
  subject: string;
  unsubscribeLink: string;
}

interface TableSectionProps {
  links: Link[];
  setLinks: (value: Link[] | ((prev: Link[]) => Link[])) => void;
  setError: (value: string) => void;
}
const TableSection = ({ links, setLinks, setError }: TableSectionProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chunk, setChunk] = useState<number>(1);

  const truncateString = (input: string, maxLength: number): string => {
    if (input.length <= maxLength) {
      return input;
    }
    return input.slice(0, maxLength) + "...";
  };

  const getLinks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchLinks(chunk + 1);
      setLinks((prev) => {
        const updatedLinks: Link[] = [...prev, ...data];
        return updatedLinks;
      });
      setChunk(chunk + 1);
    } catch (err) {
      setError("Failed to fetch unsubscribe links.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    links.length === 10 && setChunk(1);
  }, [links]);

  return (
    <div className="w-[1000px] flex flex-col items-end">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="uppercase">
          <tr className="border-y border-x border-[#1E1E1E]">
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((item, index) => (
            <tr className="border-b border-x border-[#1E1E1E]">
              <th scope="row" className="pl-6 font-medium whitespace-nowrap">
                {index + 1}
              </th>
              <th scope="row" className="py-4 font-medium whitespace-nowrap">
                {truncateString(item.subject, 38)}
              </th>
              <td className="px-6">
                {truncateString(item.from, 20)}
                <br />
                <span className="underline">
                  {truncateString(item.email, 22)}
                </span>
              </td>
              <td className="px-6">{item.date}</td>
              <td className="px-6">
                <button
                  disabled={!item.unsubscribeLink}
                  className={`w-[80px] h-[30px] border-2 rounded-full font-bold ${
                    item.unsubscribeLink
                      ? "border-[#AF52DE] text-[#AF52DE]"
                      : "border-[#AF52DE] text-[#AF52DE] cursor-not-allowed opacity-40"
                  }`}
                  onClick={() => window.open(item.unsubscribeLink, "_blank")}
                >
                  Visit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="text-[#fff underline mt-4 flex justify-center items-center gap-x-2"
        onClick={getLinks}
      >
        Load more
        {loading && <PreLoader />}
      </button>
    </div>
  );
};

export default TableSection;
