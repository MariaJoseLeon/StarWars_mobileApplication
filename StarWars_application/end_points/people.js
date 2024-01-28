
//Get all Star wars characters
/**
 * Function to fetch all the characters form the data
 * @param {*} size 
 * @returns characters
 */
export async function getAllCharacters(size)  {
    const response = await fetch("https://www.swapi.tech/api/people?page=1&limit="+size)
    .catch(err => console.error(err));
    const data = await response.json();
    return data.results;
};
/**
 * Function to get only one character.
 * @param {*} character_id 
 * @returns data
 */
export async function getOneCharacter(character_id)  {
    const response = await fetch("https://www.swapi.tech/api/people/"+character_id)
    .catch(err => console.error(err));
    const data = await response.json();
    return data;
};