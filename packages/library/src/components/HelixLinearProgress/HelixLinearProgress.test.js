import React, { useState, useEffect } from "react";
import { render, fireEvent } from "@testing-library/react";
import HelixLinearProgress from "./index";
import "@testing-library/jest-dom/extend-expect";

function ProgressIndicator() {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
        if (progress < 100) {
          const timer = setInterval(() => setProgress(progress + 25), 500)
          return () => clearInterval(timer)
        }
    }, [progress])

    return (
        <HelixLinearProgress value={progress} />
    )
}

const setup = () => {
    const utils = render(<ProgressIndicator />)
    const progress = utils.getByRole("progressbar")
    return {
        progress,
        ...utils,
    }
}

it("should render Progress Indicator component", () => {
    const { progress, ...utils } = setup()
    expect(progress).toBeDefined()
})