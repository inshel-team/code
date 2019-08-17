import Options from './options'

const METHODS = ['get', 'latest', 'publish']

class Code {
  constructor (node, options) {
    this.node = node
    this.options = new Options(options)

    METHODS.forEach((method) => {
      this[method] = this.options.key != null
        ? this[`_${method}`].bind(this, options.key)
        : this[`_${method}`].bind(this)
    })
  }

  async _get (key, query) {
    return this.node.contracts.lambda(
      key,
      this.options.contract,
      this.options.lambda.get,
      query
    )
  }

  async _publish (key, version, _options) {
    const options = _options || {}

    return this.node.contracts.lambda(
      key,
      this.options.contract,
      this.options.lambda.publish,
      {
        ...version,
        latest: typeof options.latest === 'boolean'
          ? options.latest
          : false
      }
    )
  }

  async _latest (key, params) {
    return this.node.contracts.lambda(
      key,
      this.options.contract,
      this.options.lambda.latest,
      params
    )
  }
}

export default Code
