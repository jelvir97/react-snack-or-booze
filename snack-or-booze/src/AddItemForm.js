import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col, Button, Card, CardTitle, Alert } from "reactstrap";
import SnackOrBoozeApi from "./Api";

const AddItemForm = ({ items, addItem}) => {
  const INITIAL_DATA = {
    name: "",
    description: "",
    recipe: "",
    serve: "",
    resource:"snacks"
  };

  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errMessage,setErrMessage] = useState()
  const navigate = useNavigate()

  const onChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSubmit = async(evt)=>{
    evt.preventDefault()
    let item = items[formData.resource].find(item => item.name === formData.name);
    if (item){
        setErrMessage(`Item with the name ${formData.name} already exists.`)
        return
    }
    await addItem(formData)
    navigate(`/${formData.resource}`)
  }



  return (
    <Card style={{width:"56vw", padding:"30px"}}>
        <CardTitle className="font-weight-bold text-center">
            Add Menu Item
        </CardTitle>
        {errMessage ? <Alert color="danger">{errMessage}</Alert> : ''}

    <Form >
      <FormGroup  row>
        <Label for="resource" sm={2}>Type</Label>
        <Col sm={10}>
        <Input id="resource" name="resource" type="select" value={formData.resource} onChange={onChange} >
          <option value="snacks">Snack</option>
          <option value="drinks">Drinks</option>
        </Input>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="name" sm={2}>
          Name
        </Label>
        <Col sm={10}>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            value={formData.name}
            onChange={onChange}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="description" sm={2}>
          Description
        </Label>
        <Col sm={10}>
          <Input
            id="description"
            name="description"
            placeholder="Description"
            type="textarea"
            value={formData.description}
            onChange={onChange}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="recipe" sm={2}>
          Recipe
        </Label>
        <Col sm={10}>
          <Input
            id="recipe"
            name="recipe"
            placeholder="Recipe"
            type="textarea"
            value={formData.recipe}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="serve" sm={2}>
          Serve
        </Label>
        <Col sm={10}>
          <Input
            id="serve"
            name="serve"
            placeholder="Serve"
            type="textarea"
            value={formData.serve}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
      <Button onClick={onSubmit}>
                Submit
      </Button>

    </Form>
    </Card>
  );
};

export default AddItemForm;
