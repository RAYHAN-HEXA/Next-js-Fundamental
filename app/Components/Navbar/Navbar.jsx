// Import the Link component from Next.js — used for client-side navigation between pages
// (Link prefetches routes and avoids full page reloads, unlike a plain <a> tag)
import Link from 'next/link';
// Import React — required so the JSX syntax in this file compiles correctly
import React from 'react';

// Define the Navbar component as an arrow function — it renders the top navigation bar
const Navbar = () => {
    // Store the shared list of nav links in a JSX fragment (<>) so the same
    // links can be reused in both the mobile dropdown menu and the desktop menu
    const links = (
      <>
        {/* Each nav item is wrapped in <li> because the parent is a daisyUI "menu" list */}
        {/* Link to the /Dashboard route — navigates to the Dashboard page on click */}
        <li><Link href="/Dashboard" >Dashboard</Link></li>
        {/* Link to the root route "/" — navigates back to the Home page on click */}
        <li><Link href="/" >Home</Link></li>
      </>
    );

    // Return the JSX markup that makes up the navbar UI
    return (
      // Root container — daisyUI "navbar" layout class, "bg-base-100" sets the theme
      // background, and "shadow-sm" adds a subtle drop shadow below the bar
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left section of the navbar — holds the mobile hamburger button and brand name */}
        <div className="navbar-start">
          {/* Dropdown wrapper — daisyUI "dropdown" enables the open/close toggle behavior */}
          <div className="dropdown">
            {/* The dropdown trigger — only visible below the lg breakpoint (mobile/tablet);
                tabIndex={0} makes it focusable so clicking/tapping toggles the dropdown,
                role="button" + "btn btn-ghost" style it as a borderless ghost button */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              {/* Hamburger menu icon — inline SVG (24x24 viewBox, no fill, stroke uses
                  currentColor); aria-label="Menu" tells screen readers what the icon does */}
              <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              {/* Close the dropdown trigger */}
            </div>
            {/* The dropdown menu panel — appears when the trigger is focused;
                "menu-sm" = small menu sizing, "dropdown-content" = positioned as the panel,
                "bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow" = theme background,
                rounded corners, stacked above page content, margin, width, padding, shadow */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {/* Render the shared nav links fragment (Dashboard + Home) in the mobile menu */}
              {links}
              {/* Close the dropdown menu list */}
            </ul>
          {/* Close the dropdown wrapper */}
          </div>
          {/* Brand/site name — styled as a large ghost button that also links back to Home */}
          <Link className="btn btn-ghost text-xl" href="/">daisyUI</Link>
        {/* Close the navbar-start (left) section */}
        </div>
        {/* Center section — "hidden lg:flex" means it only shows on large screens;
            this is the desktop version of the menu (mobile uses the dropdown instead) */}
        <div className="navbar-center hidden lg:flex">
          {/* Horizontal menu list — daisyUI "menu menu-horizontal" lays the links in a row */}
          <ul className="menu menu-horizontal px-1">
            {/* Render the same shared links fragment (Dashboard + Home) on desktop */}
            {links}
          {/* Close the desktop menu list */}
          </ul>
        {/* Close the navbar-center (center) section */}
        </div>
        {/* Right section of the navbar — reserved for actions like a login button */}
        <div className="navbar-end">
          {/* Placeholder action button — a plain daisyUI button (currently does nothing) */}
          <a className="btn">Button</a>
        {/* Close the navbar-end (right) section */}
        </div>
      {/* Close the root navbar container */}
      </div>
    );
};

// Export the component as the default export so it can be imported into layouts/pages
export default Navbar;
