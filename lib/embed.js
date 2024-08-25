const netlify = require('./netlify')
const site = require('./site')

/**
 * Util: format time
 */
const time = () => new Date().toTimeString().split(' ')[0]

/**
 * Util: format embed.fields item
 */
const field = (name, value, inline = false) => ({
  name,
  value,
  inline,
})

/**
 * Format object: embed
 */
const embed = ({title, status}, success = false) => ({
  author: {
    name: netlify.name,
    url: netlify.url,
    icon_url: success ? netlify.logo : netlify.logoError,
  },
  url: `https://app.netlify.com/sites/${site.name}`,
  color: netlify.color,
  title,
  description: `[${site.name}](${
    site.url
  }) ${status} at ${time()}.`,
  fields: [
    field('Build ID', site.build, true),
    field('Context', site.context, true),
    field('Node version', site.node, true),
    field('Commit', site.commit),
    field('Repository', site.repository),
  ],
})

/**
 * Success embed
 */
const success = () =>
  embed({
    title: `Build deployed`,
    status: `was deployed`,
  }, true)

/**
 * Fail embed 
 */
const fail = () =>
  embed({
    title: `Build failed`,
    status: `failed to deploy`,
  }, false)

module.exports = {
  success,
  fail,
}
