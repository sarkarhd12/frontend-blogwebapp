Blog Application Frontend

This is the frontend of a blog application built with React and various libraries. It allows users to view, create, update, and delete blog posts, as well as manage categories and images.
Features

    Home Page: Display all posts with titles and content summaries.
    Login & Signup: Allows users to log in and create new accounts.
    Dashboard: Private area where users can manage their posts.
    Post Creation: Users can create new blog posts with titles, content, categories, and images.
    Post Update: Edit existing posts with new content, titles, and images.
    Categories: Filter posts by categories.
    Post Deletion: Delete posts from the dashboard.

Technologies Used

    React: For building the user interface.
    React Router: For handling routing between pages.
    Reactstrap: For responsive UI components.
    Jodit Editor: For rich text editor functionality (post content).
    Axios: For API requests.
    React Toastify: For notifications.
    Bootstrap: For styling and responsive design.

Setup

To run the project locally, follow these steps:

    Clone the repository:

git clone https://github.com/sarkarhd12/frontend-blogwebapp.git

Navigate into the project folder:

cd blog-frontend

Install dependencies:

npm install

Run the development server:

    npm start

    The application will be available at http://localhost:3000.

Folder Structure

    src/: Contains the main frontend code.
        components/: Reusable UI components (e.g., buttons, cards).
        pages/: Pages like Home, Login, Signup, PostPage, etc.
        services/: API calls for creating, updating, and fetching posts.
        user-routes/: Private routes for managing user-specific content (e.g., Dashboard, Profile).
        auth/: Handles authentication and user details.

Dependencies

    react-router-dom: For navigation.
    reactstrap: For UI components like buttons, forms, etc.
    react-toastify: For displaying toast notifications.
    axios: For HTTP requests.
    jodit-react: For rich text editor.
    bootstrap: For responsive design.