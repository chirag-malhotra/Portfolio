# Chirag Malhotra Portfolio

A modern, responsive personal portfolio website built with **React 19**, **TypeScript**, **Redux Toolkit**, **Vite**, and a custom lightweight i18n system. Designed for a frontend developer with 5.5+ years of production experience.

## Tech Stack

- **Build Tool:** Vite
- **Framework:** React 18+ with TypeScript
- **State Management:** Redux Toolkit
- **Styling:** SASS (mobile-first, fully responsive)
- **Internationalization:** Custom Context + JSON (English & Spanish)
- **Routing:** React Router (SPA with anchor links)
- **Testing:** Jest + React Testing Library (unit tests), Cypress (E2E)
- **Deployment:** Vercel-ready (standard Vite build output)

## Features

- 🎨 **Theme Toggle** (light/dark) managed by Redux
- 🌍 **Language Switching** (English/Spanish) via Context API
- 📱 **Fully Responsive** design (mobile-first)
- ♿ **Accessible** (WCAG 2.1 compliant, keyboard navigation, focus states)
- 🎯 **Skill Filtering** by category (Redux state)
- 📋 **Contact Form** with client-side validation (Redux state)
- ⚡ **Fast** (Vite build, optimized assets)
- 🧪 **Well-Tested** (unit + E2E tests)

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Summary.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── AwardsSection.tsx
│   │   │   └── ContactSection.tsx
│   ├── features/
│   │   ├── theme/
│   │   │   └── themeSlice.ts
│   │   ├── nav/
│   │   │   └── navSlice.ts
│   │   ├── contactForm/
│   │   │   └── contactFormSlice.ts
│   │   └── skillFilter/
│   │       └── skillFilterSlice.ts
│   ├── i18n/
│   │   ├── I18nContext.tsx
│   │   └── translations/
│   │       ├── en.json
│   │       └── es.json
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── store.ts
│   ├── index.css
│   └── setupTests.ts
├── cypress/
│   ├── e2e/
│   │   └── homepage.cy.ts
│   └── support/
│       └── e2e.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── jest.config.js
├── cypress.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The app opens at `http://localhost:5173`.

### Build for Production

Generate an optimized production build:

```bash
npm run build
```

Output is in the `dist/` folder. This is ready for Vercel deployment.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

## Testing

### Unit Tests (Jest + React Testing Library)

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

#### Tested Components

- **ContactSection**: Form submission, validation, error messages
- **Navigation (LanguageSwitcher)**: Language switching, locale updates

### E2E Tests (Cypress)

Open Cypress test runner:

```bash
npm run cypress:open
```

Run E2E tests headlessly:

```bash
npm run cypress:run
```

#### Test Coverage

- Homepage loads successfully
- All main sections render
- Language switcher (English ↔ Spanish)
- Contact form validation
- Theme toggle (light ↔ dark)
- Skill category filtering

## Internationalization (i18n)

The custom i18n system uses **React Context + JSON** files for a lightweight, maintainable solution.

### Translation Files

- `src/i18n/translations/en.json` — English translations
- `src/i18n/translations/es.json` — Spanish translations

### Adding a New Language

1. Create `src/i18n/translations/[locale].json` (e.g., `fr.json` for French)
2. Copy the structure from `en.json`
3. Translate all strings
4. Update `I18nContext.tsx`:
   ```typescript
   const translations: Record<Locale, typeof en> = {
     en,
     es,
     fr, // Add here
   }

   export type Locale = 'en' | 'es' | 'fr' // Add here
   ```
5. Import the new translation file:
   ```typescript
   import fr from './translations/fr.json'
   ```

### Using Translations in Components

```typescript
import { useI18n } from '../i18n/I18nContext'

const MyComponent = () => {
  const { t, locale, setLocale } = useI18n()

  return (
    <div>
      <h1>{t('hero.name')}</h1>
      <p>{t('summary.content')}</p>
    </div>
  )
}
```

## Redux State Management

Redux Toolkit slices manage:

### 1. **Theme Slice** (`src/features/theme/themeSlice.ts`)
   - **State:** `mode: 'light' | 'dark'`
   - **Actions:** `toggleTheme()`, `setTheme(mode)`
   - **Usage:** Layout and Navigation components

### 2. **Navigation Slice** (`src/features/nav/navSlice.ts`)
   - **State:** `activeSection: SectionId`
   - **Actions:** `setActiveSection(id)`
   - **Usage:** Scroll spy (future enhancement)

### 3. **Contact Form Slice** (`src/features/contactForm/contactFormSlice.ts`)
   - **State:** Form fields, errors, submission status, messages
   - **Actions:** `setField()`, `setErrors()`, `setSubmitting()`, `resetForm()`
   - **Usage:** ContactSection component

### 4. **Skill Filter Slice** (`src/features/skillFilter/skillFilterSlice.ts`)
   - **State:** Selected skill categories
   - **Actions:** `toggleCategory()`, `resetFilter()`
   - **Usage:** SkillsSection component

## Styling

### SASS Architecture

- **Global Styles:** `src/index.css` (variables, reset, typography)
- **Component SCSS:** Each component has a `.scss` module
- **Mobile-First:** Responsive breakpoints at 640px, 768px, 1024px

### Theme Variables

Light mode:
```css
--bg-primary: #f8fafc;
--bg-secondary: white;
--text-primary: #111827;
--text-secondary: #334155;
--border-color: #e2e8f0;
--accent: #4f46e5;
```

Dark mode:
```css
--bg-primary: #0f172a;
--bg-secondary: #1e293b;
--text-primary: #f1f5f9;
--text-secondary: #cbd5e1;
--border-color: #334155;
--accent: #6366f1;
```

### Accessibility

- ✅ Respects `prefers-reduced-motion`
- ✅ Visible focus states on all interactive elements
- ✅ Semantic HTML (`<section>`, `<nav>`, `<footer>`)
- ✅ Form labels properly associated with inputs
- ✅ Color contrast meets WCAG AA

## Linting

Run ESLint:

```bash
npm run lint
```

## Deployment to Vercel

### Option 1: Connect Git Repository

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects the Vite build settings
6. Deploy

### Option 2: CLI Deployment

Install Vercel CLI:

```bash
npm i -g vercel
```

Deploy:

```bash
vercel
```

### Vercel Configuration (Optional)

Create a `vercel.json` file for custom settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Environment Variables

None required for the current setup. If you add backend integrations (e.g., email service), create a `.env` file:

```
VITE_API_URL=https://api.example.com
```

Access in components:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Performance

- **Vite HMR:** Instant hot reloads during development
- **Code Splitting:** Automatic via Vite + React lazy loading
- **CSS Modules:** Scoped styles prevent conflicts
- **Production:** Minified, tree-shaken bundle (~50KB gzip)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

## Accessibility Checklist

- [x] Keyboard navigation (Tab, Shift+Tab, Enter)
- [x] Focus rings on interactive elements
- [x] Semantic HTML structure
- [x] Form validation with error messages
- [x] Responsive design (mobile-first)
- [x] Color contrast > 4.5:1
- [x] `prefers-reduced-motion` respected
- [x] ARIA labels where appropriate

## Future Enhancements

- [ ] Blog section with Markdown support
- [ ] Dark mode color scheme refinement
- [ ] Project showcase with image galleries (lazy-loaded)
- [ ] Social media feed integration
- [ ] Backend contact form submission (Formspree, SendGrid, etc.)
- [ ] Analytics (Vercel Web Analytics)
- [ ] Google Lighthouse performance improvements
- [ ] More languages (French, German, etc.)

## Troubleshooting

### "Module not found" errors

Ensure all imports are correct and the file exists. Check:
- Import paths are relative
- File extensions are included (`.tsx`, `.scss`, etc.)

### Styling not applying

- Verify SCSS file is imported in component
- Check CSS variable values in `src/index.css`
- Clear browser cache if needed

### Tests failing

- Ensure setup is complete: `npm install`
- Run: `npm test -- --clearCache`
- Check test file paths match component paths

### Hot reload not working

Restart the dev server:

```bash
npm run dev
```

## License

This project is personal to Chirag Malhotra. Please respect copyright.

## Contact

**Chirag Malhotra**  
📧 [chiragmalhotra3098@gmail.com](mailto:chiragmalhotra3098@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/chiragmalhotra)  
💻 [GitHub](https://github.com/chiragmalhotra02)  
📞 +91 9953537746

---

**Built with ❤️ using React, TypeScript, and Redux Toolkit**
