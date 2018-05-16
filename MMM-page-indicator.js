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
    pageIcons: [],
    icon: 'fa-circle',
    hollowIcon: 'fa-circle-thin',
    iconSize: '',
  },

  /**
   * Apply any styles, if we have any.
   */
  getStyles() {
    return ['font-awesome.css', 'page-indicators.css', 'custom.css'];
  },

  /**
   * Pseudo-constructor for our module. Sets the default current page to 0.
   */
  start() {
    this.curPage = 0;
  },

  /**
   * Render the cicles for each page, and highlighting the page we're on.
   */
    getDom: function() {
        const wrapper = document.createElement('div');

        for (let i = 0; i < this.config.pages; i++) {
            let icon = document.createElement('i');

            icon.className = this.config.iconSize + ' indicator fa ';

            icon.className += this.config.pageIcons[i] ? this.config.pageIcons[i] : '';

            if (this.curPage === i) {
                icon.className += !this.config.pageIcons[i] ? this.config.icon : '';
                if (this.config.activeBright) {
<<<<<<< HEAD
                    icon.className += ' bright';
                }
            } else {
              if (this.config.inactiveDimmed) {
                    icon.className += ' dimmed';
                }

                if (!this.config.pageIcons[i]) {
                    icon.className += ' '; 
=======
                    icon.className += " bright";
                }
            } else {
                if (this.config.inactiveDimmed) {
                    icon.className += " dimmed";
                }

                if (!this.config.pageIcons[i]) {
                  icon.className += ' ';
>>>>>>> 73d241ffb3e43984c4746eed911918a24f4e9f0b
                  if (this.config.inactiveHollow) {
                    icon.className += this.config.hollowIcon;
                  } else {
                      icon.className += this.config.icon;
                  }
                }
            }

<<<<<<< HEAD

      wrapper.appendChild(icon);

      const self = this;

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
      Log.log(`${this.name} recieved a notification to change to
        page ${payload}`);
      this.curPage = payload;
      this.updateDom();
    } else if (notification === 'MAX_PAGES_CHANGED') {
      Log.log(`${this.name} received a notification to change the maximum
        number of pages to ${payload}`);
      this.config.pages = payload;
      if (payload - 1 < this.curPage) {
        this.curPage = payload - 1;
      }
      this.updateDom();
    } else if (notification === 'PAGE_INCREMENT') {
      Log.log(`${this.name} recieved a notification to increment pages!`);
      this.curPage = mod(this.curPage + 1, this.config.pages);
      this.updateDom();
    } else if (notification === 'PAGE_DECREMENT') {
      Log.log(`${this.name} recieved a notification to decrement pages!`);
      this.curPage = mod(this.curPage - 1, this.config.pages);
      this.updateDom();
    }
  },
=======
            wrapper.appendChild(icon);

            let self = this;

            icon.onclick = function() {
                self.sendNotification("PAGE_CHANGED", i);
                self.curPage = i;
                self.updateDom();
            };
        }

        return wrapper;
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification === "PAGE_CHANGED") {
            Log.log(this.name + " recieved a notification to change to page " + payload);
            this.curPage = payload;
            this.updateDom();
        } else if (notification === "MAX_PAGES_CHANGED") {
            Log.log(this.name + " received a notification to change the maximum number of pages to " + payload);
            this.config.pages = payload;
            if (payload - 1 < this.curPage) {
                this.curPage = payload - 1;
            }
            this.updateDom();
        } else if (notification === "PAGE_INCREMENT") {
            Log.log(this.name + " recieved a notification to increment pages!");
            if (this.curPage === this.config.pages - 1) {
                this.curPage = 0;
            } else { this.curPage++ }
            this.updateDom();
        } else if (notification === "PAGE_DECREMENT") {
            Log.log(this.name + " recieved a notification to decrement pages!");
            if (this.curPage === 0) {
                this.curPage = this.config.pages - 1;
            } else { this.curPage-- }
            this.updateDom();
        }
    },
>>>>>>> 73d241ffb3e43984c4746eed911918a24f4e9f0b

});
