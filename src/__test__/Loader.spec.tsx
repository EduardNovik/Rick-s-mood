import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loader from "../components/Shared/Loader";
import { Provider, useDispatch } from "react-redux";
import { updateLoadingState } from "../redux/charactersSlice";
import { store } from "../redux/store";

describe("Loader component", () => {
  // Test Loader visibility while data is fetching:
  it("List renders", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader-component")).toBeInTheDocument();
  });

  it("List not renders when the loading state is false", () => {
    const TestComponent = () => {
      const dispatch = useDispatch();
      dispatch(updateLoadingState(false));
      return <Loader />;
    };

    const loadingState = store.getState().characters.loading;
    console.log(loadingState);

    render(
      <Provider store={store}>{loadingState && <TestComponent />}</Provider>
    );

    expect(screen.queryByTestId("loader-component")).toBeNull();
  });
});
