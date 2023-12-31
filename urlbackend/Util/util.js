function validateUrl(value) {
    var urlPattern = new RegExp('^(http(s?)://)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$|' + // end of the URL pattern or
      'https?:\/\/api\.whatsapp\.com\/send.*', 'i'); // WhatsApp URL pattern
  
    return !!urlPattern.test(value);
  }
  
  module.exports = { validateUrl };
  