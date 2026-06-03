import styled, { css } from "styled-components";

const Form = styled.form`
  width: 100%;

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
    `}

  background-color: var(--color-grey-0);

  border-radius: var(--border-radius-lg);

  overflow: hidden;

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;