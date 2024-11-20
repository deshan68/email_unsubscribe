
This is a simple open-source application that helps you discover and manage unsubscribe links from your email inbox. It connects to your email (currently supporting Gmail) and fetches all emails with unsubscribe links. The application displays the unsubscribe links in a neat table and allows you to visit them directly.

This application is built using **React**, **TypeScript**, **Tailwind CSS**, and a **FastAPI** backend.

---

## Features

- **Fetch unsubscribe links** from your inbox.
- **Table View**: Displays a list of emails with unsubscribe links.
- **Visit Links**: A button for each link to visit and unsubscribe.
- **Open-source project**: You can contribute to the project on GitHub.

---

## Screenshot

<img width="1470" alt="Screenshot 2024-11-20 at 12 50 37 AM" src="https://github.com/user-attachments/assets/2ba9ad75-964e-4add-b78e-e5d61531b318">
<img width="1470" alt="Screenshot 2024-11-20 at 12 57 23 AM" src="https://github.com/user-attachments/assets/c212e279-a0a1-4dc3-9c4f-d0e518a930ef">
<img width="1470" alt="Screenshot 2024-11-20 at 12 57 37 AM" src="https://github.com/user-attachments/assets/f9ab6090-23a2-4c09-a051-4941c027c756">


_Above is a screenshot of the application in action._

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python
- **Email Service**: IMAP (Gmail)
- **Other**: Material-UI for UI components

---

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- Python (v3.7 or later)
- FastAPI
- IMAP email account (e.g., Gmail)

### Backend Setup (FastAPI)

1. Clone the repository:
    ```bash
    git clone https://github.com/deshan68/email_unsubscribe.git
    cd email_unsubscribe
    cd server
    ```

2. Install Python dependencies:
    ```bash
    pip install -r backend/requirements.txt
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend/` folder and add your email credentials:
    ```env
    EMAIL="your-email@example.com"
    PASSWORD="your-email-password"
    ```

4. Start the FastAPI server:
    ```bash
    uvicorn backend.main:app --reload
    ```

    The API should now be running at `http://localhost:8000`.

### Frontend Setup (React + Tailwind CSS)

1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install Node.js dependencies:
    ```bash
    npm install
    ```

3. Configure the API URL in `src/api.ts` to point to your FastAPI backend (default is `http://localhost:8000`):
    ```ts
    const API_URL = "http://localhost:8000";  // Ensure this is correct
    ```

4. Start the React development server:
    ```bash
    npm run dev
    ```

    The frontend should now be running at `http://localhost:3000`.

---

## How to Use

1. After starting both the backend and frontend servers, visit the React app at `http://localhost:3000`.
2. The application will automatically fetch the unsubscribe links from your email inbox.
3. You will see a list of emails with their unsubscribe links.
4. Click the "Visit" button to open the unsubscribe link in a new tab.

---

## Contributing

We welcome contributions, If you have suggestions or improvements, feel free to open an issue or submit a pull request.

To get started:

1. Fork the repository.
2. Clone your fork and create a new branch for your feature or bug fix.
3. Install the dependencies for both the backend and frontend (as mentioned in the installation section).
4. Make your changes and test them locally.
5. Submit a pull request!

---

## Contact

For any questions or feedback, feel free to open an issue on GitHub or contact the maintainer at arundeshan@gmail.com

---

## Acknowledgments

- **Tailwind CSS** - for utility-first styling.
- **FastAPI** - for the high-performance Python web framework.
- **React** - for building the user interface.
