import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({items}) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>Welcome to Silicon Valley's premier dive cafe!</CardTitle>
        </CardBody>
      </Card>

      <div style={{display:"flex", justifyContent:"space-evenly"}}>
        <Link to="/snacks">
          <Card style={{width:"15rem"}}>
            <CardBody className="text-center">
              <CardTitle>Snacks</CardTitle>
              <h2>{items.snacks.length}</h2>
            </CardBody>
          </Card>
        </Link>

        <Link to="/drinks">
          <Card style={{width:"15rem"}}>
            <CardBody className="text-center">
              <CardTitle>Drinks</CardTitle>
              <h2>{items.drinks.length}</h2>
            </CardBody>
          </Card>
        </Link>
      </div>
    </section>
  );
}

export default Home;
