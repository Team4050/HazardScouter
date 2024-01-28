import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  pages: Page[];
};

type Page = {
  title: string;
  component: JSX.Element;
};

export default function Pager({ pages }: Props): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const isPhone = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {pages[currentPage].component}

      <div className="fixed z-10 bottom-0 left-0 w-full flex flex-row mb-4 px-4 justify-between select-none items-center">
        <Button
          isIconOnly
          variant="bordered"
          color="primary"
          onClick={() => setCurrentPage(currentPage - 1)}
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
            variant="bordered"
            color="primary"
            onSelectionChange={(key) =>
              setCurrentPage(parseInt(key.toString()))
            }
            selectedKey={currentPage.toString()}
          >
            {pages.map((page, i) => (
              <Tab key={i} title={page.title} />
            ))}
          </Tabs>
        )}

        <Button
          isIconOnly
          variant="bordered"
          color="primary"
          onClick={() => setCurrentPage(currentPage + 1)}
          isDisabled={currentPage === pages.length - 1}
        >
          <ArrowRightIcon className="w-8" />
        </Button>
      </div>
    </>
  );
}
