# What is WebGL and ThreeJS
## WebGl:
    - Stands for Web Graphics library (Low level JS API)
    - Allows you to display 2D and 3D graphics 
    - (download threejs from website. 2.) link three.min.js to HTML the THREE object is the main object used. it contains classes, methods and more)
# Scene: (Always present in every 3js project)
    - A scene is made up of: 
        1.) Scene = (const scene = new THREE.Scene();)
        2.) Objects = Meshes (contain 2 main things(args): 1st Specify the shape and dimensions of the mesh, is it circle rectangle, square, etc and how big it should be. 2nd thing is what the mesh is made of color is a main one. 
        Geometry is used for shape and dimension. Mesh Material is used for material )
        3.) Camera = What the user sees. Made up of 4 things (args)
        4.) Renderer = (Takes the scene and camera and displays it on the screen)
# Transformation:
    - The scene, renderer, meshes, camera are all objects
    - We want objects the inherit from the Object3D class 
    - Search for object in docs and it will say at the top if it inherits from Object3D or not 
    