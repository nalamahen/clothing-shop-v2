import { SpinnerContainer, SpinnerOverlay } from "./StyledSpinner";

export default function Spinner() {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
}
