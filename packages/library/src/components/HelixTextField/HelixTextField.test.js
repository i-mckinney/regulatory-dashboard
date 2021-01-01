import React, { useState } from "react";
import { getByText, render, findByText, screen } from "@testing-library/react";
import HelixTextField from "./index";
import "@testing-library/jest-dom/extend-expect";

function CostInput() {
    const [value, setValue] = useState("")
  
    removeDollarSign = (value) => (value[0] === "$" ? value.slice(1) : value)
    getReturnValue = (value) => (value === "" ? "" : `$${value}`)
  
    handleChange = (event) => {
        event.preventDefault()
        const inputtedValue = event.currentTarget.value
        const noDollarSign = removeDollarSign(inputtedValue)
        if (isNaN(noDollarSign)) return
        setValue(getReturnValue(noDollarSign))
    }
  
    return <HelixTextField value={value} label="First Name" name="firstName" aria-label="cost-input" onChange={handleChange} />
}


const setup = () => {
    render(<CostInput />)
    const input = utils.getByLabelText('cost-input')
    return {
        input,
        ...utils,
    }
}

it("is empty value", async () => {
  // Render new instance in every test to prevent leaking state
  render(<HelixTextField 
    label="First Name"
    name="firstName"
    value=""/>);
  expect(screen.getByDisplayValue(""));
});

it("should allot letters to be inputted", async () => {
    
});

// it("passes in button text", async () => {
//   const text = "Test Button Text";
//   // Render new instance in every test to prevent leaking state
//   render(<HelixTextField text={text} />);
//   expect(screen.getByRole("button")).toHaveTextContent("Test Button Text");
// });
