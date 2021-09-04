### Word Collections Website

### Website Front End

The front end web application will be written using React and supports the following functionality.

The front page displays a list of poem previews showing the first few lines of each poem. The poems displayed are those that are most highly rated (most votes).

Clicking on a poem title (or maybe on the poem or a button saying "read more...") navigates to a page for that poem showing the whole text of the poem, nicely formatted

There is a link in the site navigation to a form to add a new poem, once the fields are completed and the user clicks submit, the form is sent to the backend, if all goes well, the new poem is shown on it's own page

Each poem page has an upvote button to record votes for the poem, clicking the button sends a request to the API to add to the votes for the poem

Poem texts are written using Markdown and when displayed on the page, the Markdown is interpreted to give a nice layout (eg. using the react-markdown package) (note that to create line breaks you end a line with two spaces, you could refer your users to https://www.markdownguide.org/basic-syntax/ for reference)

### Website Back End

The backend of this website is an Express API server. The informaiton is not stored on a database so no information will
be saved when a full page refresh occurs.

The API has the following endpoints:
GET /api/poems - returns a list of poem records
GET /api/poems/:id - returns the record for the poem with the given id
POST /api/poems - adds a new poem to the collection, POST body is the poem JSON without the id or votes fields, response includes the new poem id
POST /api/poems/:id - adds an upvote for the poem with the given id

Poems records have id, author, title, text and votes fields. id is a unique integer id; votes is an integer count of upvotes for the poem; the remaining fields are text.

# Authentication

This website does not have server authentication, but to add a level of security ther server will only accept posts that have the
header: bob:bobalobba

### Running the Website

This Website has both the backend and front end in one project.
The server is currently integrated with the frontend - to run the website 'npm run dev' should be run in the terminal.
'npm run dev' will run on localhost:3001 and allow access to both the frontend and the server from this address

To see the changes made to the front end files 'npm run build' must be run prior to calling 'npm run dev'.
