# Orbit Control
    - Orbit controls allow the camera to orbit around a target.
    - Orbit controls are not part of the core three.js library, but are included in the examples folder.
    - It takes in a camera and a domElement as arguments.
    - Has a bunch of properties that can be set. And a bunch of methods that can be called.
    - More in the docs & in the orbit control project in the introToThreeJS folder
# Geometries 
    -Lots of different geometries in three.js
    - https://threejs.org/docs/#api/en/geometries/BoxGeometry <--- docs
    - You can put wireframe:true on the geometry to see the wireframe of the geometry
    - BufferGeometry is a more efficient way of storing geometries.
    - BufferGeometry has less properties than Geometry
    - You can make a geometry from scratch by defining the vertices and faces refer to introToThreeJS/geometries for more info also the docs 
    
# Textures
    - Textures are images that are wrapped around the geometry.
    - You can use a texture loader to load in a texture.
    - More notes in introToThreeJS/Textures
    
# Materials & Debugging: Refer to the notes in introToThreeJS/Materials and introToThreeJS/Debugging 

# Lights
- Ambient Light - Lights up everything equally, no shadows
- Directional Light - Light that shines in a specific direction, like the sun, no matter where you are, the light will always be in the same position.
- Hemisphere Light - Gradient light, one color on one side, another color on the other side.Top and Bottom in this case.
- Point Light - Light that shines in all directions, like a light bulb.
- RectArea Light - Light that shines in a rectangular area, like a tv screen.
- Spot Light - Light that shines in a cone shape, like a flashlight.
- Refer to introToThreeJS/Lights for more info

# Shadows
- Shadows are not enabled by default in three.js
- You need to enable shadows on the renderer, the light, and the object that you want to cast a shadow.
- Only certain lights can cast shadows, Point light, directional light and the spot light are the lights that can cast shadows.
- Refer to introToThreeJS/shadows for more info
# Particles
- Particles are just a bunch of points in 3D space.
- You can use a texture to make the particles look like something.
- Refer to introToThreeJS/particles for more info (Lots of notes and cool effects done in this folder/video)