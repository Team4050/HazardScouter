import { Card, CardFooter } from "@nextui-org/react";
import QrReader from "../components/QrReader";

export default function Scanning(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <Card isFooterBlurred radius="lg" className="border-none w-72 mx-auto">
        <QrReader onRead={console.log} />
        <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          Tablets Scanned
        </CardFooter>
      </Card>
    </div>
  );
}
