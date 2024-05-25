import styled from "tailwind";

/* eslint-disable-next-line */
export interface CoreUiProps {}

const StyledCoreUi = styled.div`
  color: pink;
`;

export function CoreUi(props: CoreUiProps) {
  return (
    <StyledCoreUi>
      <h1>Welcome to CoreUi!</h1>
    </StyledCoreUi>
  );
}

export default CoreUi;
