const cheerio = require('cheerio'),
  axios = require('axios');

let modulesURL = [
  'https://www.drupal.org/project/bulk_author_update',
  'https://www.drupal.org/project/content_editing_message',
  'https://www.drupal.org/project/content_remote_options',
  'https://www.drupal.org/project/crypto_widget',
  'https://www.drupal.org/project/entity_copy_reference',
  'https://www.drupal.org/project/extlog',
  'https://www.drupal.org/project/gamification',
  'https://www.drupal.org/project/gsaml',
  'https://www.drupal.org/project/gsso',
  'https://www.drupal.org/project/landing_page_scheduler',
  'https://www.drupal.org/project/multiple_select',
  'https://www.drupal.org/project/rest_export_nested',
  'https://www.drupal.org/project/saml_extras',
  'https://www.drupal.org/project/save_entities',
  'https://www.drupal.org/project/select2_multicheck',
  'https://www.drupal.org/project/simplenews_mailjet_subscriptions',
  'https://www.drupal.org/project/theme_selector',
  'https://www.drupal.org/project/transliterate_twig',
  'https://www.drupal.org/project/url_restriction_by_role',
  'https://www.drupal.org/project/webform_content_creator',
  'https://www.drupal.org/project/webform_remote_handlers',
  'https://www.drupal.org/project/webform_remote_select',
]

modulesURL.forEach(getData)

function getData(url){
  axios.get(url)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let name = $('#page-subtitle').text()
      let numberSites = $('.project-info > li > a > strong').text() === '' ? 0 : $('.project-info > li > a > strong').text()
      let isDrupal9Ready = $(".release > div > span > small").text().includes('^9') ? 'Yes' : 'No'
      let drupalSecurityPolicy = $('.view-content').find('.security-covered').length >= 1 ? 'Yes' : 'No'
      let hasTests = $('.release-info').find('.pift-ci-fail').length >= 1 || $('.release-info').find('.pift-ci-pass').length >= 1 ? 'Yes' : 'No'
      let areTestsOk = $('.pift-ci-tests').find('.pift-ci-fail').length == 1 ? 'No' : 'Yes'

      console.log(
        'Module name: ' + name,'\n',
        'Number of sites that use this module: ' + numberSites,'\n',
        'Is 9 Ready: ' + isDrupal9Ready,'\n',
        'Drupal Security Policy? ' + drupalSecurityPolicy,'\n',
        'Has tests?: ' + hasTests
      )

      if(hasTests === 'Yes'){
        console.log('Are tests ok? ' + areTestsOk, '\n')
      }else{
        console.log('Has no tests to check', '\n')
      }
    }).catch(function (e) {
      console.log(e);
    });
}
