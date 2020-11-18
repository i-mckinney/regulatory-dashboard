import React from "react";
import HelixCollectionList from "../components/HelixCollectionList/index"
import HelixButton from "../components/HelixButton/index"
import { Box } from '@material-ui/core'
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Collection List",
    decorators: [withKnobs],
    component: HelixCollectionList,
}

/**
 * 
 * HelixCollectionList.stories.js contains this code. 
 * the index.js file that is in the same folder HelixCollectionList is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

/**
 * @param {object} args represents arguments that SampleHelixCollectionList needs
 */
export const SampleHelixCollectionList = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixCollectionList {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixCollectionList.args are arguments will provide to SampleHelixCollectionList to work functionality
 */
SampleHelixCollectionList.args = {
    user: "Anon",
    searchFilter: { search: (rows) => { return rows } },
    data: [
        {
            _id: '1',
        },
        {
            _id: '2',
        },
        {
            _id: '3',
        },
        {
            _id: '4',
        },
        {
            _id: '5',
        },
        {
            _id: '6',
        },
    ],
    elevation: 10,
    cellHeight: 200,
    spacing: 10,
    columnSpan: 3,
    renderCustomizedComponent: () => {
        return (
            <Box component="span" m={1}>
                <HelixButton text={"Click me!"} color="primary" />
            </Box>
        )
    },
    handleComponent: () => null,
    handleEditComponent: () => null,
    handleDeleteComponent: () => null,
}