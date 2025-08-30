
# SketcDrawDoodle User Interface and Client

# UI Design  
The app is designed mobile first with a three column layout. The first column contains the NavPanel allowing the user to navigate through the app, the center column contains the main app sections loaded by clicking nav links and the third column which is an extras panel and can be used for anything that comes to mind (trending categories, tutorials, hints&tips, promotions) etc
  
The design is responsive.  
On Desktop the NavPanel expands to allow space for descriptive labels for links but shrinks down on mobile only showing icons

The main sections panel maintains the majority of the screen space adapting to fill as much space as possible

The ExtrasPanel appears only on devices above 798px width, disappearing entirely on smaller devices and mobile. When collapsed its content can be accessed through a hamburger menu.

# Initialization  
When the app first loads, it unpacks a JSon payload in the DOM from the Django Server containing data on the initial state of the app. The top level component SketchDrawDoodle then initializes the app state, such as whether the user is signed in and what app section to initially render

# NavPanel  
Each link in the nav panel is a React component containing a label and an SVG. I decided to create SVG's(In Inkscape) to allow maximum flexibility in styling and because they have a small file size and scale well. 

The links are described in the navLinkData array, making it easy to modify existing links or add new ones.The links that a user sees depends on whether they're signed in, so are conditionally rendered based on their linkType property. The array is then iterated over, mapping the link objects into their corrosponding Link component. 

# Managing App Sections
SketchDrawDoodle has a number of sections that will appear in the main panel area as the user interacts with the app. The activeSection is initialized when the app is first rendered and the state managed in the top level SketchDrawDoodle component where it is the single source of truth. Child components are passed state and are able to modify the activeSecion when various events occur.

A similar declarative design is used for managing the sections, where each section is described as an object within an array. The active section can then be found in the array and its corrosponding component loaded.








