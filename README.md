# Omnis eCharts

[Apache eCharts](https://echarts.apache.org/en/index.html) in Omnis

Cheatsheet: [https://echarts.apache.org/en/cheat-sheet.html](https://echarts.apache.org/en/cheat-sheet.html)

![Stacked Area Chart Demo](assets/stacked-area-chart-default-demo.png "Stacked Area Chart Demo")
![Stacked Area Chart Demo (Vintage)](assets/stacked-area-chart-vintage-demo.png "Stacked Area Chart Demo (Vintage)")

## Installation

Download `omnis-echarts.tar.gz` from Releases

Move `omnis-echarts` directory into Omnis Studio `htmlcontrols`, in the application package
([Docs](https://www.omnis.net/blog/add-web-functionality-to-omnis-studio-desktop-apps-with-obrowser/))

### Properties

- `height`: Height, in `vh`, of the control within the pane. Default is 97% (full screen w/o scroll bar)
- `option`: JSON input to eCharts, as usage on eCharts examples
- `theme`: Theme to use for rendering the chart

### Events

- Downloads: Some eCharts show permit a file download. It's generally recommended to implement the file download
  capability in Omnis oBrowser to take advantage of this feature.

## Development

### Build HTML / CSS / Assets

```bash
npm run build
```

### dist

All output is placed into the `dist` folder, which can be renamed to `omnis-echarts` and placed in the Omnis Studio
`htmlcontrols` directory

### Omnis Interaction

All interaction with Omnis is contained in the `index.html` entry point and the `stores/omnis.js` store.

### CORS Issues

Omnis Studio relies on [Chromium Embedded](https://bitbucket.org/chromiumembedded/cef/), which
respects normal file loading rules for disk content. This means that all code must be `base64`
encoded in order to avoid the CORS same-origin rules. The other solution is to manually configure
Chromium with switches like `--allow-file-access-from-files`, but that is both inconvenient and
insecure (switch is global, so it would affect regular HTTP loads in Omnis Studio as well)

To address this issue two plugins are used in the build:
[vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) (inline of
JS/CSS) and [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) for minification.
