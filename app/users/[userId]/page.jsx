// Import React — required so the JSX syntax in this file compiles correctly
import React from 'react';

// User details page for the dynamic route /users/[userId].
// Declared "async" so we can await data fetching inside the component body.
const userDetails = async({params}) => {
    // In Next.js App Router, dynamic route segments arrive via the "params" prop
    // (a Promise in recent versions), so we await it and destructure the userId
    // that came from the URL — e.g. /users/5 gives userId = "5"
    const {userId} = await params;
    // Log the route parameter to the server terminal for debugging
    console.log(userId)
    // Fetch this specific user's data from JSONPlaceholder by injecting the
    // userId from the URL into the API endpoint URL (template literal)
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    // Parse the response body from JSON into a single user object
    const user = await res.json();
    // Log the parsed user object to the server terminal for debugging
    console.log(user)
    // Return the JSX markup for the details page
    return (
        // Outer wrapper div for the details view
        <div>
            {/* Empty spacer line kept from the original markup */}
            {/* Heading shown at the top of the user details page */}
            <h2>user details are coming </h2>
            {/* Display the fetched user's full name */}
            <h3>{user.name}</h3>
            {/* Display the fetched user's email address */}
            <p>{user.email}</p>
            {/* Display the fetched user's phone number */}
            <p>{user.phone}</p>
        {/* Close the outer wrapper div */}
        </div>
    );
};

// Export the component as the default export — this makes it the route page
// for /users/[userId] (e.g. /users/3 renders this page with userId = 3)
export default userDetails;
