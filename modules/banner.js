class Banner {
  constructor(userOptions) {
    const defaultOptions = {
      forPage: 'hub-page',
      forPages: false,
      imageUrl: '#',
    };
    this.options = Object.assign({}, defaultOptions, userOptions);
  }
}

module.exports = Banner;
