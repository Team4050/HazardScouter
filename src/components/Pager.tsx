import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import useCompiledData from "../hooks/useCompiledData";
import { useMetaStore } from "../store/useDataStore";

type Props = {
  pages: {
    title: string;
    form: (props: FormProps) => JSX.Element;
  }[];
};

export type FormProps = {
  onChanged: (isValid: boolean) => void;
};

const isDev = import.meta.env.DEV;

export default function Pager({ pages }: Props): JSX.Element {
  const isPhone = useMediaQuery("(max-width: 768px)");
  const { currentPage, setPage } = useMetaStore();
  const [currentPageValid, setCurrentPageValid] = useState(false);
  const data = useCompiledData();

  const onChanged = (valid: boolean) => {
    setCurrentPageValid(valid);
  };

  const onNext = () => {
    setPage(currentPage + 1);
    setCurrentPageValid(false);
  };

  const onPrev = () => {
    setPage(currentPage - 1);
  };

  const Page = pages[currentPage].form;

  const downloadData = () => {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);

    const filename = `${data.preMatchData.matchNumber}_${data.preMatchData.teamNumber}_${data.preMatchData.scouter}.json`;
    const anchorEl = document.createElement("a");
    anchorEl.href = jsonObjectUrl;
    anchorEl.download = filename;

    anchorEl.click();
    URL.revokeObjectURL(jsonObjectUrl);
  };

  return (
    <>
      <div className="font-tech text-2xl font-semibold text-center my-4 md:my-8">
        {pages[currentPage].title}
      </div>

      <Page onChanged={onChanged} />

      <div className="fixed z-10 bottom-0 left-0 w-full flex flex-row mb-4 px-4 justify-between select-none items-center">
        <Button
          isIconOnly
          color="primary"
          onClick={() => onPrev()}
          isDisabled={currentPage === 0}
        >
          <ArrowLeftIcon className="w-8" />
        </Button>

        {isPhone ? (
          <Card isBlurred>
            <CardBody>{pages[currentPage].title}</CardBody>
          </Card>
        ) : (
          <Tabs
            color="primary"
            onSelectionChange={(key) => setPage(parseInt(key.toString()))}
            selectedKey={currentPage.toString()}
          >
            {pages.map((page, i) => (
              <Tab key={i} title={page.title} />
            ))}
          </Tabs>
        )}

        <Button
          isIconOnly
          color="primary"
          onClick={() => {
            if (currentPage !== pages.length - 1) {
              onNext();
            } else {
              downloadData();
            }
          }}
          isDisabled={!currentPageValid && !isDev}
        >
          {currentPage !== pages.length - 1 ? (
            <ArrowRightIcon className="w-8" />
          ) : (
            <CheckBadgeIcon className="w-8" />
          )}
        </Button>
      </div>
    </>
  );
}
