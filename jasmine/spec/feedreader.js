/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('allFeeds variable is defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    // This test ensures that all URLS are defined for the feeds.
    it('urls are defined', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    //This test ensures all feed entires have a name
    it('feed name is defined', function() {
      for (let feedname of allFeeds) {
        expect(feedname.name).toBeDefined();
        expect(feedname.name.length).not.toBe(0);
      }
    });
  });


  //Menu Suite
  describe('The menu', function() {
    //Ensures the menu is hidden by default
    it('menu default is hidden', function() {
      let hiddenMenu = document.body.classList.contains('menu-hidden');
      expect(hiddenMenu).toBe(true);
    });

    //visibility of the menu toggles in response to a click
    it('menu toggles on click', function() {
      let menuBurger = document.querySelector('a.menu-icon-link');
      menuBurger.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      menuBurger.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  //Feed Initiaing/Loading Tests
  describe('Initial Entries', function() {
    //checks that when loadFeed is called, there is at least one entry in the feed container
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('loadFeed is not empty when called', function() {
      //Checks the default state of menu to not be empty of entries
      const feedMain = document.querySelector('div.feed');
      const feedEntries = feedMain.querySelectorAll('article.entry');
      expect(feedEntries.length > 0).toBe(true);
      //console.log(feedEntries);
    });
  });

  describe('New Feed Selection', function() {
    /*variables to call the article container and empty arrays for storing
    the articles that are loaded on each loadFeed action */
    const feedDiv = document.querySelector('div.feed');
    let firstFeed = [];
    let secondFeed = [];

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Th loadFeed function is called once and results are compared to the second result called after.
     */
    beforeEach(function(done) {
      loadFeed(1, function() {
      Array.from(feedDiv.children).forEach(function(feedEntry) {
        firstFeed.push(feedEntry.innerText);
        });
        loadFeed(2, function() {
        Array.from(feedDiv.children).forEach(function(entry, index) {
          secondFeed.push(entry.innerText);
          done();
          });
      });
    });
    });
      //console.log(feedDiv.children[0].innerText);
      //console.log(firstFeed);

    it('content refreshes on loading new feed', function() {
        //console.log(entry,index);
      //console.log(firstFeed[0]);
      //console.log(secondFeed[0]);
      expect(firstFeed[0]).not.toBe(secondFeed[0]);
    });
  });
}());
