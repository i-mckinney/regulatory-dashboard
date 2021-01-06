import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots'
initStoryshots({
  test: snapshotWithOptions({
    createNodeMock: node => document.createElement(node.type),
  }),
})