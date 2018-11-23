function getCloneCommand(project, username, pwd) {
  let githubUrl = getGithubUrlByProject(project)
  return `mkdir ${project}&&cd ${project}&&git init&&git remote add origin ${githubUrl}&&git pull origin master`

  function getGithubUrlByProject(project) {
    return `https://${username}:${pwd}@github.com/${username}/${project}.git`
  }
}
function getCommitCommand(msg) {
  return `git add .&&git commit -m "${msg}"&&git push -u origin master`
}

module.exports = {
  getCloneCommand,
  getCommitCommand
}
