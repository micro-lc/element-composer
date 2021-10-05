const configuration = {
  type: 'row',
  content: [{
    type: 'column',
    attributes: {
      style: 'width: 89%',
    },
    content: [{
      type: 'element',
      tag: 'link',
      attributes: {
        href: "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
        rel: "stylesheet"
      }
    }, {
      type: 'element',
      tag: 'button',
      url: 'https://google.it',
      properties: {'attribute-a': 'value-a'},
      attributes: {
        class: 'bg-gray-100 rounded-xl p-8'
      }
    }]
  }]
}

module.exports = (request, response) => {
  response
    .delay(1000)
    .send(configuration)
}
