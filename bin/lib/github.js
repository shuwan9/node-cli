const Github = require('github-api')
function MyGithub(options) {
  this.options = Object.assign(
    {},
    { username: 'vue5456', password: 'sw1260593926' },
    options || {}
  )
  this.github = this.init(this.options)
}
MyGithub.prototype.init = function(options) {
  return new Github(options)
}
MyGithub.prototype.getUser = function() {
  return this.github.getUser()
}
MyGithub.prototype.getRepo = function(repo) {
  return this.github.getRepo(this.options.username, repo)
}
MyGithub.prototype.listRepos = function() {
  return this.getUser().listRepos()
}
MyGithub.prototype.createRepo = function(options) {
  if (typeof options === 'string') {
    options = {
      name: options
    }
  }
  options = Object.assign(
    {
      name: 'test',
      license_template: 'mit',
      gitignore_template: 'Node',
      auto_init: true
    },
    options
  )
  return this.getUser(options).createRepo(options)
}
MyGithub.prototype.deleteRepo = function(repo) {
  return this.getRepo(repo).deleteRepo()
}
MyGithub.prototype.deleteRepos = function(repos) {
  let promises = repos.map(repo => {
    return this.deleteRepo(repo)
  })
  return Promise.all(promises)
}

module.exports = {
  MyGithub
}
