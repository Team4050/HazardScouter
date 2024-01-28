import { useForceUpdate } from "framer-motion";
import { QrReader as Reader } from "react-qr-reader";

type Props = {
  onRead: (data: string | undefined) => void;
};

export default function QrReader({ onRead }: Props): JSX.Element {
  const [forceUpdate] = useForceUpdate();
  return (
    <Reader
      onResult={(result) => {
        onRead(result?.getText());
        forceUpdate();
      }}
      constraints={{ facingMode: "environment", aspectRatio: 1 }}
      scanDelay={500}
    />
  );
}
