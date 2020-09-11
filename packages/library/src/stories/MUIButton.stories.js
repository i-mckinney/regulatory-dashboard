import React from "react";
import MUIButton from "../components/MUIButton/index";
import ThemeSelector from "../themes/ThemeSelector";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
    title:"MUIButton",
    decorators: [withKnobs],
}

export const basicButton = () => <ThemeSelector><MUIButton> Basic Button</MUIButton></ThemeSelector>

export const coloredButton = () => 
<>
<ThemeSelector>
<MUIButton type="primary"> Primary Button</MUIButton>
<br/>
<br/>
<MUIButton type="secondary"> Secondary Button</MUIButton>
</ThemeSelector>
</>
export const disabledButton = () => <ThemeSelector><MUIButton disabled > Primary Button</MUIButton></ThemeSelector>