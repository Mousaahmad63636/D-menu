# Online Menu - Professional Restaurant Menu Interface

A clean, modern, and fully responsive restaurant menu interface built with Next.js and Tailwind CSS. This is a view-only menu with no ordering functionality, designed for professional restaurant websites.

## Features

- **Professional Design**: Clean, modern interface with high-contrast typography
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Optimized loading with lazy loading images
- **Categories**: Organized menu with Appetizers, Main Courses, Desserts, and Beverages
- **Interactive Navigation**: Smooth category switching with keyboard support
- **Dietary Information**: Clear dietary restriction badges
- **Popular Items**: Highlighted popular menu items

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3.3
- **Font**: Inter (Google Fonts)
- **Images**: Placeholder images (easily replaceable)

## Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd "C:\Users\Mr. Ahmad\Desktop\Online menu"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
online-menu/
├── components/
│   ├── MenuHeader.js      # Restaurant header component
│   ├── MenuNav.js         # Category navigation
│   ├── MenuCategory.js    # Category display component
│   └── MenuItem.js        # Individual menu item component
├── data/
│   └── menuData.js        # Menu data and restaurant information
├── pages/
│   ├── _app.js           # Next.js app configuration
│   └── index.js          # Main menu page
├── styles/
│   └── globals.css       # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── README.md
```

## Customization

### Restaurant Information

Edit `data/menuData.js` to update:
- Restaurant name and description
- Location information
- Menu categories and items
- Pricing and dietary information

### Styling

The design uses a professional color palette defined in `tailwind.config.js`:
- Primary colors: Menu-gray (neutral grays)
- Accent color: Menu-accent (blue)
- Custom shadows and spacing

To customize the appearance:
1. Modify color values in `tailwind.config.js`
2. Update component styles in `styles/globals.css`
3. Adjust spacing and typography in individual components

### Images

Replace placeholder images in `menuData.js` with actual food photos:
- Recommended size: 400x300px or larger
- Formats: WebP, AVIF, or JPEG
- Optimize images for web before adding

## Accessibility Features

- **Keyboard Navigation**: 
  - Arrow keys to navigate between categories
  - Tab navigation through interactive elements
  - Enter/Space to activate buttons

- **Screen Reader Support**:
  - Semantic HTML structure
  - Proper heading hierarchy
  - Alt text for images
  - ARIA labels and roles

- **Visual Accessibility**:
  - High contrast ratios
  - Readable font sizes
  - Focus indicators
  - Responsive design

## Performance Optimizations

- **Image Optimization**: Lazy loading and Next.js Image component
- **CSS Optimization**: Tailwind CSS purging and minification
- **Code Splitting**: Next.js automatic code splitting
- **Font Loading**: Optimized Google Fonts loading
- **Caching**: Static generation for better performance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

This Next.js application can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting provider

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Menu Categories**: Add to `menuData.js`
2. **New Components**: Create in `components/` directory
3. **Styling**: Use Tailwind classes or add to `globals.css`
4. **Pages**: Add to `pages/` directory following Next.js conventions

## License

This project is for educational and commercial use. Feel free to modify and distribute.

## Support

For questions or issues:
1. Check the Next.js documentation
2. Review Tailwind CSS documentation
3. Inspect browser developer tools for debugging

---

**Note**: This is a view-only menu interface. No ordering functionality is included by design.
