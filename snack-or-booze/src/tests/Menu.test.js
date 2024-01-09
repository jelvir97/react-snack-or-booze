import { render } from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import Menu from "../Menu"
import testItems from "./_testItems";


it('should render correctly', ()=>{
    
    render(
        <MemoryRouter >
            <Menu items={testItems.snacks} resource="snacks" title="Food" />
        </MemoryRouter>   
    )
})

it('should match snapshot', ()=>{
    
    const {asFragment} = render(
        <MemoryRouter >
            <Menu items={testItems.snacks} resource="snacks" title="Food" />
        </MemoryRouter>   
    )
    expect(asFragment).toMatchSnapshot()
})

it('should render correct text', ()=>{
    
    const {getByText} = render(
        <MemoryRouter >
            <Menu items={testItems.snacks} resource="snacks" title="Food" />
        </MemoryRouter>   
    )
    expect(getByText("test snack 1")).toBeInTheDocument()
    expect(getByText("test snack 2")).toBeInTheDocument()
})
