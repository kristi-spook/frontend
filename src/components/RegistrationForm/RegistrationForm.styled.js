import styled from "styled-components";

export const StyledFormWrapper = styled.div`
  width: 50%;
  height: 70%;
  img {
    width: 40%;
    padding-bottom: 20%;
  }
`;
export const Styledform = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  input {
    padding: 10px;
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 15%;
  }
  button {
    width: 30%;
    padding: 5px;
    align-self: flex-end;
    border: none;
    border-radius: 0;
    background-color: black;
    color: white;
  }
`;
