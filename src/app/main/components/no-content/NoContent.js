import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

import * as Styled from "./NoContent.styled";

const NoContent = ({ message }) => {
  return (
    <Styled.NoContent>
      <div>
        <WarningIcon label="warning" fontSize="large" />
        <b>{message}</b>
      </div>
    </Styled.NoContent>
  );
};

export default NoContent;
