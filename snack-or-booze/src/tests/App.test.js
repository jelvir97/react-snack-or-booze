import { render, screen, waitFor, act} from "@testing-library/react";
import  "@testing-library/jest-dom"
import { MemoryRouter } from 'react-router-dom';
import App from "../App"
import userEvent from "@testing-library/user-event";

jest.mock('../Api', () => ({
    ...jest.requireActual('../Api'),
    getItems: ()=>({
        snacks: [
            {
                id:'test-snack-1',
                name: "test snack 1",
                description:"test snack description 1",
                recipe: "test snack recipe 1",
                serve: "test snack serve 1"
            },
            {
                id:'test-snack-2',
                name: "test snack 2",
                description:"test snack description 2",
                recipe: "test snack recipe 2",
                serve: "test snack serve 2"
            }
        ],
    
        drinks: [
            {
                id:'test-drink-1',
                name: "test drink 1",
                description:"test drink description 1",
                recipe: "test drink recipe 1",
                serve: "test drink serve 1"
            },
            {
                id:'test-drink-2',
                name: "test drink 2",
                description:"test drink description 2",
                recipe: "test drink recipe 2",
                serve: "test drink serve 2"
            }
        ]
    }),
    addItem: (formData)=>({
        data: { ...formData, id: "test-id" }
    })
}));

describe("smoke and snapshot tests", ()=>{
    
    it("should render", async ()=>{
        await waitFor(()=>{
            render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            )
        })

    })

    it("should match snapshot", async ()=>{
        await waitFor(()=>{
            const {asFragment} = render(
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            )

            expect(asFragment).toMatchSnapshot()
        })

    })

})

describe('routes working',()=>{
    it("should render home page", async ()=>{
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <App />
                </MemoryRouter>
            )       
        })
        expect(await screen.findByText(`Welcome to Silicon Valley's premier dive cafe!`)).toBeInTheDocument()
    })

    it("should render add item form page", async ()=>{
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/add"]}>
                    <App />
                </MemoryRouter>
            )       
        })
        expect(await screen.findByText(`Add Menu Item`)).toBeInTheDocument()
    })

    it("should render food menu page", async ()=>{
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/snacks"]}>
                    <App />
                </MemoryRouter>
            )       
        })
        expect(await screen.findByText(`Food Menu`)).toBeInTheDocument()
        expect(await screen.findByText(`test snack 1`)).toBeInTheDocument()
    })

    it("should render drink menu page", async ()=>{
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/drinks"]}>
                    <App />
                </MemoryRouter>
            )       
        })
        expect(await screen.findByText(`Drinks Menu`)).toBeInTheDocument()
        expect(await screen.findByText(`test drink 1`)).toBeInTheDocument()
    })

    it("should render not-found page", async ()=>{
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/invalid-url"]}>
                    <App />
                </MemoryRouter>
            )       
        })
        expect(await screen.findByText(`Hmm... what your looking for doesn't exist.`)).toBeInTheDocument()
    })
})

describe('testing navigation', ()=>{
    it("should navigate to menus", async()=>{
        const user = userEvent.setup()
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            )
        })

        const snackMenuBtns = await screen.findAllByText('Snacks')
        user.click(snackMenuBtns[0])
        expect(await screen.findByText('Food Menu'))
    })

    it('should navigate to MenuItem', async()=>{
        const user = userEvent.setup()
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            )
        })

        const drinkMenuBtns = await screen.findAllByText('Drinks')
        user.click(drinkMenuBtns[0])
        expect(await screen.findByText('Drinks Menu'))

        const testDrinkLink = await screen.findByText('test drink 1')
        user.click(testDrinkLink)
        expect( await screen.findByText('Recipe:'))
        expect( await screen.findByText('test drink 1'))

    })

    it('should navigate to AddItemForm', async()=>{
        const user = userEvent.setup()
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            )
        })

        const addFormLink = await screen.findByText('Add')
        user.click(addFormLink)
        expect(await screen.findByText('Add Menu Item'))
    })

    it('should navigate to Home', async()=>{
        const user = userEvent.setup()
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={['/invalid-url']}>
                    <App />
                </MemoryRouter>
            )
        })

        const goHomeBtn = await screen.findByText('Go Home')
        user.click(goHomeBtn)
        expect(await screen.findByText(`Welcome to Silicon Valley's premier dive cafe!`))
    })
})

describe('test adding new menu items',()=>{
    it('should add new snack', async()=>{
        const user = userEvent.setup()
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/add"]}>
                    <App />
                </MemoryRouter>
            )
        })
        //const type = await screen.findByLabelText('Type') * don't need to change *
        const description = await screen.findByLabelText('Description')
        const recipe = await screen.findByLabelText('Recipe')
        const serve = await screen.findByLabelText('Serve')
        const name = await screen.findByLabelText('Name')
        const submitBtn = await screen.findByText('Submit')

        await act(async()=>{
            await user.type(description, 'test snack 3')
            await user.type(recipe, 'test snack 3')
            await user.type(serve, 'test snack 3')
            await user.type(name, 'test snack 3')

            await user.click(submitBtn)
        })

        expect( await screen.findByText('Food Menu')).toBeInTheDocument()
        expect( await screen.findByText('test snack 3')).toBeInTheDocument()
    })

    it("should fail because of conflicting item name", async()=>{
        //Item with the name ${formData.name} already exists.
        const user = userEvent.setup()
        await waitFor(()=>{
            render(
                <MemoryRouter initialEntries={["/add"]}>
                    <App />
                </MemoryRouter>
            )
        })

        const description = await screen.findByLabelText('Description')
        const recipe = await screen.findByLabelText('Recipe')
        const serve = await screen.findByLabelText('Serve')
        const name = await screen.findByLabelText('Name')
        const submitBtn = await screen.findByText('Submit')

        await act(async()=>{
            await user.type(description, 'test snack 2')
            await user.type(recipe, 'test snack 2')
            await user.type(serve, 'test snack 2')
            await user.type(name, 'test snack 2')

            await user.click(submitBtn)
        })

        expect(await screen.findByText(`Add Menu Item`)).toBeInTheDocument()
        expect(await screen.findByText(`Item with the name test snack 2 already exists.`)).toBeInTheDocument()
    })
})