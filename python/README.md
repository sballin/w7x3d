# W7X3D: use Python to create scenes that can be viewed as webpages



## Installation

Python 3 is required.

```py
pip3 install git+git://git.ipp-hgw.mpg.de/base/w7x3d
```

or from inside the Python interpreter:

```
>>> import pip
>>> pip.main(['install', 'git+git://git.ipp-hgw.mpg.de/base/w7x3d'])
```



## Usage

```
import w7x3d as w

# Set the campaign to get the right divertor model
w.set_campaign('op1.2a')

# Add transparent divertor
w.add_divertor(opacity=0.5)

# Add PCI diagnostic
w.add_diagnostic('PCI')

# Set page background color
w.set_background('white')

# Set camera position and direction
# Distance unit is meters for all functions
x, y, z = 5, 5, 5
w.set_camera_position(x, y, z)
x_target, y_target, z_target = 0, 0, 0
w.set_camera_target(x_target, y_target, z_target)

# Show axes and field, current direction conventions
w.add_convention_helpers()

# Add a single point
x, y, z = 1, 0, 0
w.add_point(x, y, z, radius=0.1, color='green')

# Add text
w.add_text(x, y, z, 'This is a point', size=12)

# Add several points with full xyz coordinates
x = [1, 2, 3]
y = [3, 4, 3]
z = [0, 0, 0]
w.add_points(x, y, z, radius=0.05, color='blue')

# Add several points at constant toroidal angle
poincare_r, poincare_z = get_poincare(..., phi=0.5)
w.add_points(poincare_r, poincare_z, None, phi=0.5, radius=0.05, color='black')

# Add a line of constant color
w.add_line(x, y, z, color='red')

# Add a line that changes color along its length
c = ['red', 'blue']
w.add_line(x, y, z, color=c)

# Open scene in web browser
w.view_scene()

# Save all scene data as a file that can be viewed at w7x3d.ipp-hgw.mpg.de
w.to_json('scene.json') 
```

