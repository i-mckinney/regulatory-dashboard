import React from "react"
import HelixPageHeader from "../components/HelixPageHeader/index"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import CloudQueueIcon from "@material-ui/icons/CloudQueue"

export default {
  title: "Helix Components/Helix Page Header",
  decorators: [withKnobs],
  component: HelixPageHeader,
  argTypes: {},
}

/**
 *
 * HelixPageHeader.stories.js contains this code.
 * the index.js file that is in the same folder HelixPageHeader is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector to change themes on the components
 * @decorator You have to add the decorator withKnobs for it to work.
 *
 */

export const SampleHelixPageHeader = (args) => (
  <ThemeSelector>
    <HelixPageHeader {...args} />
  </ThemeSelector>
)
//FILL IN ARGS Like this to display in docs
SampleHelixPageHeader.args = {
  title: "This is the title of the page",
  subTitle: "This is the subtitle",
  icon: <CloudQueueIcon />,
}
