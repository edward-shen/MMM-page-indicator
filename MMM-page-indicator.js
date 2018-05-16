Module.register("MMM-page-indicator", {
    defaults: {
        pages: 3,
        activeBright: false,
        inactiveDimmed: true,
        inactiveHollow: true,
        pageIcons: [],
        icon: 'fa-circle',
        hollowIcon: "fa-circle-thin",
        iconSize: ''
    },

    getStyles: function() {
        return ["font-awesome.css", "page-indicators.css", "custom.css"];
    },

    start: function() {
        this.curPage = 0;
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        for (let i = 0; i < this.config.pages; i++) {
            let icon = document.createElement("i");

            icon.className = this.config.iconSize + ' indicator fa ';

            icon.className += this.config.pageIcons[i] ? this.config.pageIcons[i] : "";

            if (this.curPage === i) {
                icon.className += !this.config.pageIcons[i] ? this.config.icon : '';
                if (this.config.activeBright) {
                    icon.className += " bright";
                }
            } else {
                if (this.config.inactiveDimmed) {
                    icon.className += " dimmed";
                }

                if (!this.config.pageIcons.length) {
                  icon.className += ' ';
                  if (this.config.inactiveHollow) {
                    icon.className += this.config.hollowIcon;
                  } else {
                      icon.className += this.config.icon;
                  }
                }
            }

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

});
