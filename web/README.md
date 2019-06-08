w7x3d web editor
=====

A 3D scene editor for W7-X components. Powered by Three.js, componentsDB, and forked from the [Three.js editor](https://threejs.org/editor/).

## Understanding the codebase

*   Files that create the web editor interface are in the `web/js` directory
    *   `ui.js` contains the source for primitives like `UI.Text` and `UI.Button` used in the sidebar and menubar
    *   W7X-specific code has W7X in its filename
    *   Interface code is organized and executed hierarchically. For example the code in `Sidebar.W7XFLTracer.js`, which lets you set simulation values and displays the result of  a SOAP call to the simulation server, is run in the following chain of events:
        *   `index.html` has a line containing `new Sidebar( editor );`, which calls
            *   `Sidebar.js`, which similarly calls
                *   `Sidebar.W7X.js`, which could display some text/buttons right below the top level of tabs but currently doesn't
                *   `Sidebar.W7XTabs.js`, which creates the secondary row of `Models` and `Magnetics` tabs and calls
                    *   `Sidebar.W7XModels.js`, which lives in the `Models` tab and lets you select 3D models to add to the scene
                    *   `Sidebar.W7XFLTracer`, which lives in the first part of the `Magnetics` tab
                    *   `Sidebar.W7XVMEC`, which lives in the second part of the `Magnetics` tab
*   Files related to core Three.js functions, like object loaders and mouse controls, are defined in the top `js` directory
*   A code search utility like [ag](https://github.com/ggreer/the_silver_searcher) will help you find the code you want to edit by searching for strings displayed in the UI. Github search is also effective. Keep in mind that many UI strings are defined in `web/js/Strings.js`, so you'll probably want to search for the key defined there which corresponds to the UI string you saw

