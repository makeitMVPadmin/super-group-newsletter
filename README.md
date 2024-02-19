Welcome to the MakeItMVP Launch Academy SuperGroup Repository! This repository is designed to provide new junior/entry developers with a structured starting point for their assigned projects. It's built using React, Javascript, and Sass to help you get up and running quickly and familiarize yourself with what has been implemented based on Phases.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started
To begin working on your project, follow these steps:
1. Clone this repository to your local machine:
   ```bash
   git@github.com:makeitMVPadmin/super-group-newsletter.git
   ```
   
2. Change your working directory to the cloned repository:
   ```bash
   cd super-group-newsletter
   ```
3. Then change again into your working directory:
   ```bash
   cd super-group-newsletter
   ``` 
4. Open the repository in your code editor 
   ```bash
   code .
   ```
5. Make sure that you're in the develop branch. Switch from the main branch to develop branch to see the current work in progress. (as of Phase 2)
   ```bash
   git checkout develop
   ``` 
6. Before installing dependencies, make sure to create a .env file within the project directory. This is where your FireBase keys will be stored in order to access the database. Please ask for the keys from your lead developer and add them in your .env file using this format:
 ```.env
   REACT_APP_FIREBASE_API_KEY=""
   REACT_APP_FIREBASE_AUTH_DOMAIN=""
   REACT_APP_FIREBASE_PROJECT_ID=""
   REACT_APP_FIREBASE_STORAGE_BUCKET=""
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
   REACT_APP_FIREBASE_APP_ID=""
   REACT_APP_FIREBASE_MEASUREMENT_ID=""
   REACT_APP_CLERK_PUBLISHABLE_KEY="" (This will be your OpenAI API key)
   ```
7. Install the project dependencies:
  ```bash
   npm install
   ```
8. Start the development server: 
  ```bash
   npm start
   ```
9. Open your web browser and navigate to `http://localhost:3000` to see your project running.

10. Some of the possible routes:
-  `http://localhost:3000/landing` The landing page for the Webpage
-  `http://localhost:3000/newsEditor` The editor for the newsletter

11. Before making any changes to the code, please make sure to create your own branch by following Git Version Control protocols.

## Project Structure
Now you're ready to start building upon the project using the provided structure!

## Project Structure

The project structure is organized as follows:

```
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── ...
│   ├── styles/
│   │   ├── main.css
│   │   ├── ...
│   ├── index.js
├── public/
│   ├── index.html
│   ├── ...
├── package.json
├── README.md
```
- `src/` Contains the main source code for your project, including React components and styles.
- `public/` Contains static assets and your project's HTML template.
- `package.json` Defines project dependencies and scripts.

Feel free to customize the project structure to fit your specific project requirements.

## Technologies

This starter repository uses the following technologies:

- React: A JavaScript library for building user interfaces.
- CSS for styling and design of the webpage.
- Firebase: Cloud storage database 

You can expand upon these technologies as needed for your project.

## Contributing

We welcome contributions from the community. If you have suggestions or improvements for this starter repository, please open an issue or create a pull request. For more information on how to contribute, check our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).
