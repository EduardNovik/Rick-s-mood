import "@testing-library/jest-dom";
import {  render, screen } from "@testing-library/react";
import CharacterCard from "../components/Shared/CharacterCard";
import { CharacterResultsProp } from "../redux/charactersSlice";
import userEvent from "@testing-library/user-event";

const character: CharacterResultsProp = {
  id: "1",
  name: "Rick",
  image: "rick.jpg",
  location: { dimension: "Earth", name: "some name" },
};

const children = <h4>Press</h4>;

describe("CharacterCard component test", () => {
  it("CharacterCard renders", () => {
    render(<CharacterCard character={character}>{children}</CharacterCard>);

    expect(screen.getByTestId("CharacterCard-component")).toBeInTheDocument();
  });

  it("CharacterCard renders character information correctly", () => {
    render(<CharacterCard character={character}>{children}</CharacterCard>);

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
    render(<CharacterCard character={character}>{children}</CharacterCard>);
    
    const characterName = screen.getByText("Rick");
    
    expect(characterName).toHaveClass("MuiTypography-h5");
  });

  it("applies hover effect on Card component", () => {
    render(<CharacterCard character={character}>{children}</CharacterCard>);

  
    const card = screen.getByTestId('CharacterCard Card-component')
    
    // Simulate hover event
    userEvent.hover(card);

    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle({ textAlign: "center" });
    expect(card).toHaveStyle({ transform: "scale(95%)" , boxShadow: "0px 0px 20px 6px pink" });
    // expect(card).toHaveStyle({ transform: "scale(95%)" });
  });
});


  // const parentContainer = screen.getByTestId("CharacterCard-component");
  // const card = parentContainer.firstChild;