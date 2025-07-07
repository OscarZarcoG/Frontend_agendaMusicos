# Agenda Músicos - Frontend

This is the frontend for the Agenda Músicos application, a web platform designed to help musicians manage their gigs, clients, and contracts efficiently.

## ✨ Features

- **Dashboard:** An overview of upcoming events, recent activity, and key statistics.
- **Gig Management:** Create, view, update, and delete gigs.
- **Client Administration:** Manage client information and contact details.
- **Contract Generation:** Automatically generate contracts for gigs in DOCX and PDF formats.
- **User Authentication:** Secure login and registration system.
- **Responsive Design:** A clean and modern user interface that works on all devices.

## 🚀 Technologies

This project is built with the latest web technologies to ensure a high-quality user experience and maintainable codebase.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## 📂 Project Structure

The project follows a standard Next.js `app` directory structure:

```
/src
├── app/              # Main application routes and pages
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API helpers
├── services/         # API service definitions
├── types/            # TypeScript type definitions
└── utils/            # General utility functions
```

## ⚙️ Environment Setup

To get the development environment running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oscar-rs/agenda-musicos-frontend.git
    cd agenda-musicos-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables, such as the API endpoint:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Lints the code to catch errors.

## 👤 Author

-   **Oscar R. S.**
-   **GitHub:** [oscar-rs](https://github.com/oscar-rs)