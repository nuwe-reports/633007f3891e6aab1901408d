# RICK and MORTY APP

An app to navigate trough the characters from this TV show, get the basic info and select your favorite ones.

This project is the Talent Squad's frontend challenge driven by Barcelona Digital Talent.

## Badges

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## API/Component

This app get the data from the [The Rick and Morty API](https://rickandmortyapi.com/)

Uses [The Movie App](https://github.com/vivitt/Movie_APP) as API for user registration and login

#### Page structure

##### Home '/'

- register new user
- login registered user

##### characters '/chars'

- get the characters from https://rickandmortyapi.com/api/character/?page=1
- paginate the results
- show a small view of each character
- show a big view of clicked character with a link to the Details page

##### Details '/chars/:id'

- get the one character info from https://rickandmortyapi.com/api/character/:id
- show character's details

##### 404 Not found '/anything-else'

- render a 404 page to mismatched urls

## Installation

npm i

npm start

## Stack

This app was made with **React** and **MUI**

**Axios** on the data request

**SASS** to write stylesheets
