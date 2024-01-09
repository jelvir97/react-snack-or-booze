import { render } from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import MenuItem from "../MenuItem"
import testItems from "./_testItems";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}));

it('should render correctly', ()=>{
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: 'test-snack-1' });
    render(
        <MemoryRouter initialEntries={["/snacks/test-snack-1"]}>
            <MenuItem items={testItems.snacks} cantFind="/"/>
        </MemoryRouter>   
    )
})

it('should match snapshot', ()=>{
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: 'test-snack-1' });
    const {asFragment} = render(
        <MemoryRouter initialEntries={["/snacks/test-snack-1"]}>
            <MenuItem items={testItems.snacks} cantFind="/"/>
        </MemoryRouter>   
    )
    expect(asFragment).toMatchSnapshot()
})

it('should render correct text', ()=>{
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: 'test-snack-1' });
    const {getByText} = render(
        <MemoryRouter initialEntries={["/snacks/test-snack-1"]} >
            <MenuItem items={testItems.snacks} cantFind="/"/>
        </MemoryRouter>   
    )
    expect(getByText("test snack 1")).toBeInTheDocument()
})
