import { render } from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import Home from "../Home"
import testItems from "./_testItems";


it('should render correctly', ()=>{

    render(
        <MemoryRouter initialEntries={["/"]}>
            <Home items={testItems} />
        </MemoryRouter>   
    )
})

it('should match snapshot', ()=>{

    const {asFragment} = render(
        <MemoryRouter initialEntries={["/"]}>
            <Home items={testItems} />
        </MemoryRouter>   
    )
    expect(asFragment).toMatchSnapshot()
})

it('should render correct text', ()=>{
    const {getByText} = render(
        <MemoryRouter initialEntries={["/"]} >
            <Home items={testItems} />
        </MemoryRouter>   
    )
    expect(getByText("Drinks")).toBeInTheDocument()
    expect(getByText("Snacks")).toBeInTheDocument()
    expect(getByText("Welcome to Silicon Valley's premier dive cafe!")).toBeInTheDocument()
})