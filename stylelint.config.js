/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: [
    "stylelint-order"
  ],
  rules: {
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    "order/properties-order": [
      "width",
      "height"
    ]
  }
};
