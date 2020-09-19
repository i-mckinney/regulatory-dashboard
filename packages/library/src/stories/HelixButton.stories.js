import React from "react";
import HelixButton from "../components/HelixButton/index";
import { withKnobs } from "@storybook/addon-knobs";
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Button",
    decorators: [withKnobs],
    component: HelixButton,
    argTypes: { onClick: { action: 'clicked' } }
    
}

/**
 * 
 * HelixButton.stories.js contains this code. 
 * the index.js file that is in the same folder HelixButton is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

export const SampleHelixButton = (args) => <ThemeSelector><HelixButton {...args} /></ThemeSelector>
//FILL IN ARGS Like this to display in docs
SampleHelixButton.args = {
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    text: 'Change Me'
}