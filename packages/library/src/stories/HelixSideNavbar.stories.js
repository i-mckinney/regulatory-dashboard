import React from "react";
import HelixSideNavbar from "../components/HelixSideNavbar/index";
import { withKnobs } from "@storybook/addon-knobs";
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix SideNavbar",
    decorators: [withKnobs],
    component: HelixSideNavbar,
    argTypes: { onClick: { action: 'clicked' } }
    
}

/**
 * 
 * HelixSideNavbar.stories.js contains this code. 
 * the index.js file that is in the same folder HelixSideNavbar is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

export const SampleHelixSideNavbar = (args) => <ThemeSelector><HelixSideNavbar {...args} /></ThemeSelector>
//FILL IN ARGS Like this to display in docs
SampleHelixSideNavbar.args = {
    variant: 'persistent',
    anchor: 'left',
    text: 'Hello World'
}