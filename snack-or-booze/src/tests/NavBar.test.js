import { render, fireEvent, screen } from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import NavBar from "../NavBar"
import testItems from "./_testItems";


it('should render correctly', ()=>{

    render(
        <MemoryRouter initialEntries={["/"]}>
            <NavBar />
        </MemoryRouter>   
    )
})

it('should match snapshot', ()=>{

    const {asFragment} = render(
        <MemoryRouter initialEntries={["/"]}>
            <NavBar />
        </MemoryRouter>   
    )
    expect(asFragment).toMatchSnapshot()
})

it('should render correct text', ()=>{
    const {getByText} = render(
        <MemoryRouter initialEntries={["/"]} >
            <NavBar />
        </MemoryRouter>   
    )
    expect(getByText("Drinks")).toBeInTheDocument()
    expect(getByText("Snacks")).toBeInTheDocument()
    expect(getByText("Add")).toBeInTheDocument()
})