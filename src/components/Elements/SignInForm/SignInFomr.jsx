import React from "react";
import { Styledform, StyledFormWrapper } from "./Form.styled";
export default function SignInFomr() {
  return (
    <div>
      <StyledFormWrapper>
        <Styledform>
          <input type="text" placeholder="Styleist" />
          <input type="password" placeholder="passrord" />
          <button type="submit">Log In</button>
        </Styledform>
      </StyledFormWrapper>
    </div>
  );
}
