const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";
export async function getDirections(from , to){
    const response = await fetch(
        `${BASE_URL}/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
        );
    const json = await response.json();
   // console.log(JSON.stringify(json, null, 2));
   return json;

}