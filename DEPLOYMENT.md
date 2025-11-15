# UCF Event Planning Guide - Deployment Instructions

## Quick Start

### 1. Add the UCF Tab Image

Copy your UCF tab image to the project:

```bash
# Copy the image file to assets/images/
cp /Users/christyd.shell/Downloads/PrimaryMark_TheTab/Tab-ForDigital/TheTab_KGrgb_300ppi.png assets/images/ucf-tab.png
```

The website is already configured to use `assets/images/ucf-tab.png`.

### 2. Install Dependencies

```bash
npm install
```

### 3. Test Locally

Run a local development server:

```bash
npm run dev
```

This will start a server at http://localhost:8080. Open your browser and test:

- **Navigation:** Click through all 9 tabs to ensure they load correctly
- **Budget Calculator:**
  - Add budget items
  - View the chart
  - Export to Excel
  - Test localStorage (refresh page and items should persist)
- **Responsive Design:** Test on mobile/tablet views
- **Links:** Verify all external UCF links open correctly

### 4. Deploy to GitHub Pages

#### Option A: Using npm Script

```bash
npm run deploy
```

This will deploy the current directory to GitHub Pages using the `gh-pages` branch.

#### Option B: Manual GitHub Pages Setup

1. Go to your GitHub repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select:
   - Branch: `claude/init-project-01RCswYyW4spqE57GVz1HyEL` (or merge to main first)
   - Folder: `/ (root)`
4. Click "Save"
5. Wait a few minutes for deployment
6. Your site will be available at: `https://[username].github.io/Week-12_UCF-Events-Webguide/`

## Post-Deployment Checklist

After deploying, verify:

- [ ] All 9 module pages load correctly
- [ ] UCF Tab logo displays properly
- [ ] Budget Calculator functions work
  - [ ] Add items
  - [ ] View chart
  - [ ] Export to Excel
- [ ] All external links open correctly
- [ ] Navigation tabs work on mobile
- [ ] Animations display smoothly
- [ ] No console errors in browser DevTools

## Updating Content

### To Update Links, Venues, or Hotels

Edit the CSV files in the `data/` directory:

- `data/links.csv` - External UCF resource links
- `data/venues.csv` - Venue information
- `data/hotels.csv` - Hotel recommendations
- `data/best-practices.csv` - Best practice tips

After editing, commit and push:

```bash
git add data/
git commit -m "Update venue/hotel/link information"
git push
```

Then redeploy to GitHub Pages.

### To Update Module Content

Edit the HTML files in `modules/` directory:

```bash
# Example: updating the budgeting module
nano modules/budgeting.html

git add modules/budgeting.html
git commit -m "Update budgeting module content"
git push
```

### To Update Styles

Edit the CSS files in `assets/css/`:

- `main.css` - Global styles
- `animations.css` - Animation definitions
- `components.css` - Reusable components

## Troubleshooting

### Images Not Loading on GitHub Pages

If the UCF tab image doesn't show after deployment:

1. Verify the image is in `assets/images/ucf-tab.png`
2. Check the image file name matches exactly (case-sensitive)
3. Clear browser cache and refresh

### Budget Calculator Not Working

1. Check browser console for JavaScript errors
2. Verify SheetJS library is loading from CDN
3. Test in a different browser
4. Check localStorage is enabled in browser

### Module Pages Not Loading

1. Verify all HTML files are in the `modules/` directory
2. Check file names match the data-tab attributes in index.html
3. Look for JavaScript errors in browser console

### CSV Data Not Loading

1. Verify CSV files are properly formatted
2. Check for syntax errors in CSV files
3. Ensure CSV files are in the `data/` directory
4. Test the csvLoader.js utility

## Browser Compatibility

Tested and compatible with:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images:** If adding more images, compress them before uploading
2. **CDN Libraries:** All third-party libraries (Chart.js, SheetJS, AOS) load from CDN
3. **Caching:** GitHub Pages automatically caches static assets
4. **Minimize Changes:** Only redeploy when necessary to minimize build times

## Security Notes

- No backend or database - static site only
- All user data (budgets) stored in browser localStorage only
- No sensitive information collected
- All external links open in new tabs with `rel="noopener"`

## Future Enhancements

Features that could be added later:

1. **Timeline Builder Tool** - Interactive event timeline creator with Excel export
2. **Catering Menu Builder** - Interactive catering selection tool
3. **Checklist Generator** - Customizable event planning checklists
4. **Dark Mode** - Toggle for dark/light theme
5. **Print Styles** - Optimized printing for guides
6. **Search Functionality** - Search across all modules
7. **Feedback Form** - Collect user feedback

## Support

For questions or issues with this website:

1. Check this deployment guide
2. Review the README.md
3. Consult the CLAUDE.md file for development guidance
4. Contact the web development team

## License

MIT License - See LICENSE file for details

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Deployed By:** UCF Event Planning Team
