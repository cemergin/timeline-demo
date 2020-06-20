## High level objective:

Design and implement a component for visualizing events on a timeline.

## Details:

used create-react-app to generate the boilerplate code

- npm install
- npm start

### Features:

- Collusion-Free Event Positioning
- Zoom-in and Zoom-out
- Basic "Inline Editting"
- Drag and drop events in x-axis and y-axis

### TO-DO

- Adding Events (In Progress...)
- Removing Events (In Progress..)
- Add more column types (Month, Year)
- Optimization for different screen sizes
- Animations & Transitions
- Testing
- Conversion to Typescript
- Bundling into npm package

### Questions

- How long you spent on the assignment.
  - After the initial research and experimentation process which I did over 2-3 days, it took me about 8 hours to program the current version from scratch.
- What do you like about your implementation.
  - I really like the look and feel of the final version. I understand that it is not ready to be published on a professional data visualisation library but I am happy with the UI for a quick and dirty mock-up.
- What you would change if you were going to do it again.
  - I spent a lot of time trying to figure out a sustainable way to sync the information in the Redux store with the visual representation. If I was to redo this project I would first focus on the UI aspect of the components and spent more time on areas like design, animations and interactivity.
- How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
  - I tried to consider the instructions, the data provided with the exercise and my own capabilities as I was coming up with the initial prototype. Looking at the provided data, I saw that a one-dimensional timeline is not sufficient for this scenario since there were events happening at the same time. Interestingly, most timelines examples I saw on the web are used to represent a single sequence of non-overlapping events. Therefore, I decided that I would like to display the information more like a Gantt chart that displays the time of events horizontally.
- How you would test this if you had more time.
  - I would first "monkey test" the application personally and then seek ask a couple of my friends who are unfamiliar with this project to test out the overall UX and funationalities to figure out any usability issues for functional improvements. I would later move into writing tests using Jest and Enzyme for each function.
