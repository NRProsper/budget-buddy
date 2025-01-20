# Budget Buddy

Budget Buddy is a full-stack budget management application built with **Next.js** for the frontend and a hosted backend. It allows users to create accounts, manage transactions, and track expenses seamlessly. Whether it's a bank account, mobile money account, or savings account, Budget Buddy helps users stay on top of their finances.

![Budget Buddy Screenshot](https://via.placeholder.com/800x400) <!-- Add a screenshot of your app here -->

---

## Features

- **Account Management**:
    - Create different types of accounts (e.g., Bank Account, Mobile Money, Savings).
    - View account balances and details.
    - Top up accounts and record expenses.

- **Transaction Tracking**:
    - View all transactions for each account.
    - Filter transactions by date, type, or category.

- **Expense Categories**:
    - Create and manage custom expense categories.
    - Categorize transactions for better budgeting.

- **User-Friendly Interface**:
    - Clean and intuitive UI for easy navigation.
    - Responsive design for both desktop and mobile devices.

- **Reports and Analytics**:
  - Visual charts and graphs for expense tracking. 
  - Provide insights into spending habits.

- **Authentication**:
    - Secure user authentication and authorization.
    - Protected routes for authenticated users only.

---

## Live Demo

Check out the live version of Budget Buddy:  
👉 [https://budget-buddy-azure-eight.vercel.app/](https://budget-buddy-azure-eight.vercel.app/)

---

## Technologies Used

- **Frontend**:
    - Next.js (React framework)
    - Tailwind CSS (for styling)
    - React Hook Form (for form management)
    - React Query (for data fetching and state management)
    - Zod (for schema validation)
    - recharts (for Reports and Analytics)

- **Backend**:
    - Hosted backend (Sprinboot on Render) (API endpoints for accounts, transactions, and categories)
    - Axios (for API requests)

- **Authentication**:
    - JWT (JSON Web Tokens) for secure user authentication.

- **Deployment**:
    - Vercel (for frontend hosting)

---

## Getting Started

### Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/budget-buddy.git
   cd budget-buddy

2. **Install dependencies:**
    ```bash
   npm install

3. **Run the development server:**
    ```bash
   npm run dev

4. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

   **Note**: The app uses production environment variables (e.g., hosted backend API). Running it locally may not work unless you set up a local backend or update the environment variables.