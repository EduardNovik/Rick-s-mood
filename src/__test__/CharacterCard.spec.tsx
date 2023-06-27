import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CharacterCard from "../components/Shared/CharacterCard";
import { CharacterResultsProp } from "../redux/charactersSlice";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";


// Alternatively to MemoryRouter we can mock useNavigate for CharacterCard.tsx

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
// }));


const character: CharacterResultsProp = {
  id: "1",
  name: "Rick",
  status: "dead",
  species: "species",
  gender: "male",
  image: "rick.jpg",
  location: { dimension: "Earth", name: "some name", type: "Planet" },
  episode: [{ id: "episode id", episode: "episode", name: "episode name" }],
};
const mockStore = configureStore();
const store = mockStore(character);

const children = <h4>Test Children</h4>;

describe("CharacterCard component test", () => {
  it("CharacterCard renders", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterCard character={character}>{children}</CharacterCard>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("CharacterCard-component")).toBeInTheDocument();
  });

  it("CharacterCard renders character information correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterCard character={character}>{children}</CharacterCard>
        </MemoryRouter>
      </Provider>
    );

    // Verify that the character name is rendered
    const characterName = screen.getByText("Rick");
    expect(characterName).toBeInTheDocument();

    // Verify that the character image is rendered
    const characterImage = screen.getByAltText("Rick&Morty characters");
    expect(characterImage).toHaveAttribute("src", "rick.jpg");
    expect(characterImage).toHaveAttribute("height", "340");
    expect(characterImage).toHaveStyle({ objectFit: "cover" });

    // Verify that the character location is rendered
    const characterLocation = screen.getByText("some name");
    expect(characterLocation).toBeInTheDocument();
  });

  it("renders the character name with the correct variant", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterCard character={character}>{children}</CharacterCard>
        </MemoryRouter>
      </Provider>
    );
    const characterName = screen.getByText("Rick");

    expect(characterName).toHaveClass("MuiTypography-h5");
  });

  it("renders additional children components", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterCard character={character}>{children}</CharacterCard>
        </MemoryRouter>
      </Provider>
    );
    const additionalChildren = screen.getByText("Test Children");

    expect(additionalChildren).toBeInTheDocument();
  });
});
