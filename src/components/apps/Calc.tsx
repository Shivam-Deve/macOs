import React, { useEffect, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsLayoutSidebar } from "react-icons/bs";
import { IoShareOutline, IoCopyOutline } from "react-icons/io5";
import { websites, wallpapers } from "~/configs";
import { checkURL } from "~/utils";
import { useAppSelector } from "~/redux/hooks";
import type { SiteSectionData, SiteData } from "~/types";
import Flmngr from "@flmngr/flmngr-react";
import { ReactCalculator } from "simple-react-calculator";

interface SafariState {
  goURL: string;
  currentURL: string;
}

interface SafariProps {
  width?: number;
}

interface NavProps {
  width: number;
  setGoURL: (url: string) => void;
}

interface NavSectionProps extends NavProps {
  section: SiteSectionData;
}

const NavSection = ({ width, section, setGoURL }: NavSectionProps) => {
  const grid = width < 640 ? "grid-cols-4" : "grid-cols-9";

  return (
    <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4">
      <div className="font-medium ml-2" text="xl sm:2xl">
        {section.title}
      </div>
      <div className={`mt-3 grid grid-flow-row ${grid}`}>
        {section.sites.map((site: SiteData) => (
          <div
            key={`safari-nav-${site.id}`}
            className="h-28 w-full flex-center"
          >
            <div className="h-full w-full flex flex-col">
              <div className="h-max w-max mx-auto bg-white rounded-md">
                {site.img ? (
                  <img
                    className="w-16 h-16 mx-auto rounded-md"
                    src={site.img}
                    alt={site.title}
                    title={site.title}
                    onClick={
                      site.inner
                        ? () => setGoURL(site.link)
                        : () => window.open(site.link)
                    }
                  />
                ) : (
                  <div
                    className="w-16 h-16 mx-auto rounded-md flex-center cursor-default text-black"
                    onClick={
                      site.inner
                        ? () => setGoURL(site.link)
                        : () => window.open(site.link)
                    }
                  >
                    <span text="lg center">{site.title}</span>
                  </div>
                )}
              </div>
              <span m="t-2 x-auto" text="sm">
                {site.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const numTracker = Math.floor(Math.random() * 99 + 1);

const NavPage = ({ width, setGoURL }: NavProps) => {
  const dark = useAppSelector((state) => state.system.dark);

  const grid = width < 640 ? "grid-cols-4" : "grid-cols-8";
  const span = width < 640 ? "col-span-3" : "col-span-7";

  return (
    <div
      className="w-full safari-content overflow-y-scroll bg-center bg-cover c-text-black"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full min-h-full pt-8 c-bg-100/80 backdrop-blur-2xl">
        {/* Favorites */}
        <NavSection
          section={websites.favorites}
          setGoURL={setGoURL}
          width={width}
        />

        {/* Frequently Visited */}
        <NavSection section={websites.freq} setGoURL={setGoURL} width={width} />

        {/* Privacy Report */}
        <div className="mx-auto w-full max-w-screen-md" p="t-8 b-16 x-6">
          <div font="medium" text="xl sm:2xl">
            Privacy Report
          </div>
          <div
            className={`h-16 w-full mt-4 grid ${grid} shadow-md rounded-xl text-sm`}
            bg="gray-50/70 dark:gray-600/50"
          >
            <div className="col-start-1 col-span-1 flex-center space-x-2">
              <FaShieldAlt size={24} />
              <span className="text-xl">{numTracker}</span>
            </div>
            <div className={`col-start-2 ${span} hstack px-2`}>
              In the last seven days, Safari has prevent {numTracker} tracker
              from profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useAppSelector((state) => state.system.dark);

  return (
    <div
      className="w-full safari-content bg-blue-50 overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center c-text-600 c-bg-100/80">
        <div className="text-center">
          <div className="text-2xl font-bold">
            You Are Not Connected to the Internet
          </div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently
            offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const Calc = ({ width }: SafariProps) => {
  const wifi = useAppSelector((state) => state.system.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: ""
  });

  const setGoURL = (url: string) => {
    const isValid = checkURL(url);

    if (isValid) {
      if (
        url.substring(0, 7) !== "http://" &&
        url.substring(0, 8) !== "https://"
      )
        url = `https://${url}`;
    } else if (url !== "") {
      url = `https://www.bing.com/search?q=${url}`;
    }

    setState({
      goURL: url,
      currentURL: url
    });
  };

  const pressURL = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") setGoURL((e.target as HTMLInputElement).value);
  };

  const buttonColor = state.goURL === "" ? "c-text-400" : "c-text-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "flex";
  return (
    <div style={{ height: "500px" }}>
      <ReactCalculator />;
    </div>
  );
};

export default Calc;
