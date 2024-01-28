
//Get all Star wars starShips
/**
 * Function to fetch all the starships form the data
 * @param {*} size 
 * @returns starShips
 */
export async function getAllStarShips(size)  {
    const response = await fetch("https://www.swapi.tech/api/starships?page=1&limit="+size)
    .catch(err => console.error(err));
    const data = await response.json();
    return data.results;
};
/**
 * Function to get only one starship.
 * @param {*} starship_id 
 * @returns data
 */
export async function getOneStarShip(starship_id)  {
    const response = await fetch("https://www.swapi.tech/api/starships/"+starship_id)
    .catch(err => console.error(err));
    const data = await response.json();
    return data;
};