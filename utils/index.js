async function getPriceFromEl(el) {
  const text = await el.getText();
  return text.match(/(USD [\d,\.]+)/i)[0];
}

module.exports = { getPriceFromEl };
