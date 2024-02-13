import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

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

export default function Pager({ pages }: Props): JSX.Element {
  const isPhone = useMediaQuery("(max-width: 768px)");
  const { currentPage, setPage } = useMetaStore();
  const [currentPageValid, setCurrentPageValid] = useState(false);

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

  return (
    <>
      <div className="font-tech text-2xl font-semibold text-center my-4 md:my-8">
        {pages[currentPage].title}
      </div>

      {pages[currentPage].form({ onChanged })}

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
          onClick={() => onNext()}
          isDisabled={currentPage === pages.length - 1 || !currentPageValid}
        >
          <ArrowRightIcon className="w-8" />
        </Button>
      </div>
    </>
  );
}
