#!/usr/bin/env node

const opts = require('yargs').argv
const SVGO = require('svgo')
const { readFileSync } = require('fs')

const main = async () => {
  const config = { js2svg: {} }
  if (opts.multipass && opts.multipass === 'true') {
    config.multipass = true
  }
  if (opts.pretty && opts.pretty === 'true') {
    config.js2svg.pretty = true
    if (opts.indent) {
      config.js2svg.indent = parseInt(opts.indent)
    }
  }
  if (opts.precision) {
    const precision = Math.min(Math.max(0, parseInt(opts.precision)), 20)
    if (!isNaN(precision)) {
      config.floatPrecision = precision
    }
  }
  if (opts.enable && opts.enable.length) {
    config.plugins = opts.enable.map(e => {
      return { [e.replace(/(.+)=(true|false)/, '$1')]: !!e.match(/true$/) }
    })
  }
  const svgo = new SVGO(config)
  const data = readFileSync(opts._[0])
  const result = await svgo.optimize(data, { path: opts._[0] })
  console.log(result.data)
}
main()
