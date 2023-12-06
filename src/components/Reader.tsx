import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { api } from "~/utils/api";

const Reader = () => {
  const [wasRead, setWasRead] = useState(false);
  const { mutate } = api.receipt.createReceipt.useMutation({
    onSuccess: () => {
      setWasRead(true);
    },
  });

  const createReceipt = (url: string) => {
    mutate({
      url: url,
    });
  };
  if (wasRead) {
    return <p>Qr code Lido.</p>;
  }
  return (
    <QrReader
      onResult={(result, error) => {
        if (!!result) {
          //setData(result?.text);
          console.log(result);
          createReceipt(result.getText());
        }

        if (!!error) {
          console.info(error);
        }
      }}
      constraints={{ facingMode: "user" }}
      //style={{ width: "100%" }}
    />
  );
};

export default Reader;
