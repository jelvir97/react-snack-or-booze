import React, { useState, useEffect } from "react";
import { Route, Routes, } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AddItemForm from "./AddItemForm";
import NotFound from "./NotFound";

function App() {
  // if true, loading page is rendered
  const [isLoading, setIsLoading] = useState(true);
  // items contains arrays of snacks and drinks.
  const [items, setItems] = useState({});

  /**
   * Gets snacks and drinks from db on first render.
   */
  useEffect(() => {
    async function getSnacks() {
      let items = await SnackOrBoozeApi.getItems();
      setItems(items)
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  /**
   * Sends post request to SnackOrBoozeApi
   * Updates items to include the newly added snack or drink
   */
  const addItem = async(formData)=>{
    const {data} = await SnackOrBoozeApi.addItem(formData)
    const newItem = {name:data.name, description:data.description, recipe:data.recipe, serve:data.serve}
    setItems( ()=>{
        return {
            ...items,
            [formData.resource]: [...items[formData.resource], newItem]
        }
    })
  }

  /**
   * If true, loading page is rendered
   */
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" 
              element={<Home items={items} />}
            />
            
            {/** Snacks Routes */}
            <Route exact path="/snacks"
              element={<Menu items={items.snacks} resource="snacks" title="Food" />}
            />
            <Route path="/snacks/:id"
              element={<MenuItem items={items.snacks} cantFind="/snacks" />}
            />

            {/** Drinks Routes */}
            <Route exact path="/drinks"
              element={<Menu items={items.drinks} resource="drinks" title="Drinks" />}
            />
            <Route path="/drinks/:id"
              element={<MenuItem items={items.drinks} cantFind="/drinks" />}
            />

            <Route exact path="/add"
              element={<AddItemForm addItem={addItem} items={items}/>}
            />

            {/** Not Found */}
            <Route path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      
    </div>
  );
}

export default App;
