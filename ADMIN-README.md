# Menu Admin Dashboard

This extension to the Online Menu project adds a secure admin dashboard for managing menu items directly from the Google Sheets data source.

## Features

- **Secure Authentication**: Protected admin area with username/password login
- **CRUD Operations**: Create, read, update, and delete menu items
- **Direct Google Sheets Integration**: Changes in the admin panel update your Google Sheet in real-time
- **Responsive Design**: Works well on both desktop and mobile devices

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Google Sheets API**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Sheets API
   - Create a service account
   - Download the JSON key file
   - Share your Google Sheet with the service account email address

3. **Configure environment variables**:
   Edit the `.env.local` file with your credentials:
   ```
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret_here

   # Admin credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secure_password_here

   # Google Sheets configuration
   SPREADSHEET_ID=your_spreadsheet_id_from_url
   GOOGLE_CLIENT_EMAIL=from_your_service_account_json
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from service account JSON\n-----END PRIVATE KEY-----\n"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the admin dashboard**:
   Open your browser and navigate to:
   ```
   http://localhost:3000/admin/login
   ```

## Google Sheets Format

For proper integration, your Google Sheet should have the following columns:
- id (optional, will be auto-generated if missing)
- name
- category
- description
- description2 (optional)
- price
- image (optional)
- allergens (optional, semicolon-separated)
- isvegetarian (yes/no)
- preptime (optional)
- popular (yes/no)
- agerestricted (yes/no)

## Security Notes

- Change the default admin username and password in `.env.local`
- Generate a strong random string for `NEXTAUTH_SECRET`
- Keep your Google service account credentials secure
- In production, consider using environment variables from your hosting platform rather than `.env.local` files
