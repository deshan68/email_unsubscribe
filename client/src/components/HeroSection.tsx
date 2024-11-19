import { fetchLinks } from "../api";
import logo from "../assets/logo.svg";
import PreLoader from "./PreLoader";

interface Link {
  date: string;
  from: string;
  email: string;
  subject: string;
  unsubscribeLink: string;
}

interface HeroSectionProps {
  setLinks: (value: Link[]) => void;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}

const HeroSection = ({
  setLinks,
  setError,
  setLoading,
  loading,
}: HeroSectionProps) => {
  const getLinks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchLinks();
      setLinks(data);
    } catch (err) {
      setError("Failed to fetch unsubscribe links.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-[1000px] pt-10">
      <img src={logo} alt="Logo" className="py-4" />
      <h1 className="font-bold text-5xl">Unsubscribe Links Explorer</h1>
      <p className="text-2xl text-center text-[#8E8E93] py-10 px-64">
        A simple application to fetch and display unsubscribe links from your
        email inbox.
      </p>
      <button
        className="w-[300px] h-[60px] bg-[#AF52DE] mb-10 flex justify-center items-center gap-x-4"
        onClick={getLinks}
      >
        Start Exploring
        {loading && <PreLoader />}
      </button>
    </div>
  );
};

export default HeroSection;
