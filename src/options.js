const DEFAULT_OPTIONS = {
  key: null,
  contract: 18,
  lambda: {
    publish: 'publish',
    get: 'get',
    latest: 'latest'
  },
  encryptCode: (i) => i,
  decryptCode: (i) => i,
  encryptString: (i) => i,
  decryptString: (i) => i
}

class Options {
  constructor (options = {}) {
    Object.keys(DEFAULT_OPTIONS).forEach((key) => {
      this[key] = options[key] || DEFAULT_OPTIONS[key]
    })
  }
}

export default Options
