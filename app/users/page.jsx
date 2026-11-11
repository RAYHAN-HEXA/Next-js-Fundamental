
import Link from 'next/link';

import React from 'react';


const Userpage = async () => {
   
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    
    const user = await res.json(); 
    console.log(user)
   
    return (
        // JS-line comments are only valid outside JSX — JSX regions use {/* */} comments
        <div  >
            {/* Heading shown at the top of the users list page */}
            <h2>user are coming </h2>
            {/* Grid container — "grid grid-cols-3 gap-4" lays the user cards out in a
                3-column grid with a 4-unit gap between the cards */}
            <div className='grid grid-cols-3 gap-4'     >
                {/* Open a JSX expression container: map over the users array to render
                    one card per user inside the grid */}
                {
                // .map() transforms each user object into a card element; key={user.id} gives
                // React a stable identity per card so it can reconcile the list efficiently
                user.map((user) => (
                    // One user card — a bordered box with padding; key is required on list items
                    <div className='border p-4' key={user.id}>
                        {/* The user's full name — the card's title */}
                        <h3>{user.name}</h3>
                        {/* The user's email address */}
                        <p>{user.email}</p>
                        {/* The user's phone number */}
                        <p>{user.phone}</p>
                        {/* "View Details" button-styled link to /users/<this user's id>,
                            which renders the dynamic details page for that user */}
                        <Link href={`/users/${user.id}`} className='btn btn-primary mt-2'>View Details</Link>
                    {/* Close the user card div */}
                    </div>
                ))
                }
            {/* Close the grid container */}
            </div>
        {/* Close the outer page wrapper */}
        </div>
    );
};

// Export the component as the default export — this makes it the route page for /users
export default Userpage;
