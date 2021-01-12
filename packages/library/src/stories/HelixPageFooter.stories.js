import React from "react"
import HelixPageFooter from "../components/HelixPageFooter/index"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"

export default {
  title: "Helix Components/Helix Page Footer",
  decorators: [withKnobs],
  component: HelixPageFooter,
  argTypes: {},
}

/**
 *
 * HelixPageFooter.stories.js contains this code.
 * the index.js file that is in the same folder HelixPageHeader is straight from our repo
 * this file is loading that code.
 *
 */

export const SampleHelixPageFooter = (args) => (
  <ThemeSelector>
    <HelixPageFooter {...args} />
  </ThemeSelector>
)
//FILL IN ARGS Like this to display in docs
SampleHelixPageFooter.args = {}
