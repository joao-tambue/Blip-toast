#!/usr/bin/env node
'use strict';

try {
  const figlet = require('figlet');
  const chalk = require('chalk');
  const gradient = require('gradient-string');
  const boxen = require('boxen');

  let pkg = {};
  try {
    pkg = require('../package.json');
  } catch (_) {
    // noop
  }

  const version = pkg.version || '0.1.0';
  const homepage = pkg.homepage || 'https://github.com/joao-tambue/Blip-toast';
  const repository =
    (pkg.repository && pkg.repository.url) || homepage;
  const gradientTitle = gradient(['#7C3AED', '#8B5CF6', '#6366F1', '#3B82F6']);

  const title = figlet.textSync('BLIP TOAST', { font: 'ANSI Shadow' });

  const gap = '\n\n';

  console.log(gap);
  console.log(gradientTitle(title));
  console.log(gap);

  const successCard = boxen(
    chalk.bold('⚡ Blip Toast installed successfully!') +
      '\n\n' +
      'Fast, beautiful and lightweight toast notifications for React Native.' +
      '\n\n' +
      chalk.dim('Version: ') +
      chalk.bold(version),
    {
      padding: 1,
      margin: { top: 0, bottom: 1 },
      borderStyle: 'round',
      borderColor: 'magenta',
      align: 'center',
    }
  );
  console.log(successCard);

  const quickStart = boxen(
    chalk.bold('Quick Start') +
      '\n\n' +
      chalk.dim('// Add this line to your imports') +
      '\n' +
      chalk.cyan('import { toast } from "blip-toast";') +
      '\n\n' +
      chalk.dim('// Show a toast') +
      '\n' +
      chalk.cyan('toast.success("Hello World");'),
    {
      padding: 1,
      margin: { top: 0, bottom: 1 },
      borderStyle: 'round',
      borderColor: 'blue',
      align: 'left',
    }
  );
  console.log(quickStart);

  const links = boxen(
    chalk.bold('Useful Links') +
      '\n\n' +
      '  📚 ' +
      chalk.cyan('Documentation') +
      '\n' +
      '  🐙 ' +
      chalk.cyan('GitHub Repository') +
      '\n' +
      '  🚀 ' +
      chalk.cyan('Getting Started') +
      '\n\n' +
      chalk.dim('Docs: ') +
      chalk.underline(homepage) +
      '\n' +
      chalk.dim('GitHub: ') +
      chalk.underline(repository),
    {
      padding: 1,
      margin: { top: 0, bottom: 1 },
      borderStyle: 'round',
      borderColor: 'white',
      align: 'left',
    }
  );
  console.log(links);
} catch (_) {
  // Never fail the installation
}

process.exit(0);
