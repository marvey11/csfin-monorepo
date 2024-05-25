import { render } from "@testing-library/react";
import { CoreUi } from "./CoreUI";

describe("CoreUi", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CoreUi />);
    expect(baseElement).toBeTruthy();
  });
});
