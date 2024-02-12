import { OnResultFunction, QrReader as Reader } from "react-qr-reader";

type Props = {
  onResult: OnResultFunction;
};

export default function QrReader({ onResult }: Props): JSX.Element {
  return (
    <Reader
      onResult={onResult}
      constraints={{ facingMode: "environment", aspectRatio: 1 }}
      scanDelay={500}
    />
  );
}
