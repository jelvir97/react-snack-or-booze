import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, Button } from "reactstrap";

const NotFound = ()=>{
    return(
        <Card style={{padding:"30px"}}>
            <CardTitle style={{marginBottom:"25px"}}>
                Hmm... what your looking for doesn't exist.
            </CardTitle>
            <Link to="/"><Button color="light">Go Home</Button></Link>
        </Card>
    )
    
}

export default NotFound;