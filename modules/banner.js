class Banner {
  constructor(userOptions) {
    const defaultOptions = {
      forPage: 'hub-page',
      forPages: false,
      imageUrl: '#',
    };
    this.options = Object.assign({}, defaultOptions, userOptions);
    console.log('This is a work in progress, currently it cannot be used.');
  }
}

module.exports = Banner;
