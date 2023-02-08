import React, { useContext, useState } from "react";
import { UrlContext } from "../../context/UrlContext";
import Button from "../UI/Buttons/Button";
import Card from "../UI/Card/Card";
import Form from "../UI/Form/Form";
import TextInput from "../UI/Form/FormItems/TextInput/TextInput";
import classes from "./UrlForm.module.css";

type Props = {};

const UrlForm = (props: Props) => {
  const { addItem, hasError } = useContext(UrlContext);

  const [url, setUrl] = useState("");

  // Store the value of the input
  const handleUrlInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUrl(event.target.value);
  };

  // Add a new url to the list and empty the input field
  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    addItem(url);
    setUrl("");
  };

  return (
    <Card style={{ backgroundColor: "var(--pastel)" }}>
      <Form onSubmit={handleOnSubmit} title="Add Url">
        <TextInput
          label=""
          placeholder="e.g. https://phantom.land"
          value={url}
          onChange={handleUrlInput}
        />
        {hasError && <p className={classes.error}>Enter a valid url!</p>}

        <div className={classes["submit-button"]}>
          <Button>+</Button>
        </div>
      </Form>
    </Card>
  );
};

export default UrlForm;
