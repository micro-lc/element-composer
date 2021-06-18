import viewEngine from '../ViewEngine'

describe('ViewEngine tests', () => {
  it('create correctly a row', () => {
    const type: 'row' = 'row'
    const rowConfig = {type}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div><div style="display: &quot;flex&quot;; flex-direction: &quot;column&quot;"></div></div>')
  })

  it('create correctly a column', () => {
    const type: 'column' = 'column'
    const rowConfig = {type}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div><div style="display: &quot;flex&quot;; flex-direction: &quot;row&quot;"></div></div>')
  })

  it('create correctly a column inside a row', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const rowConfig = {type: row, content: [{type: column}]}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div><div style="display: &quot;flex&quot;; flex-direction: &quot;column&quot;"><div style="display: &quot;flex&quot;; flex-direction: &quot;row&quot;"></div></div></div>')
  })
})
