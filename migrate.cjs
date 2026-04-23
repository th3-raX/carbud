const fs = require('fs');
const path = require('path');

const components = ['BudgetSlider', 'LoadingState', 'OptionCard', 'ProgressBar', 'ResultCard'];
const steps = ['StepBodyType', 'StepBudget', 'StepPriority', 'StepUseCase'];

// Move components
for (const comp of components) {
  const dir = path.join('src/components', comp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const tsxPath = path.join('src/components', `${comp}.tsx`);
  const cssPath = path.join('src/components', `${comp}.module.css`);
  
  if (fs.existsSync(tsxPath)) fs.renameSync(tsxPath, path.join(dir, `${comp}.tsx`));
  if (fs.existsSync(cssPath)) fs.renameSync(cssPath, path.join(dir, `${comp}.module.css`));
  
  fs.writeFileSync(path.join(dir, 'index.ts'), `export * from './${comp}';\n`);
}

// Move steps
for (const step of steps) {
  const dir = path.join('src/steps', step);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const tsxPath = path.join('src/steps', `${step}.tsx`);
  
  if (fs.existsSync(tsxPath)) fs.renameSync(tsxPath, path.join(dir, `${step}.tsx`));
  
  fs.writeFileSync(path.join(dir, 'index.ts'), `export * from './${step}';\n`);
}

// Move shared css
const sharedDir = path.join('src/steps', 'shared');
if (!fs.existsSync(sharedDir)) fs.mkdirSync(sharedDir, { recursive: true });
if (fs.existsSync(path.join('src/steps', 'Step.module.css'))) {
  fs.renameSync(path.join('src/steps', 'Step.module.css'), path.join(sharedDir, 'Step.module.css'));
}

// Fix imports
function replaceInFile(file, replacements) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    for (const [from, to] of replacements) {
        content = content.replace(new RegExp(from.replace(/[.*+?^$\/{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), to);
    }
    fs.writeFileSync(file, content);
}

replaceInFile('src/components/ResultCard/ResultCard.tsx', [
    ["from '../types'", "from '../../types'"]
]);

for (const step of steps) {
    replaceInFile(`src/steps/${step}/${step}.tsx`, [
        ["from \"../components/BudgetSlider\"", "from \"../../components/BudgetSlider\""],
        ["from \"../components/OptionCard\"", "from \"../../components/OptionCard\""],
        ["from \"../types\"", "from \"../../types\""],
        ["from \"./Step.module.css\"", "from \"../shared/Step.module.css\""]
    ]);
}

console.log("Migration complete");
