import "./App.css";
import HeroSection from "./components/HeroSection";
import TableSection from "./components/TableSection";
import AboutSection from "./components/AboutSection";
import { useState } from "react";
import WarningAlert from "./components/WarningAlert";

interface Link {
  date: string;
  from: string;
  email: string;
  subject: string;
  unsubscribeLink: string;
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="self-center w-full flex justify-center flex-col items-center">
      <HeroSection
        setLinks={setLinks}
        setError={setError}
        setLoading={setLoading}
        loading={loading}
      />
      {error && <WarningAlert />}
      {links.length > 0 && (
        <TableSection links={links} setError={setError} setLinks={setLinks} />
      )}
      <AboutSection />
    </main>
  );
}
