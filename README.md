# use-fetch-request
React.js hook for dispatching network requests using Fetch API

Still WIP...

````javascript
import React from 'react';
import useFetchRequest from 'use-fetch-request';

export default function App() {
  const [{ response: users }, dispatchRequest] = useFetchRequest('https://jsonplaceholder.typicode.com/users');
  dispatchRequest();

  return (
    <div className="app">
      {users && users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
````
