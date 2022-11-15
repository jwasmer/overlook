# 🏨  The Grand Overlook  🏨


## Table of Contents
  - [Introduction](#introduction)
  - [Project Specs](#project-specs)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Deployed Page](#deployed-page)
  - [Possible Future Extensions](#possible-future-extensions)
  - [Set Up](#set-up)
  - [Organizational Resources](#organizational-resources)
  - [Contributors](#contributors)
  - [Challenges](#challenges)



## Introduction
  The user will be shown a login page before entering the site. The username must be "customer50" (the number 50 can be replaced with any valid user id, currently only 1-50 are valid user ids), and the password is "overlook2021".

  <img width= "1425" alt="Screenshot of user login page" src="https://user-images.githubusercontent.com/110298370/201963353-bdcf155d-b565-4902-9d8c-fc736863c72c.png">
  
  Upon entering the correct credentials, the user will be shown a dashboard page containing a calendar widget and can search for available rooms based on the date selected in the widget. The user is offered an additional option to filter based on room type. Additionally, they can click on a "View Bookings" menu to display a history of all bookings they've made at the Grand Overlook. The top righthand corner of the page displays a small "Welcome, user!" message.

  <img width= "1425" alt="Screenshot of user dashboard" src="https://user-images.githubusercontent.com/110298370/201963475-2da38144-7d37-4dad-91a0-0fdd8e436722.png">

  Upon submitting their search, a user will be shown a list of rooms organized by room type. They can click a room, enabling the "Select Button" and updating it to a "Book Now" button. Clicking "Book Now" will save their booking and display a confirmation popup.

  <img width= "1425" alt="Screenshot of user dashboard" src="https://user-images.githubusercontent.com/110298370/201964419-6584a03e-0bfc-4ba7-9d33-1fbcc6b4c81d.png">


## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/overlook.html)


## Technologies
  - Javascript
  - HTML
  - CSS
  - Mocha/Chai 
  - Webpack
  - API
  - Flatpickr
  

## Features
- This project features API fetches to collect data on users, bookings, hotel room types, and to save new user bookings.
- Users can search for available bookings, save bookings, and the vacancy is removed from future searches.
- A user can review their own bookings.


## Deployed Page
- This project is currently not deployed, please see Set Up instructions below for directions on running this project locally!


## Possible Future Extensions
  - Include "Manager" functionality from project spec.
  - GitHub Pages integration


## Set Up
1. Fork this repo  
2. Clone the repo to your local machine
3. In your terminal, run - `npm install`
4. View the project by starting the server by running `npm start` and view at  http://localhost:8080/


## Contributors
  - [James Wasmer](https://github.com/jwasmer)
  - [Zachary Walters](https://github.com/zacwalters4) (Reviewer)


## Challenges
This was a relatively tight timeline. Unfortunately, some features had to be cut from the final product.
- "Manager" iteration would been done at the expense of improving error handling and updating class tests
- Focusing on page accessibility required a rework of the select-a-room functionality that displays after a date is searched. Properly updating the HTML to render elements tab-friendly ate up a much larger amount of time than I had budgeted.
- Building proper error handling feels resource-intensive for the relatively low incidence it will be used. It's very impactful when it is needed, but it's taken more time than expected.


## Wins
I was expecting working with API calls to be more problematic. Something clicked between my previous project and this project, though, and building the API calls was almost entirely pain-free.
 
