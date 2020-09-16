import { themes } from '@storybook/theming';

// or global addParameters
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  docs: { theme: themes.dark },
}