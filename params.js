#!/usr/bin/env node

/**
 * Parse options into inkscape UI params
 *
 * Usage: svgo --show-plugins | ./params.js
 */

const Entities = require('html-entities').XmlEntities
const entities = new Entities()
const out = []
const re = /\[ (.+) \] (.+)/g

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  out.push(process.stdin.read())
})

process.stdin.on('end', () => {
  const s = out.join('')
  let m
  do {
    m = re.exec(s)
    if (m) {
      console.log(`<param name="${m[1]}" type="boolean" gui-text="${entities.encode(m[2])}">false</param>`)
    }
  } while (m)
})
