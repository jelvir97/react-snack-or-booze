import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AddItemForm from "./AddItemForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({});

  useEffect(() => {
    async function getSnacks() {
      let items = await SnackOrBoozeApi.getItems();
      setItems(items)
      setIsLoading(false);
    }
    getSnacks();
  }, [items]);

  const addItem = async(evt, formData)=>{
    evt.preventDefault()
    const {data} = await SnackOrBoozeApi.addItem(formData)
    console.log(data)
    const newItem = {name:data.name, description:data.description, recipe:data.recipe, serve:data.serve}
    setItems( ()=>{
        return {
            ...items,
            [formData.resource]: [...items[formData.resource], newItem]
        }
    })
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" 
              element={<Home snacks={items.snacks} />}
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
              element={<Navigate to="/" />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
