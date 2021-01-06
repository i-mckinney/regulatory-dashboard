import React from "react";
import { render } from "@testing-library/react";
import { Card, CardHeader, Divider, CardContent, Typography, Avatar, MenuItem, ListItemIcon } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelixMenuIcon from "./index";
import "@testing-library/jest-dom/extend-expect";

function MenuIconActions() {
    const user = "HelixCP"

    const renderCustomizedMenuItems = (handleEditMenuItem, handleDeleteMenuItem) => {
        return (
          <>
            <MenuItem onClick={handleEditMenuItem}>
              <ListItemIcon>
                  <EditIcon fontSize="small" />
              </ListItemIcon>
              <Typography>Edit</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteMenuItem}>
              <ListItemIcon>
                  <DeleteIcon fontSize="small" color="secondary" />
              </ListItemIcon>
              <Typography>Delete</Typography>
            </MenuItem>
          </>
        )
      }

    const handleEditMenuItem = () => {
        return (
            alert("Edited Menu Item!")
        )
    }

    const handleDeleteMenuItem = () => {
        return (
            alert("Deleted Menu Item!")
        )
    }
    return (
        <Card>
            <CardHeader
            avatar={
            <Avatar aria-label="user" >
                {user.charAt(0).toUpperCase()}
            </Avatar>
            }
            action={ 
            <HelixMenuIcon
            renderCustomizedMenuItems={renderCustomizedMenuItems}
            handleEditMenuItem={handleEditMenuItem}
            handleDeleteMenuItem={handleDeleteMenuItem}
            /> }
            title={`Last Modified by Helix`}
            subheader={`Created at Storybook`}
            />
            <Divider />
            <CardContent>
                <Typography variant="h6" color="textPrimary" component="p">
                This is a test!
                </Typography>
            </CardContent>
        </Card>
    )
}

const setup = () => {
    const utils = render(<MenuIconActions />)
    return {
        ...utils,
    }
}

it("should render Menu Icon Actions component", () => {
    const { ...utils } = setup()

    const tab = utils.getByRole("button")

    expect(tab).toBeDefined()
})