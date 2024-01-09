import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import NotFound from "./NotFound"

/**
 *  Takes in Items (either snacks or drinks)
 *  Finds item by id in params
 * 
 *  Renders Card with name, recipe, description, and serve values.
 */
function MenuItem({ items }) {
  //gets id from url
  const { id } = useParams();

  //finds item in items, if not found renders NotFound component
  let item = items.find(item => item.id === id);
  if (!item) return <NotFound />

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default MenuItem;
