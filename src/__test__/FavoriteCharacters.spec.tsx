import { render, screen } from "@testing-library/react";
import FavoriteCharacters from "../components/Favorites/FavoriteCharacters";
import "jest-localstorage-mock";
import "@testing-library/jest-dom";

interface LocalStorageMock {
  [key: string]: string;
}

const localStorageMock = (function () {
  let store: LocalStorageMock = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("FavoriteCharacters Local storage", () => {
  // SetLocalStorage just stringify the passed data and nothing else
  const setLocalStorage = (id: string, data: Record<string, any>) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

  beforeEach(() => {
    window.localStorage.clear();
  });

  test("renders without errors", () => {
    render(<FavoriteCharacters />);
  });

  test("data is added into local storage", () => {
    const mockId = "111";
    const mockJson = { data: "json data" };

    setLocalStorage(mockId, mockJson);
    // or like this without setLocalStorage
    // localStorage.setItem(mockId, JSON.stringify(mockJson))

    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  test("characters are added into local storage", () => {
    const characters = [
      {
        id: "1",
        name: "Rick",
        image: "rick.jpg",
        location: { dimension: "Earth", name: "some name" },
      },
      {
        id: "2",
        name: "Morty",
        image: "morty.jpg",
        location: { dimension: "Earth", name: "some name" },
      },
    ];

    const mockId = "characters";
    setLocalStorage(mockId, characters);

    render(<FavoriteCharacters />);

    const storedData = JSON.parse(window.localStorage.getItem(mockId) || "[]");
    const FavoriteCharactersElem = screen.getAllByText("Rick");

    expect(storedData).toEqual(characters);
    expect(storedData[0].name).toBe("Rick");
    expect(storedData[1].name).toBe("Morty");
    expect(FavoriteCharactersElem[0]).toBeInTheDocument();
  });

  test("Delete character from local storage", () => {
    const characters = [
      {
        id: "1",
        name: "Rick",
        image: "rick.jpg",
        location: { dimension: "Earth", name: "some name" },
      },
      {
        id: "2",
        name: "Morty",
        image: "morty.jpg",
        location: { dimension: "Earth", name: "some name" },
      },
    ];
    const mockId = "characters";

    setLocalStorage(mockId, characters);
    window.localStorage.clear();

    render(<FavoriteCharacters />);

    const FavoriteCharactersElem = screen.queryByTestId(
      "FavoriteCharacters-component"
    );

    expect(FavoriteCharactersElem).toBeNull();
  });
});

//   let getItemMock: jest.Mock;

//   beforeEach(() => {
//     // Mocking the localStorage implementation
//     getItemMock = jest.fn();
//     const localStorageMock = {
//       getItem: getItemMock,
//       setItem: jest.fn(),
//       removeItem: jest.fn(),
//       clear: jest.fn(),
//       key: jest.fn(),
//       length: 0,
//     };

//     Object.defineProperty(window, "localStorage", {
//       value: localStorageMock,
//     });
//   });

// test("displays character cards from local storage", () => {
//     const characters = [
//       {
//         id: "1",
//         name: "Rick",
//         image: "rick.jpg",
//         location: { dimension: "Earth", name: "some name" },
//       },
//       {
//         id: "2",
//         name: "Morty",
//         image: "morty.jpg",
//         location: { dimension: "Earth", name: "some name" },
//       },
//     ];
//     getItemMock.mockReturnValue(JSON.stringify(characters));

//     render(<FavoriteCharacters />);

//     // Assert that the character cards are rendered
//     expect(screen.queryByText(/Rick/)).toBeInTheDocument();
//     expect(screen.queryByText(/Morty/)).toBeInTheDocument();
//   });



//   test("removes character from local storage when remove button is clicked", () => {
//     const characters = [{ id: 1, name: "Character 1" }];
//     getItemMock.mockReturnValue(JSON.stringify(characters));

//     render(<FavoriteCharacters />);

//     // Assert that the character card is initially rendered
//     expect(screen.getByText("Character 1")).toBeInTheDocument();

//     // Simulate the remove button click
//     fireEvent.click(screen.getByText("Remove"));

//     // Assert that the character card is removed from the component
//     expect(screen.queryByText("Character 1")).not.toBeInTheDocument();

//     // Assert that the character is removed from local storage
//     expect(window.localStorage.setItem).toHaveBeenCalledWith(
//       "characters",
//       JSON.stringify([])
//     );
//   });
