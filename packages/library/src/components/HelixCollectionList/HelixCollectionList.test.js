import React from "react";
import { Box } from "@material-ui/core"
import { render, fireEvent } from "@testing-library/react";
import HelixCollectionList from "./index";
import HelixButton from "../HelixButton/index"
import "@testing-library/jest-dom/extend-expect";

function CollectionList() {
    const user =  "Anon"
    const searchFilter = { search: (rows) => { return rows } }
    const data = [
        {
            _id: '1',
        },
        {
            _id: '2',
        },
        {
            _id: '3',
        },
    ]

    const renderCustomizedComponent = (user, data, handleComponent, handleEditMenuItem, handleDeleteMenuItem ) => {
        return (
            <Box component="span" m={1}>
                <HelixButton text={`Component ${data._id}`} id={data._id} onClick={handleComponent} color="primary" />
            </Box>
        )
    }

    const handleComponent = () => {
        return alert("Component is Clicked!") 
    }

    const handleEditComponent = () => null

    const handleDeleteComponent = () => null

    return (
        <HelixCollectionList
        user={user}
        searchFilter={searchFilter}
        data={data}
        renderCustomizedComponent={renderCustomizedComponent}
        handleComponent={handleComponent}
        handleEditComponent={handleEditComponent}
        handleDeleteComponent={handleDeleteComponent}
        />
    )
}

const setup = () => {
    const utils = render(<CollectionList />)
    return {
        ...utils,
    }
}

beforeEach(() => {
    window.alert = jest.fn(() => ({}));
})

afterEach(() => {
    jest.clearAllMocks();
})

it("should render Helix Collection List component", () => {
    const { ...utils } = setup()

    const list = utils.getByRole("list")

    expect(list).toBeDefined()
})

it("should have 3 list item component", () => {
    const { ...utils } = setup()

    const listItems = utils.queryAllByRole("listitem")
    expect(listItems).toHaveLength(3)
})

it("click button Component 1 and pop up an alert", () => {
    const { ...utils } = setup()

    const listItem = utils.queryAllByRole("listitem")[0]
    const button = utils.queryAllByRole("button")[0]
    fireEvent.click(button)

    expect(listItem.textContent).toBe("Component 1")
    expect(button.id).toBe("1")
    expect(window.alert).toHaveBeenCalledTimes(1)
})

it("click button Component 2 and pop up an alert", () => {
    const { ...utils } = setup()

    const listItem = utils.queryAllByRole("listitem")[1]
    const button = utils.queryAllByRole("button")[1]
    fireEvent.click(button)

    expect(listItem.textContent).toBe("Component 2")
    expect(button.id).toBe("2")
    expect(window.alert).toHaveBeenCalledTimes(1)
})

it("click button Component 3 and pop up an alert", () => {
    const { ...utils } = setup()

    const listItem = utils.queryAllByRole("listitem")[2]
    const button = utils.queryAllByRole("button")[2]
    fireEvent.click(button)

    expect(listItem.textContent).toBe("Component 3")
    expect(button.id).toBe("3")
    expect(window.alert).toHaveBeenCalledTimes(1)
})

it("click button Component 1, Component 2, and Component 3 and three alert popup called three times", () => {
    const { ...utils } = setup()

    const listItems = utils.queryAllByRole("listitem")
    const buttons = utils.queryAllByRole("button")
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    fireEvent.click(buttons[2])
    

    expect(listItems[0].textContent).toBe("Component 1")
    expect(listItems[1].textContent).toBe("Component 2")
    expect(listItems[2].textContent).toBe("Component 3")
    expect(buttons[0].id).toBe("1")
    expect(buttons[1].id).toBe("2")
    expect(buttons[2].id).toBe("3")
    expect(window.alert).toHaveBeenCalledTimes(3)
})