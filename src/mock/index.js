const Mock = require('mockjs')
const Random = Mock.Random
const domain = 'http://localhost:1111/tps'
const code = 200

const postData = req => {
  let posts = []

  for (let i = 0; i < 10; i++) {
    let post = {
      sId: Random.integer(11),
      cId: Random.integer(11),
      sName: Random.name(),
      cName: Random.name(),
      cusip: Random.word(9)
    }

    posts.push(post)
  }

  return {
    code,
    posts
  }
}
Mock.mock(`${domain}/allSeller`, 'get', postData)
Mock.mock(`${domain}/allCusip`, 'get', postData)
Mock.mock(`${domain}/allClient`, 'get', postData)
