#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { version } = require('../src/version.json')

const versionArray = version.split('.').map(n => parseInt(n, 10))

versionArray[1] += 1

const nextVersion = versionArray.join('.')

fs.writeFileSync(
  path.resolve(__dirname, '../src/version.json'),
  JSON.stringify({ version: nextVersion }, null, 2)
)

console.log('Bumped version!', nextVersion)
