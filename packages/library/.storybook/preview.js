import { themes } from "@storybook/theming";
import { addDecorator } from "@storybook/react"; // <- or your view layer
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";

// or global addParameters
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  docs: { theme: themes.dark },
};

addDecorator(
  withTests({
    results,
  })
);
