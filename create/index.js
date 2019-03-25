var argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('type path', 'create a vue compontent or page')
  .example('$0 page foo', 'Will create a vue page file `views/foo/index.vue`')
  .example(
    'node $0 compontent foo',
    'Will create a vue compontent file `components/foo/index.vue`'
  )
  .example(
    'node $0 page foo/bar',
    'Will create a vue page file `views/foo/bar/index.vue`'
  )
  .example(
    'node $0 compontent foo/bar',
    'Will create a vue compontent file `components/foo/bar/index.vue`'
  )
  .example(
    'node $0 compontent foo/bar --filename=foo',
    'Will create a vue compontent file `components/foo/bar/foo.vue`'
  )
  .example(
    'node $0 compontent foo/bar -f foo',
    'Will create a vue compontent file `components/foo/bar/foo.vue`'
  )
  .example(
    'node $0 compontent foo/bar',
    'Will create a vue compontent file `components/foo/bar/index.vue`'
  )
  .describe('n', 'edit vue component name')
  .describe('f', `edit vue file name`)
  .help('h')
  .alias('h', 'help')
  .alias('n', 'name')
  .alias('f', 'filename')
  .epilog('copyright 2018, the author is apiao').argv
const fs = require('fs')
const path = require('path')
require('colors')
async function mkdirs (dirpath) {
  try {
    if (!fs.existsSync(path.dirname(dirpath))) {
      mkdirs(path.dirname(dirpath))
    }
    fs.mkdirSync(dirpath)
    return Promise.resolve()
  } catch (error) {
    return Promise.resolve()
  }
}
async function makePage (filePath, op) {
  try {
    await mkdirs(filePath)
    copyFile({
      target: filePath + `/${op.fileName || 'index'}.vue`,
      template: './create/pageTemp.temp',
      name: op.name
    })
  } catch (err) {
    console.log(err.message.red)
  }
}
function copyFile (option) {
  let o = {
    target: option.target,
    template: option.template,
    setName: option.name,
    data: ''
  }
  var exit = fs.existsSync(o.target)
  if (exit) {
    console.log('文件已存在,请更换文件名或者更换路径'.red)
    return false
  }
  fs.readFile(o.template, 'utf-8', function (
    err,
    data
  ) {
    if (err) {
      console.log('模板加载失败'.red, err)
    } else {
      o.data = data
      o.data = o.data.replace(/#NAME/g, o.setName)
      writeFile(o)
    }
  })
}

function writeFile (option) {
  let o = {
    data: option.data,
    target: option.target,
    setName: option.setName
  }
  fs.writeFile(o.target, o.data, 'utf8', function (error) {
    if (error) {
      console.log(`${error}`.red)
      throw error
    } else {
      console.log(`保存成功，路径：`.green + `${o.target}`.yellow)
    }
  })
}
async function makeComponent (filePath, op) {
  try {
    await mkdirs(filePath)
    copyFile({
      target: filePath + `/${op.fileName || 'index'}.vue`,
      template: './create/componentTemp.temp',
      name: op.name
    })
  } catch (err) {
    console.log(err.message.red)
  }
}

async function main () {
  const type = argv._[0]
  const name = argv.name
  const filePath = argv._[1] || ''
  const fileName = argv.filename
  if (type === 'page' || type === 'view') {
    await makePage('src/views/' + filePath, {
      name: name || 'untitle',
      fileName: fileName || 'index'
    })
  } else if (type === 'component') {
    await makeComponent('src/components/' + filePath, {
      name: name || 'untitle',
      fileName: fileName || 'index'
    })
  } else {
    console.log(`暂无匹配的命令: ${type}`.red)
  }
}

main()
