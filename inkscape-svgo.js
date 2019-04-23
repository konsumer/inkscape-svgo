#!/usr/bin/env node

const spawn = require('child_process').spawn
const argv = require('yargs').argv

const options = []

if (argv.pretty && argv.pretty === 'true') {
  options.push('--pretty')
}
if (argv.multipass && argv.multipass === 'true') {
  options.push('--multipass')
}
options.push(`--precision=${argv.precision}`)
options.push('--output=-')
options.push(`--input=${argv._[0]}`)

argv.enable
  .filter(e => e.match(/true$/))
  .forEach(e => {
    options.push(`--enable=${e.replace(/=true$/, '')}`)
  })

argv.enable
  .filter(e => e.match(/false$/))
  .forEach(e => {
    options.push(`--disable=${e.replace(/=false$/, '')}`)
  })

const cmd = spawn(`"${__dirname}/node_modules/.bin/svgo"`, options)
cmd.stdout.on('data', data => {
  console.log(data.toString())
})
cmd.stderr.on('data', data => {
  console.error(data.toString())
})
