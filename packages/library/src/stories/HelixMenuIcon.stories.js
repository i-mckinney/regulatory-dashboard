import React from "react";
import HelixMenuIcon from "../components/HelixMenuIcon/index"
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Functional Helix Menu Icon",
    decorators: [withKnobs],
    component: HelixMenuIcon,
    argTypes: { onClick: { action: 'clicked' } }
}

/**
 * 
 * HelixMenuIcon.stories.js contains this code. 
 * the index.js file that is in the same folder HelixMenuIcon is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

/**
 * @param {object} args represents arguments that SampleHelixMenuIcon needs
 */
export const SampleHelixMenuIcon = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixMenuIcon {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixMenuIcon.args are arguments will provide to SampleHelixMenuIcon to work functionality
 */
SampleHelixMenuIcon.args = {
    renderCustomizedMenuItems: () => {
        return (
            <>
              <MenuItem>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <Typography>Edit</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" color="secondary" />
                </ListItemIcon>
                <Typography>Delete</Typography>
              </MenuItem>
            </>
        )
    },
    handleEditMenuItem: () => null,
    handleDeleteMenuItem: () => null,
}

SampleHelixMenuIcon.parameters = {
    jest: ["HelixMenuIcon.test.js"],
};