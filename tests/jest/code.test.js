/* eslint-env jest */

import '@babel/polyfill'
import uuid from 'uuid'

import Code from '../../src'
import createConfig from '../utils/config'
import nodeUtils from '../utils'

const config = createConfig()
const content = ((i) => i).toString()
const contentMD5 = 'e4bbdbc7c83de9e57ccb76cfffd1e178'

afterEach(async () => {
  await nodeUtils.disconnectAll()
})

test('Publish', async () => {
  const { node, key } = await nodeUtils.connect(config)
  const language = uuid.v4()
  const version = uuid.v4()
  const name = uuid.v4()

  const code = new Code(node, { key })

  const result = await code.publish(
    {
      language,
      name,
      version,
      content,
      payload: { myFn: true }
    },
    { latest: true }
  )

  expect(result).toStrictEqual({ md5: contentMD5, latest: version })
})

test('Get', async () => {
  const { node, key } = await nodeUtils.connect(config)
  const language = 'javascript:Get'
  const name = 'test-fn'
  const version = uuid.v4()

  const code = new Code(node, { key })
  await code.publish(
    {
      language,
      name,
      version,
      content,
      payload: { myFn: true }
    },
    { latest: true }
  )

  const result = await code.get({ key, language, name })

  expect(result).toStrictEqual({
    key,
    md5: contentMD5,
    language,
    name,
    version,
    content,
    payload: { myFn: true }
  })
})

test('Latest', async () => {
  const { node, key } = await nodeUtils.connect(config)
  const language = uuid.v4()
  const name = 'test-fn'
  const version = uuid.v4()
  const newVersion = uuid.v4()

  const code = new Code(node, { key })
  await code.publish(
    {
      language,
      name,
      version,
      content: ((i) => ++i).toString(),
      payload: { myFn: true }
    },
    { latest: true }
  )
  await code.publish(
    {
      language,
      name,
      version: newVersion,
      content,
      payload: { myFn: true, version: '2' }
    },
    { latest: false }
  )

  await code.latest({ language, name, latest: newVersion })

  const result = await code.get({ key, language, name })

  expect(result).toStrictEqual({
    key,
    md5: contentMD5,
    language,
    name,
    version: newVersion,
    content,
    payload: { myFn: true, version: '2' }
  })
})
