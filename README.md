# User Management CRUD Application

A modern, extensible React application built with TypeScript for managing user data. Features a configuration-driven architecture that makes adding new fields incredibly simple.

## 🚀 Live Demo

[Live Application URL] - https://symphonious-pavlova-5fef29.netlify.app

## 📋 Features

- ✅ Full CRUD Operations (Create, Read, Update, Delete)
- ✅ Form validation with comprehensive error messages
- ✅ Responsive Material-UI design
- ✅ Configuration-driven form fields for easy extensibility
- ✅ TypeScript for type safety
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Mock API with JSON Server
- ✅ Confirmation dialogs for destructive actions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Form Management**: React Hook Form
- **API Client**: Axios
- **Mock API**: JSON Server
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd react-crud-app
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Mock API Server

In a separate terminal, run:

```bash
npm run server
```

This starts the JSON Server on `http://localhost:3001`

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🎯 How to Use

1. **Add User**: Click the "Add User" button to create a new user
2. **View Users**: All users are displayed in a responsive grid
3. **Edit User**: Click the edit icon on any user card
4. **Delete User**: Click the delete icon and confirm the deletion

## ✨ Adding New Fields (Extensibility Guide)

The application is designed to be highly extensible. Adding new fields requires changes in only TWO files:

### Step 1: Update the User Type

Edit `src/types/user.ts`:

```typescript
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  
  // Add your new fields here:
  dateOfBirth?: string;  // Example
  address?: string;       // Example
}
```

### Step 2: Update the Form Configuration

Edit `src/config/formConfig.ts`:

```typescript
export const formFieldsConfig: FieldConfig[] = [
  // ... existing fields ...
  
  // Add new field configuration:
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    validation: {
      required: false,
    },
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter address',
    multiline: true,
    validation: {
      required: false,
      maxLength: 200,
      message: 'Address must not exceed 200 characters',
    },
  },
];
```

### That's it! 🎉

The form will automatically:
- ✅ Render the new fields
- ✅ Apply validation rules
- ✅ Handle the data in create/update operations
- ✅ Display the data in the user cards (you may want to update UserCard.tsx for custom display)

### Field Configuration Options

```typescript
{
  name: 'fieldName',           // Must match User interface property
  label: 'Display Label',      // Shown above the input
  type: 'text' | 'email' | 'tel' | 'date' | 'textarea',
  placeholder: 'Optional placeholder',
  multiline: true,             // For textarea fields
  validation: {
    required: true/false,
    pattern: /regex/,          // Custom regex pattern
    minLength: number,
    maxLength: number,
    message: 'Custom error message',
  },
}
```

## 📁 Project Structure

```
react-crud-app/
├── src/
│   ├── components/
│   │   ├── UserForm.tsx       # Configuration-driven form component
│   │   ├── UserCard.tsx       # User display card
│   │   └── UserList.tsx       # Grid layout for users
│   ├── config/
│   │   └── formConfig.ts      # ⭐ Central field configuration
│   ├── services/
│   │   └── api.ts             # API service layer
│   ├── types/
│   │   └── user.ts            # TypeScript interfaces
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── db.json                     # JSON Server database
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🚀 Deployment

### Netlify Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up environment variables if needed

### Vercel Deployment

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 🎨 Design Decisions

### 1. Configuration-Driven Architecture
- All form fields are defined in a central configuration file
- Reduces code duplication and makes the app highly maintainable
- New fields can be added without touching component logic

### 2. TypeScript
- Provides type safety and better developer experience
- Catches errors at compile time
- Makes refactoring safer and easier

### 3. React Hook Form
- Efficient form management with minimal re-renders
- Built-in validation support
- Better performance than controlled components for large forms

### 4. Material-UI
- Professional, consistent design system
- Responsive out of the box
- Excellent accessibility support

### 5. Separation of Concerns
- Clear separation between UI, business logic, and configuration
- Service layer abstracts API calls
- Components are focused and reusable

## 📝 Assumptions

1. **API**: Uses JSON Server for mock API (localhost:3001)
2. **Validation**: Basic client-side validation; assumes server has additional validation
3. **Authentication**: Not implemented (would be added based on requirements)
4. **Browser Support**: Modern browsers (ES6+ support required)
5. **Mobile**: Responsive design with mobile-first approach

## 🧪 Testing the API

The mock API runs on `http://localhost:3001/users`

You can test it directly:

```bash
# Get all users
curl http://localhost:3001/users

# Create a user
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","phoneNumber":"1234567890","email":"john@example.com"}'
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📧 Contact

For questions or feedback, please email: [your-email@example.com]

## 📄 License

MIT License - Feel free to use this project for learning and commercial purposes.

---

**Built with ❤️ using React, TypeScript, and Material-UI**
