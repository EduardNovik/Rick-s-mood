import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Characters from "../components/Home/Characters";
import configureStore from "redux-mock-store";
// import { CharacterResultsProp } from "../redux/charactersSlice";

const mockStore = configureStore([]);

// const character: CharacterResultsProp = {
//     id: "1",
//     name: "Rick",
//     image: "rick.jpg",
//     location: { dimension: "Earth", name: "some name" },
//   };



describe("Characters component", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
      characters: {
        data: {
          results: [
            {
              id: 1,
              name: "Rick",
              location: {
                name: "Earth",
              },
              image: "rick.jpg",
            },
            {
              id: 2,
              name: "Morty",
              location: {
                name: "Earth",
              },
              image: "morty.jpg",
            },
          ],
          info: {
            count: 2,
          },
        },
        loading: false,
      },
      inputState: {
        data: "",
      },
    });
  });

  it("renders the characters correctly", () => {
    render(
      <Provider store={store}>
        <Characters />
      </Provider>
    );

    const characterCards = screen.getAllByTestId("CharacterCard-component");

    expect(characterCards).toHaveLength(2);
  });

  it("renders the character's name and location correctly", () => {
    render(
      <Provider store={store}>
        <Characters />
      </Provider>
    );

    const characterNames = screen.getAllByTestId("character-name");
    const characterLocations = screen.getAllByTestId("character-location");

    expect(characterNames[0]).toHaveTextContent("Rick");
    expect(characterLocations[0]).toHaveTextContent("Earth");
    expect(characterNames[1]).toHaveTextContent("Morty");
    expect(characterLocations[1]).toHaveTextContent("Earth");
  });

  it("renders the favorite checkbox correctly", () => {
    render(
      <Provider store={store}>
        <Characters />
      </Provider>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes).toHaveLength(2);
    expect(checkboxes[0]).toBeInTheDocument();
    expect(checkboxes[1]).toBeInTheDocument();
  });

  // Write additional tests as needed
});