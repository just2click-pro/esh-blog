const en = require('./en.json')
const he = require('./he.json')

module.exports = () => ({
    en: en.posts,
    he: he.posts
})