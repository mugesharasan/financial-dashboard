## Finoscale Financial Dashboard
A high-fidelity financial data visualization tool built to replicate the Fleming Laboratories Limited assets dashboard. This application features a dynamic tabular layout, Indian numbering system formatting, and a real-time data entry system for latest-year financials.

## Quick Setup
Follow these steps to get the project running locally:

Clone the repository (or extract the files):

Bash
git clone <your-repo-link>
cd financial-assets
Install Dependencies:

Bash
npm install
npm install lucide-react
Run the Development Server:

Bash
npm run dev
View the App:
Navigate to http://localhost:5173 in your browser.

## Tech Stack
Framework: Vite + React.js

Styling: Tailwind CSS (Custom deep-purple theme: #432a61)

Icons: Lucide-React (Exact match for Sidebar and Nav icons)

Data Handling: JSON-based state management for standalone financial reporting

## Project Structure
Plaintext
financial-assets/
├── public/
├── src/
│   ├── components/
│   │   ├── FinancialTable.jsx   # Main layout, Sidebar, and Nav logic
│   │   └── AddYearModal.jsx    # Popup form for 31 MAR 2025 entry
│   ├── data/
│   │   └── financials.json      # Core financial data (2019-2024)
│   ├── styles/
│   │   └── TableStyles.css      # Branding, alignment, and typography
│   ├── App.jsx                  # Main entry component
│   └── main.jsx                 # Vite bootstrap file
├── package.json
└── README.md


## Key Features
Dynamic Data Entry: "Add Latest Year Financials" button opens a modal to capture 31 MAR 2025 data.

Indian Numbering System: All values are automatically formatted (e.g., 46,71,71,000.00).

Complete Asset Mapping: Covers Tangible Assets, Capital WIP, Inventories, Trade Receivables, and Cash & Bank Balances.

Sidebar & Navigation: Exact replication of the Finoscale branding, including the menu toggle and user profile icons.

## Assumptions & Notes
Persistence: Data added through the modal is stored in the application state. It will persist during the session but reset on a browser refresh as no backend was required.

Calculations: The application automatically sums individual assets to generate Total Current Assets and the Total Assets grand footer.

Design: The deep purple color scheme (#432a61) is applied globally to match the provided reference design.

## License
This project was developed for the Fleming Laboratories Limited financial assets section. All rights reserved.
