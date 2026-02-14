let config = {
  modules: [
    {
      module: 'MMM-pages',
      config: {
        useLockString: false,
        timings: {
          default: 5000,
        },
        modules: [
          ['page0'],
          ['page1'],
          ['page2'],
          ['page3'],

        ],
      },
    },
    {
      module: 'compliments',
      position: 'lower_third',
      classes: 'page0',
      config: {
        compliments: {
          anytime: ['Page 0: First page content'],
        },
      },
    },
    {
      disabled: false,
      module: 'MMM-page-indicator',
      classes: 'fixed_page',
      position: 'bottom_bar',
      config: {
        showPageNumberOnHover: true,
      },
    },
    {
      module: 'compliments',
      classes: 'page0 page1 page2',
      position: 'top_bar',
      config: {
        compliments: {
          anytime: ['Test MMM-pages: Class based configuration'],
        },
      },
    },
    {
      module: 'clock',
      classes: 'page1',
      position: 'middle_center',
    },
    {
      module: 'newsfeed',
      classes: 'page2 page3',
      position: 'middle_center',
      config: {
        feeds: [
          {
            title: 'New York Times',
            url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
          },
        ],
      },
    },
  ],
};

/** ************* DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
  module.exports = config;
}
