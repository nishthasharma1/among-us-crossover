# CSSI 2021 - Cohort 9 - WebSocket Example

This project is a glitch-based implementation of the video series that can be found
here -- [https://www.youtube.com/watch?v=bjULmG8fqc8](https://www.youtube.com/watch?v=bjULmG8fqc8&t=6s). A stand alone, GitHub-based
version can be found here -- [https://github.com/bohdandrahan/Shared-Canvas](https://github.com/bohdandrahan/Shared-Canvas).

This project changes the above in two ways:
1) Updates to the latest socket.io API -- There will be minor differences in the socket.io calls
made in the above links and in this project.
2) Adapt the server setup to how glitch run server -- The above links expect that you are
running this locally (i.e. directly on a laptop for instance)

Unlike previous projects that ran as pure client applications, this project uses a glitch-hosted
server (see package.json or server.js). Pay attention to the "App Status" in the bottom left corner, and
turn on the server logs (Tools -> Logs in the bottom left) to see any message from the server side code.

## How To Run

Open this project twice, each in a separate browser window. Drawing on the canvas in the first window (by draggin the mouse) will show circles in
a random color. These same circles should show up as red circles in the second window. Conversely, drawing in the second window will show
circles in a different random color with these same circles show up in red in the first window.

This can be expanded to any number of browser windows, with the red circles showing up in all windows with the project open.