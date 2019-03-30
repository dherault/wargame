#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const version = require('../src/version.json')

const nextVersion = version.version + 1

fs.writeFileSync(
  path.resolve(__dirname, '../src/version.json'),
  JSON.stringify({
    version: nextVersion,
  }, null, 2)
)

console.log('Bumped version!', nextVersion)
