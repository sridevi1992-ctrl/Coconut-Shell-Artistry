const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace navbar logo
  content = content.replace(/Coconut<span>Carvings<\/span>/g, 'Coconut Shell <span>Artistry</span>');
  // Replace <title>
  content = content.replace(/<title>Coconut Carvings -/g, '<title>Coconut Shell Artistry -');
  // Replace footer copyright text if any
  content = content.replace(/&copy; 2026 Coconut Carvings/g, '&copy; 2026 Coconut Shell Artistry');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
