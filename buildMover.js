const fs = require('fs');
const fse = require('fs-extra');

const dirCss = './client/webbchat/build/static/css/';
const dirJs = './client/webbchat/build/static/js/';
const fileNameIndex = './client/webbchat/build/index.html';

const destinationCss = './public/stylesheets/';
const destinationJs = './public/javascripts/';
const destinationIndex = './views/';

try {
  const filesInCssDir = fs.readdirSync(dirCss);
  filesInCssDir.forEach(fileName => {
    console.log(`moved ${dirCss}${fileName} to ${destinationCss}${fileName}`);
    fse.copySync(`${dirCss}${fileName}`, `${destinationCss}${fileName}`);
  });

  const filesInJsDir = fs.readdirSync(dirJs);
  filesInJsDir.forEach(fileName => {
    console.log(`moved ${dirJs}${fileName} to ${destinationJs}${fileName}`);
    fse.copySync(`${dirJs}${fileName}`, `${destinationJs}${fileName}`);
  });

  fse.copySync(fileNameIndex, `${destinationIndex}chat.hbs`);
  console.log(`moved ${fileNameIndex} to ${destinationIndex}chat.hbs`);

  const chatHbs = './views/chat.hbs';
  const fileContent = fs.readFileSync(chatHbs, 'utf8');

  let result = fileContent.replace(/static\/js/g, 'javascripts');
  result = result.replace(/static\/css/g, 'stylesheets');

  fs.writeFileSync(chatHbs, result, 'utf8');
  console.log('success!');

} catch (err) {
  console.error(err);
}
