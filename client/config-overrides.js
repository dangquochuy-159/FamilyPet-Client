/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc } = require("customize-cra");

const path = require("path");

module.exports = override(

    useBabelRc()

); 