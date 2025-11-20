# 📁 CSS Structure - Clean & Organized

Struktur CSS telah dipecah menjadi beberapa file terpisah untuk kemudahan maintenance dan organisasi yang lebih baik.

## 📂 File Structure

```
assets/css/
├── style.css          # Main file (imports semua)
├── base.css          # Variables, reset, layout dasar
├── components.css    # Navbar, buttons, cards
├── sections.css      # Hero, about, projects, skills
├── contact.css       # Contact form & social media
├── responsive.css    # Media queries & responsiveness
└── animations.css    # Animations & utilities
```

## 🎯 Breakdown by File

### **style.css** (Main Entry Point)
- Import semua file CSS lainnya
- File ini yang di-link di HTML

### **base.css** (Foundation)
- CSS Variables (colors, spacing, etc.)
- CSS Reset & normalize
- Base typography & layout
- Container & utility classes

### **components.css** (UI Components)
- Navbar & navigation
- Buttons & interactive elements
- Cards & containers
- Badges & labels

### **sections.css** (Page Sections)
- Hero section
- About section
- Projects grid
- Skills section
- Section headers & layouts

### **contact.css** (Contact & Social)
- Contact form styling
- Social media cards
- Platform-specific hover effects
- Form interactions

### **responsive.css** (Mobile First)
- Mobile navigation
- Responsive grid adjustments
- Mobile-specific layouts
- Breakpoint management

### **animations.css** (Motion & Effects)
- Scroll reveal animations
- Loading states
- Transition effects
- Keyframe animations

## ✨ Benefits

1. **Modular** - Each file has a specific purpose
2. **Maintainable** - Easy to find and edit styles
3. **Scalable** - Add new features in appropriate files
4. **Clean** - No duplicate code or unused styles
5. **Fast** - Browser can cache individual files

## 🔧 How to Use

1. Edit specific file untuk perubahan tertentu
2. Semua perubahan otomatis ter-import ke `style.css`
3. Tidak perlu ubah HTML - tetap link ke `style.css`

## 📝 Example Workflow

- Want to change colors? → Edit `base.css`
- Update navbar? → Edit `components.css` 
- Add new section? → Edit `sections.css`
- Fix mobile layout? → Edit `responsive.css`