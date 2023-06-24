import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loader from "../components/Shared/Loader";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { updateLoadingState } from "../redux/charactersSlice";

import { store } from "../redux/store";
import configureStore from "redux-mock-store";
import { createAction } from "@reduxjs/toolkit";



describe("Loader component", () => {
  it("Retrive characters initial state", () => {
    const state = store.getState().characters;
    expect(state).toEqual({
      data: { info: { pages: 0, count: null }, results: [] },
      loading: false,
    });
  });

  it("Renders when loading state is true (with useDispatch and action from charactersSlice)", () => {
    // Wrap the test case with a function component to be able to use useDispatch()
    const TestComponent = () => {
      const dispatch = useDispatch();
      dispatch(updateLoadingState(true));
      return <Loader />;
    };

    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByTestId("loader-component")).toBeInTheDocument();
  });

  it("Renders when loading state is true (with mocked store and passed initialState)", () => {
    const initialState = { loading: true };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Loader />
      </Provider>
    );

    expect(screen.getByTestId("loader-component")).toBeInTheDocument();
  });

  it("Test if my store dispatched the expected actions (with mocked store, store.dispatch() and action from charactersSlice)", () => {
    const initialState = { loading: false };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Loader />
      </Provider>
    );

    // Dispatch the action
    // store.dispatch() method belongs to the mock store object provided by the redux-mock-store library.
    // So for this case we dont need to import useDispatch()
    store.dispatch(updateLoadingState(true));

    // Test if your store dispatched the expected actions
    // The getState() and getActions() methods are part of the Redux Mock Store library (redux-mock-store).
    // These methods are used to access the state and actions dispatched by the store during testing.
    const actions = store.getActions();
    // console.log(actions) = [ { type: 'characters/updateLoadingState', payload: true } ]

    const expectedPayload = {
      type: "characters/updateLoadingState",
      payload: true,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("Test if my store dispatched the expected actions (with mocked store, store.dispatch() and action, fully independent)", () => {
    const initialState = {loading: false};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Loader />
      </Provider>
    );

    // Create a mock action
    const mockAction = createAction<boolean>("myMockLoadingTrueActionType");

    // Dispatch the mock action
    store.dispatch(mockAction(true));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    // console.log(actions) = [ { type: 'myMockLoadingTrueActionType', payload: true } ]

    const expectedPayload = {
      type: "myMockLoadingTrueActionType",
      payload: true,
    };
    expect(actions).toEqual([expectedPayload]);
  });
});
