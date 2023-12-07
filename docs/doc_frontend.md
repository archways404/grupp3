
# [NAMEPLATE]

Introduction text

[![](https://img.shields.io/badge/YouTube_React_introduction-100000?style=for-the-badge&logo=react&logoColor=0C9AFF&labelColor=22272e&color=22272e)](https://www.youtube.com/watch?v=SqcY0GlETPk)

## Usage/Examples

#### The basics:

In react, we can either have a "single page application" or a "multi-page application". 

Single page does everything in one main pages file and conditionally render components, and while it might be "better" to be able to not refresh the page to render the next page, it can and will be a nightmare to manage the rendering of components.

The core structure of react follows these concepts:

#### The file structure:
```javascript
frontend
-> src            (main folder)
  -> components   (components)
  -> pages        (full pages)
  main.jsx        (routing)
```
#### Routing
```javascript
frontend
-> src 
  main.jsx
```
Think of main.jsx as the brain of the project. In here, you import all of the pages, and define the routes ex:

-  "/" should render the "homepage"

-  "/login" should render the "loginpage" etc.

#### Pages
```javascript
frontend
-> src 
  -> pages
    pagename.jsx
```
In here, we keep all of our different pages, and it is also here that we render components etc. 

You can view it as a computer-case, where you have components (graphics card, CPU, motherboard etc), that you can swap out, but it is not a complete computer without the required components then it's not really a computer.

#### Components
```javascript
frontend
-> src 
  -> component
    componentname.jsx
```
In here, we keep all of our different components. 

You can think of a component as a specific part of a website that needs to be rendered multiple times throughout the website, think navbar, footer etc etc

In reference to the previously mentioned example of the computer, the component would be a part of the pc such as the graphics card, CPU etc.. ..

## Code structure

### Main.jsx
Dependencies:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router, Routes, Route } from 'react-router-dom';
```

Pages:
```javascript
import App from './pages/App.jsx';
import Test from './pages/Test.jsx';
```

Rendering:

Here we define all of the pages that should render and on what endpoint they should render at.

Ex: 

- "App" should render on the endpoint "localhost:port/"
- "Test" should render on the endpoint "localhost:port/test"

```javascript
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
	  path="/test"
	  element={<Test />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
```


### App.jsx

Dependencies:

Here we import the components and general dependencies.
```javascript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
```

Overview:

We declare the logic, useStates, useEffects, functions etc up in the "JavaScript" section.
 
And then render components, HTML (including conditional statements), etc in the "HTML + Ract-JavaScript" section. Keep in mind that the syntax in the "return()" section is different than the regular JavaScript we can write outside of the "return()" section.

```javascript
function App() {
  // JavaScript code
  return (
    // HTML + React-JavaScript syntax
  )
}
export default App
```

To keep it short, in this codebase we have a button that when you click it (onClick) it updates the state of count to add "1" to the current count.

```javascript
  const [count, setCount] = useState(0)
  return(
    <>
      <button onClick={() => setCount((count) => count + 1)}> count is {count}
      </button>
    </>
  )
```
You could also declare it as a function and call the function instead of having the logic written inside of the "return()" section.

```javascript
  const [count, setCount] = useState(0)
  const btnClick = () => {
    setCount((count) => count + 1)
  }
  return(
    <>
      <button onClick={btnClick}> count is {count}
      </button>
    </>
  )
```

To render a component, you can do it like this using either "<>" or just "div":

```javascript
import TestComponent from '../components/TestComponent.jsx'
function App() {
  return (
    <>
      <testComponent />
    </>
  )
}
```
or
```javascript
import TestComponent from '../components/TestComponent.jsx'
function App() {
  return (
    <div>
      <testComponent />
    <div/>
  )
}
```

Full context:

```javascript
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```



