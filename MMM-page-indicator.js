Module.register("MMM-page-indicator", {
    defaults: {
        pages: 3,
        activeBright: false,
        inactiveDimmed: true,
        inactiveHollow: true,
        
    },
    
    getStyles: function() {
        return ["font-awesome.css", "page-indicators.css"];
    },
    
    start: function() {
        this.curPage = 0;
    },
    
    getDom: function() {
        var wrapper = document.createElement("div");
        
        for (let i = 0; i < this.config.pages; i++) {
            let circle = document.createElement("i");
            
            if (this.curPage === i) {
                circle.className = "fa fa-circle indicator";
                if (this.config.activeBright) {
                    circle.className += " bright";
                }
            } else {
                circle.className = "fa indicator";
                
                if (this.config.inactiveDimmed) {
                    circle.className += " dimmed";
                }
                
                if (this.config.inactiveHollow) {
                    circle.className += " fa-circle-thin";
                } else {
                    circle.className += " fa-circle";
                }
            }
            wrapper.appendChild(circle);
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
