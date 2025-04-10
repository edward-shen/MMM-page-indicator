Module.register('MMM-page-indicator', {

  /**
   * By default, we should try to make the configuration match the demo
   * implementation. This means 3 pages, and some default enabled styles.
   */
  defaults: {
    pages: 3,
    activeBright: false,
    inactiveDimmed: true,
    inactiveHollow: true,
  },

  /**
   * Apply any styles, if we have any.
   */
  getStyles() {
    return ['font-awesome.css', 'page-indicators.css'];
  },

  /**
   * Pseudo-constructor for our module. Sets the default current page to 0.
   */
  start() {
    this.curPage = 0;
    this.mmmPagesDetected = false;
  },

  /**
   * Render the cicles for each page, and highlighting the page we're on.
   */
  getDom() {
    const wrapper = document.createElement('div');

    for (let i = 0; i < this.config.pages; i += 1) {
      const circleWrapper = document.createElement('div');
      circleWrapper.classList.add('circle-wrapper');

      const circle = document.createElement('i');
      circle.classList.add('fa', 'indicator', `page-${i}`);

      if (this.curPage === i) {
        circle.classList.add('fa-circle', 'bright', 'active-page');
        if (this.config.activeBright) circle.classList.add('bright');
      } else {
        if (this.config.inactiveDimmed) circle.classList.add('dimmed');
    
        if (this.config.inactiveHollow) {
          circle.classList.add('fa-circle-thin');
        } else {
          circle.classList.add('fa-circle');
        }
      }
      wrapper.appendChild(circle);

      const self = this;

      const tooltip = document.createElement('span');
      tooltip.classList.add('tooltip');
      tooltip.innerText = i;

      // Lets people change the page by clicking on the respective circle.
      // So apparently this doesn't work if we don't call the last two methods,
      // despite those methods being called in when calling sendNotification.
      // This is likely a bug (because spamming a single button) causes rapid-
      // fire page changing, but for most cases that shouldn't be a problem.
      circle.onclick = () => {
        self.sendNotification('PAGE_CHANGED', i);
        self.curPage = i;
        self.updateDom();
      };

      circleWrapper.appendChild(circle);
      circleWrapper.appendChild(tooltip);
      wrapper.appendChild(circleWrapper);
    }

    return wrapper;
  },

  /**
   * If we recieve a notification that we can respond to, update which page
   * we're suppose to show as active.
   * @param {string} notification The notification ID
   * @param {number} payload the payload type.
   */
  notificationReceived(notification, payload) {
    /**
     * Modulo that also works with negative numbers.
     * @param {number} x The dividend
     * @param {number} n The divisor
     */
    const mod = (x, n) => ((x % n) + n) % n;

    if (notification === 'PAGE_CHANGED') {
      Log.log(`[${this.name}]: changing pages to ${payload}`);
      this.curPage = mod(payload, this.config.pages);
      this.updateDom();
    } else if (notification === 'MAX_PAGES_CHANGED') {
      Log.log(`[${this.name}]: Changing maximum pages to ${payload}`);
      this.config.pages = payload;
      if (payload - 1 < this.curPage) {
        this.curPage = payload - 1;
      }
      this.updateDom();
    } else if (notification === 'PAGE_INCREMENT' && !this.mmmPagesDetected) {
      this.curPage = mod(this.curPage + 1, this.config.pages);
      Log.log(`[${this.name}]: Incrementing page; new page is ${this.curPage}`);
      this.updateDom();
    } else if (notification === 'PAGE_DECREMENT' && !this.mmmPagesDetected) {
      this.curPage = mod(this.curPage - 1, this.config.pages);
      Log.log(`[${this.name}]: Decrementing page; new page is ${this.curPage}`);
      this.updateDom();
    } else if (notification === 'NEW_PAGE') {
      Log.log(`[${this.name}]: Setting page to ${payload}`);
      this.curPage = payload;
      this.updateDom();
    } else if (notification === 'ALL_MODULES_STARTED') {
      this.mmmPagesDetected = MM.getModules().withClass("MMM-pages").length > 0;
      Log.log(`[${this.name}]: MMM-pages detected. Will ignore PAGE_INCREMENT and PAGE_DECREMENT as it is already handled by MMM-pages`);
    }
  },

});
