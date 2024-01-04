### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
- The purpose of React Router is so that the application in the browser can handle the routing with in itself instead of relying on data from a server to render each page. It allows for the creation of single-page applications.

- What is a single page application?
- It is a web app that only loads once from a server, and then handles routing calls on it's own. So every time new information is displayed the whole page isn't rendered from a server, but the url still changes, allowing navigation through back/forth buttons in the browser.

- What are some differences between client side and server side routing?
- Server side routing has the browser send requests to the server which responds with a whole new web page to rerender. It changes the entire DOM. Client-side routing, does not reload the entire DOM but rather just renders what is needed onto the existing DOM and updates the url bar using JS.

- What are two ways of handling redirects with React Router? When would you use each?
- As of writing this out, there are actually 3 ways (the notes and videos were kind of confusing about this). There is the Navigate component which can be put inside the return value of a functional component. It will navigate you to the url defined in the "to" prop, and you will be able to navigate back to the previous page. The useNavigate hook does the same thing but allows you to navigate from functions nested inside functional components. The component is just a wrapper for the hook. Lastly, the Redirect function that the library provides, lets you redirect without pushing on to the history object, so the back navigation isn't allowed. Navigate/useNavigate are kind of general purpose redirect features, the special use case for  redirect would be after making a post request to a server, or anything that you wouldn't want a user to go back and view/do again.


- What are two different ways to handle page-not-found user experiences using React Router? 
- Having a route that catches all (i.e. to="*") and then rendering a Navigate component that just takes you to the home directory, or rendering a special 404 not found component.

- How do you grab URL parameters from within a component using React Router?
- You pass them in the same way you would do in express with a ":" in fornt of the param name in the url. To access them in the component, you would use the useParams hook, which will return an object with the params.

- What is context in React? When would you use it?
- Context is state that can be accessed by components that are wrapped within a context provider. It is useful when vslues or functions need to be accessed in nested components, or if there are many components that use it throughout the whole application. It just makes it easier to update, maintain and use the state in larger applications.

- Describe some differences between class-based components and function
  components in React.
- Class based components need to have a lot more requirements to be able to work. There needs to be a constructor and there needs to be a render function in order for the component to be rendered. A functional component only needs a return value to be rendered. Functional components also have access to hooks where as class based components don't

- What are some of the problems that hooks were designed to solve?
- Before hooks, initializing and setting state was clunky and hard to follow. Hooks made it easier to to do both of those things. It was also designed to solve the problem of repeating code because hooks allow you to abstract logic and use it in multiple components. Lastly it solves the problem of this and binding because there aren't any methods that need to be bound to a class. Functions or hooks are simply defined and then called. No need for the this keyword.
