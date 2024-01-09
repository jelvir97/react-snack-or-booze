import { render } from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import AddItemForm from "../AddItemForm"
import testItems from "./_testItems";


it('should render correctly', ()=>{

    render(
        <MemoryRouter initialEntries={["/add"]}>
            <AddItemForm items={testItems} />
        </MemoryRouter>   
    )
})

it('should match snapshot', ()=>{

    const {asFragment} = render(
        <MemoryRouter initialEntries={["/add"]}>
            <AddItemForm items={testItems} />
        </MemoryRouter>   
    )
    expect(asFragment).toMatchSnapshot()
})

it('should render correct text', ()=>{
    const {getByText} = render(
        <MemoryRouter initialEntries={["/add"]} >
            <AddItemForm items={testItems} />
        </MemoryRouter>   
    )
    expect(getByText("Type")).toBeInTheDocument()
    expect(getByText("Description")).toBeInTheDocument()
    expect(getByText("Add Menu Item")).toBeInTheDocument()
})