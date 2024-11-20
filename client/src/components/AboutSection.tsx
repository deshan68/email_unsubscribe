const AboutSection = () => {
  const githubRepo = "https://github.com/deshan68/email_unsubscribe/tree/main";

  return (
    <div className="flex flex-col justify-center items-center w-[1000px] pt-10 pb-5">
      <h1 className="font-medium text-xl">About this project</h1>
      <p className="text-sm text-center text-[#8E8E93] py-2 px-52">
        This is an open-source project aimed at simplifying the process of
        managing unsubscribe links from emails. Feel free to contribute on
        <button
          className="text-[#AF52DE] font-bold"
          onClick={() => window.open(githubRepo, "_blank")}
        >
          &nbsp;GitHub&nbsp;
        </button>
        to enhance its functionality or fix issues.
      </p>
    </div>
  );
};

export default AboutSection;
