import { render } from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import NotFound from "../NotFound"

it('should render correctly', ()=>{
    render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>   
    )
})

it('should match snapshot', ()=>{
    const {asFragment} = render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>   
    )
    expect(asFragment).toMatchSnapshot()
})

it('should render correct text', ()=>{
    const {getByText} = render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>   
    )
    expect(getByText("Hmm... what your looking for doesn't exist.")).toBeInTheDocument()
})
