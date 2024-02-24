import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { scoutingFormPages } from "./../formPages/forms";
import useCompiledData from "./../hooks/useCompiledData";
import { resetStores } from "./../store/useDataStore";

export const Route = createFileRoute("/scouting/$formPage")({
  component: ScoutingForm,
});

function ScoutingForm(): JSX.Element {
  const { formPage } = Route.useParams();
  const navigate = useNavigate();
  const data = useCompiledData();
  const [currentPageValid, setCurrentPageValid] = useState(false);
  const {
    isOpen: isResetModalOpen,
    onOpen: onOpenResetModal,
    onClose: onCloseResetModal,
  } = useDisclosure();

  const page = useMemo(
    () =>
      scoutingFormPages.find((page) => page.slug === formPage) ?? {
        title: "Unknown",
        slug: "unknown",
      },
    [formPage],
  );

  const pageIndex = useMemo(() => scoutingFormPages.indexOf(page), [page]);
  const canGoBack = pageIndex > 0;
  const canGoForward = pageIndex < scoutingFormPages.length - 1;

  useEffect(() => {
    if (!page) {
      redirect({ to: "/scouting" });
    }
  }, [page]);

  const onNext = () => {
    if (canGoForward && currentPageValid) {
      navigate({ to: "/scouting/" + scoutingFormPages[pageIndex + 1].slug });
    }
  };

  const onPrev = () => {
    if (canGoBack) {
      navigate({ to: "/scouting/" + scoutingFormPages[pageIndex - 1].slug });
    }
  };

  const onChanged = (valid: boolean) => {
    setCurrentPageValid(valid);
  };

  const downloadData = () => {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);

    const filename = `${data.preMatchData.matchNumber}_${data.preMatchData.teamNumber}_${data.preMatchData.scouter}.json`;
    const anchorEl = document.createElement("a");
    anchorEl.href = jsonObjectUrl;
    anchorEl.download = filename;

    anchorEl.click();
    URL.revokeObjectURL(jsonObjectUrl);

    setTimeout(() => {
      onOpenResetModal();
    }, 1000);
  };

  const resetForm = () => {
    resetStores();
    onCloseResetModal();
    navigate({ to: "/scouting/" });
  };

  return (
    <>
      <div className="mx-auto max-w-xl">
        <div className="font-tech text-2xl font-semibold text-center my-4 md:my-8">
          {page.title}
        </div>

        {page.component ? <page.component onChanged={onChanged} /> : null}

        <div className="fixed z-10 bottom-0 left-0 w-full flex flex-row mb-4 px-4 justify-between select-none items-center">
          <Button
            isIconOnly
            color="primary"
            onPress={onPrev}
            isDisabled={!canGoBack}
          >
            <ArrowLeftIcon className="w-8" />
          </Button>

          {/* {isPhone ? (
          <Card isBlurred>
            <CardBody>{page.title}</CardBody>
          </Card>
        ) : (
          <Tabs
            color="primary"
            // onSelectionChange={(key) => setPage(parseInt(key.toString()))}
            selectedKey={page.slug}
          >
            {scoutingFormPages.map((page, i) => (
              <Tab key={i} title={page.title} />
            ))}
          </Tabs>
        )} */}

          <Button
            isIconOnly
            color="primary"
            onPress={canGoForward ? onNext : downloadData}
            isDisabled={!currentPageValid}
          >
            {canGoForward ? (
              <ArrowRightIcon className="w-8" />
            ) : (
              <ArrowDownTrayIcon className="w-7" />
            )}
          </Button>
        </div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isResetModalOpen}
        onClose={onCloseResetModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Reset Form Data?</ModalHeader>
              <ModalBody>
                This will clear all input fields and redirect you to the first
                form page. Only do this if you have already downloaded the data.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={resetForm}>
                  Reset Form
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
