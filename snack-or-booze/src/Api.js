import axios from "axios";
import slugify from "react-slugify"

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async getItems() {
    const snacks = await axios.get(`${BASE_API_URL}/snacks`);
    const drinks = await axios.get(`${BASE_API_URL}/drinks`);
    return {snacks: snacks.data, drinks: drinks.data}
  }

  static async addItem({resource, name, description, recipe, serve}){
    await axios.post(`${BASE_API_URL}/${resource}`, {name, description, recipe, serve, id: slugify(name)})
  }

}

export default SnackOrBoozeApi;
