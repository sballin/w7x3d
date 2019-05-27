# w7x3d

This project aims to make it easy to create and share 3D scenes of the W7-X stellarator. Its specific goals are

* A web-based 3D editor that makes it easy to add 
    * machine components and diagnostic chords/volumes organized by campaign
    * poincaré plots, flux surfaces, and field lines for common magnetic configurations
    * user-uploaded point clouds, lines, and surfaces, with color maps
* A web server to host user-created scenes that can be shared as URLs
* A python library making it possible to generate scenes with custom data directly from scripts
* A JSON specification that describes W7-X scenes tersely using componentsDB IDs, supported by the web editor and python library. This would serve as a template for future Three.js scene generators in other languages and programs for high-quality rendering using tools like POV-Ray

We're planning to house all these projects in this repository.

## Contributing

Join our [slack](https://w7x3d.slack.com/signup) to discuss. Right now the python library, JSON spec, and any additional language implementations/POV-Ray would be great places to start.

##  Acknowledgments

* W7-X CoDaC for the webservices that this project makes use of
* Michael Grahl for the [webservices 3D viewer](http://webservices.ipp-hgw.mpg.de/docs/tryitview.html), which was the inspiration for this project and the original source of certain functions
* The Three.js development team for the [web editor](https://threejs.org/editor) which this project builds on, as well as the underlying library

