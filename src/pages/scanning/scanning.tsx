import { useState } from "react";
import QrReader from "../../components/QrReader";

export default function Scanning(): JSX.Element {
  const [data, setData] = useState<string[]>([]);

  return (
    <div>
      <QrReader
        onRead={(d) => {
          if (d) {
            setData([...data, d]);
          }
        }}
      />
      <ul>{data?.map((d) => <li key={d}>{d}</li>)}</ul>
    </div>
  );
}
