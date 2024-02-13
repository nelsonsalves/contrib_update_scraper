const cheerio = require('cheerio'),
      axios = require('axios');
      fs = require('fs');
      filepath = 'modules_list.txt';

let file_lines = fs.readFileSync(filepath, 'utf8').split('\n');

file_lines.forEach(getData)

function getData(url){
  axios.get(url)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let name = $('#page-subtitle').text()
      let numberSites = $('.project-info > li > a > strong').text() === '' ? 0 : $('.project-info > li > a > strong').text()
      let isDrupal9Ready = $(".release > div > span > small").text().includes('^10') ? 'Yes' : 'No'
      let drupalSecurityPolicy = $('.view-content').find('.security-covered').length >= 1 ? 'Yes' : 'No'

      console.log(
        'Module name: ' + name,'\n',
        'Number of sites that use this module: ' + numberSites,'\n',
        'Is 10 Ready: ' + isDrupal9Ready,'\n',
        'Drupal Security Policy? ' + drupalSecurityPolicy,'\n',
      )

    }).catch(function (e) {
      console.log(e);
    });
}
