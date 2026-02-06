# How to Embed ROI Calculator in Framer

## Option 1: Using the Standalone HTML File

1. **Upload the HTML file**:
   - Upload `roi-calculator-standalone.html` to your hosting (e.g., Netlify, Vercel, or your web server)
   - Make sure the ThriveFlows logo image is accessible at `/ThriveFlows-Logo.png`

2. **Embed in Framer using an iframe**:
   ```html
   <iframe
     src="https://your-domain.com/roi-calculator-standalone.html"
     width="100%"
     height="2000px"
     frameborder="0"
     scrolling="no"
     style="border: none; overflow: hidden;">
   </iframe>
   ```

## Option 2: Direct Embed Code for Framer

If you want to embed directly without hosting the file separately:

1. In Framer, add an **Embed** component from the Insert menu
2. Paste the entire contents of `roi-calculator-standalone.html` into the embed code field
3. Adjust the height of the embed component as needed (recommended: 2000-2500px)

## Option 3: Host on GitHub Pages (Free)

1. Create a new repository or use an existing one
2. Upload `roi-calculator-standalone.html` and rename it to `index.html`
3. Enable GitHub Pages in repository settings
4. Use the GitHub Pages URL in an iframe in Framer

## Customization

### Change Colors
Edit the CSS section in the HTML file:
- Main brand color: Search for `#2563eb` and replace
- Success color: Search for `#22c55e` and replace
- Background gradient: Modify the `body` background style

### Update Logo
Replace the image source `/ThriveFlows-Logo.png` with your logo URL

### Modify WhatsApp Number
Change `3584578337530` to your WhatsApp number (international format without +)

### Update Cal.com Calendar
Change `andre-lopes/revenue-recovery-potential` to your Cal.com booking link

## Responsive Design

The calculator is fully responsive and will automatically adapt to:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- No external dependencies except Cal.com embed
- Loads in < 1 second
- Optimized for mobile and desktop
- All styles and scripts are inline for faster loading
