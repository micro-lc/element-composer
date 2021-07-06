const configuration = {
  type: 'row',
  content: [{
    type: 'column',
    style: 'width: 89%',
    content: [{
      type: 'element',
      tag: 'button',
      url: 'https://google.it',
      config: {'attribute-a': 'value-a'}
    }]
  }]
}

module.exports = (request, response) => {
  response
    .delay(1000)
    .send(configuration)
}
