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
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../configs/constants";

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

const ReactEditorJS = createReactEditorJS();

const Editor = ({ width }: SafariProps) => {
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
    <ReactEditorJS
      tools={EDITOR_JS_TOOLS}
      defaultValue={{
        time: 1635603431943,
        blocks: [
          {
            id: "12iM3lqzcm",
            type: "paragraph",
            data: {
              text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
            }
          }
        ]
      }}
    />
  );
};

export default Editor;
