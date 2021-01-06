import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import HelixTextField from "./index";
import "@testing-library/jest-dom/extend-expect";

function CostInput() {
    const [value, setValue] = useState("")
  
    const removeDollarSign = (value) => (value[0] === "$" ? value.slice(1) : value)
    const getReturnValue = (value) => (value === "" ? "" : `$${value}`)
  
    const handleChange = (event) => {
        event.preventDefault()
        const inputtedValue = event.currentTarget.value
        const noDollarSign = removeDollarSign(inputtedValue)
        if (isNaN(noDollarSign)) return
        setValue(getReturnValue(noDollarSign))
    }
  
    return <HelixTextField value={value} label="Cost" name="cost-input" inputProps={{ "data-testid": "cost-input" }} onChange={handleChange} />
}

const setup = () => {
    const utils = render(<CostInput />)
    const input = utils.getByTestId("cost-input")
    return {
        input,
        ...utils,
    }
}

describe("Cost Input", () => {
  it("is empty value", async () => {
    // Render new instance in every test to prevent leaking state
    const { input } = setup()
    fireEvent.change(input, { target: { value: '' } })
    expect(input.value).toBe('');
  });
  
  it("should keep a $ in front of the input", () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: "23" } })
    expect(input.value).toBe("$23")
  })
  
  it("should allow a $ to be in the input when the value is changed", () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: "$23.0" } })
    expect(input.value).toBe("$23.0")
  })
  
  it("should not allow letters to be inputted", () => {
    const { input } = setup()
    expect(input.value).toBe("") // empty before
    fireEvent.change(input, { target: { value: "No Letters Allow!" } })
    expect(input.value).toBe("") //empty after
  })
  
  it("should allow the $ to be deleted", () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: "23" } })
    expect(input.value).toBe("$23") // need to make a change so React registers "" as a change
    fireEvent.change(input, { target: { value: "" } })
    expect(input.value).toBe("")
  })
})