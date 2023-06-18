import { useEffect, useState } from "react";

const useLoacalStorage = (key:string) => {

  const [charactersLS, setCharactersLS] = useState(() => {

    const getLS = localStorage.getItem(key);
    if (getLS) {
      return JSON.parse(getLS);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(charactersLS));
  }, [key, charactersLS]);

  return [charactersLS, setCharactersLS] 
};

export default useLoacalStorage;



//  The reson was in: 
// Yes, you're correct. In the current implementation, each instance of the 
// CharacterCard component will have its own separate state for charactersLS. 
// This is because the useLocalStorage hook initializes and manages state independently for each component using the hook.
// If you want to share the same charactersLS state among multiple instances of the CharacterCard component, 
// you'll need to lift the state up to a common parent component. The common parent component can then pass 
// down the charactersLS state and the setCharactersLS function as props to each CharacterCard component.


// So it keeps the state for each card separately because I have imported useLoacalStorage for each card individually,
//Every time when I add a new character its adding one item and then nothing. After I removed the condition if(prev.some(...))
// and add '1' to characterLS, when I clicked I got a new element in charactersLS but after I click on another card 
// it starts adding '1' from the beginning like there was a separate state for each card and it was, because I have 
// initialize useLoacalStorage for every single card 