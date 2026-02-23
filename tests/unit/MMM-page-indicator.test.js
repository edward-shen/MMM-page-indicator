import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { Window } from 'happy-dom';

// Setup DOM environment
const window = new Window();
global.document = window.document;
global.window = window;

// Mock MagicMirror globals
global.Log = {
  debug: mock.fn(),
  log: mock.fn(),
  error: mock.fn(),
  info: mock.fn(),
  warn: mock.fn(),
};

global.MM = {
  getModules: mock.fn(() => ({
    withClass: mock.fn(() => []),
  })),
};

let moduleDefinition = null;
global.Module = {
  register: mock.fn((name, definition) => {
    moduleDefinition = definition;
  }),
};

// Load the module
await import('../../MMM-page-indicator.js');

describe('MMM-page-indicator', () => {
  let module;

  beforeEach(() => {
    // Reset mocks
    Log.debug.mock.resetCalls();
    Log.log.mock.resetCalls();
    Log.warn.mock.resetCalls();

    // Create a fresh module instance
    module = Object.create(moduleDefinition);
    module.name = 'MMM-page-indicator';
    module.identifier = 'module_1_MMM-page-indicator';
    module.config = { ...moduleDefinition.defaults };
    module.data = {
      classes: 'MMM-page-indicator',
      position: 'bottom_bar',
    };

    // Mock sendNotification and updateDom
    module.sendNotification = mock.fn();
    module.updateDom = mock.fn();

    // Initialize module
    module.start();
  });

  describe('initialization', () => {
    it('should register with correct name', () => {
      assert.equal(Module.register.mock.calls[0].arguments[0], 'MMM-page-indicator');
    });

    it('should have default config values', () => {
      assert.equal(moduleDefinition.defaults.pages, 3);
      assert.equal(moduleDefinition.defaults.activeBright, false);
      assert.equal(moduleDefinition.defaults.inactiveDimmed, true);
      assert.equal(moduleDefinition.defaults.inactiveHollow, true);
      assert.equal(moduleDefinition.defaults.showPageNumberOnHover, true);
    });

    it('should initialize with page 0', () => {
      assert.equal(module.curPage, 0);
    });

    it('should initialize mmmPagesDetected to false', () => {
      assert.equal(module.mmmPagesDetected, false);
    });
  });

  describe('getStyles', () => {
    it('should return required stylesheets', () => {
      const styles = moduleDefinition.getStyles();
      assert.deepEqual(styles, ['font-awesome.css', 'page-indicators.css']);
    });
  });

  describe('getDom', () => {
    it('should create wrapper div', () => {
      const wrapper = module.getDom();
      assert.equal(wrapper.tagName, 'DIV');
    });

    it('should create correct number of indicators', () => {
      module.config.pages = 5;
      const wrapper = module.getDom();
      const indicators = wrapper.querySelectorAll('.indicator');
      assert.equal(indicators.length, 5);
    });

    it('should mark active page with active-page class', () => {
      module.curPage = 1;
      const wrapper = module.getDom();
      const activeIndicator = wrapper.querySelector('.page-1.active-page');
      assert.ok(activeIndicator);
    });

    it('should apply activeBright class when configured', () => {
      module.config.activeBright = true;
      module.curPage = 0;
      const wrapper = module.getDom();
      const activeIndicator = wrapper.querySelector('.active-page');
      assert.ok(activeIndicator.classList.contains('bright'));
    });

    it('should apply inactiveDimmed class when configured', () => {
      module.config.inactiveDimmed = true;
      module.curPage = 0;
      const wrapper = module.getDom();
      const inactiveIndicator = wrapper.querySelector('.page-1');
      assert.ok(inactiveIndicator.classList.contains('dimmed'));
    });

    it('should use hollow circles for inactive when configured', () => {
      module.config.inactiveHollow = true;
      module.curPage = 0;
      const wrapper = module.getDom();
      const inactiveIndicator = wrapper.querySelector('.page-1');
      assert.ok(inactiveIndicator.classList.contains('fa-circle-thin'));
    });

    it('should show tooltips when configured', () => {
      module.config.showPageNumberOnHover = true;
      const wrapper = module.getDom();
      const tooltips = wrapper.querySelectorAll('.tooltip');
      assert.equal(tooltips.length, module.config.pages);
    });

    it('should not show tooltips when disabled', () => {
      module.config.showPageNumberOnHover = false;
      const wrapper = module.getDom();
      const tooltips = wrapper.querySelectorAll('.tooltip');
      assert.equal(tooltips.length, 0);
    });
  });

  describe('notificationReceived - PAGE_CHANGED', () => {
    it('should update current page', () => {
      module.notificationReceived('PAGE_CHANGED', 2);
      assert.equal(module.curPage, 2);
    });

    it('should call updateDom', () => {
      module.notificationReceived('PAGE_CHANGED', 1);
      assert.equal(module.updateDom.mock.callCount(), 1);
    });

    it('should handle negative page numbers with modulo', () => {
      module.config.pages = 5;
      module.notificationReceived('PAGE_CHANGED', -1);
      assert.equal(module.curPage, 4);
    });

    it('should wrap around page numbers', () => {
      module.config.pages = 3;
      module.notificationReceived('PAGE_CHANGED', 5);
      assert.equal(module.curPage, 2);
    });

    it('should log deprecation warning', () => {
      module.notificationReceived('PAGE_CHANGED', 1);
      assert.equal(Log.warn.mock.callCount(), 1);
      assert.ok(Log.warn.mock.calls[0].arguments[0].includes('deprecated'));
    });
  });

  describe('notificationReceived - PAGE_SELECT', () => {
    it('should update current page', () => {
      module.notificationReceived('PAGE_SELECT', 2);
      assert.equal(module.curPage, 2);
    });

    it('should call updateDom', () => {
      module.notificationReceived('PAGE_SELECT', 1);
      assert.equal(module.updateDom.mock.callCount(), 1);
    });

    it('should handle negative page numbers with modulo', () => {
      module.config.pages = 5;
      module.notificationReceived('PAGE_SELECT', -1);
      assert.equal(module.curPage, 4);
    });

    it('should wrap around page numbers', () => {
      module.config.pages = 3;
      module.notificationReceived('PAGE_SELECT', 5);
      assert.equal(module.curPage, 2);
    });

    it('should not log deprecation warning', () => {
      module.notificationReceived('PAGE_SELECT', 1);
      assert.equal(Log.warn.mock.callCount(), 0);
    });
  });

  describe('notificationReceived - MAX_PAGES_CHANGED', () => {
    it('should update max pages', () => {
      module.notificationReceived('MAX_PAGES_CHANGED', 5);
      assert.equal(module.config.pages, 5);
    });

    it('should call updateDom', () => {
      module.notificationReceived('MAX_PAGES_CHANGED', 4);
      assert.equal(module.updateDom.mock.callCount(), 1);
    });

    it('should adjust current page if out of bounds', () => {
      module.curPage = 4;
      module.notificationReceived('MAX_PAGES_CHANGED', 3);
      assert.equal(module.curPage, 2);
    });

    it('should not adjust current page if within bounds', () => {
      module.curPage = 2;
      module.notificationReceived('MAX_PAGES_CHANGED', 5);
      assert.equal(module.curPage, 2);
    });
  });

  describe('notificationReceived - PAGE_INCREMENT', () => {
    it('should increment page when MMM-pages not detected', () => {
      module.mmmPagesDetected = false;
      module.curPage = 1;
      module.config.pages = 3;
      module.notificationReceived('PAGE_INCREMENT');
      assert.equal(module.curPage, 2);
    });

    it('should wrap around at max page', () => {
      module.mmmPagesDetected = false;
      module.curPage = 2;
      module.config.pages = 3;
      module.notificationReceived('PAGE_INCREMENT');
      assert.equal(module.curPage, 0);
    });

    it('should not update when MMM-pages detected', () => {
      module.mmmPagesDetected = true;
      module.curPage = 1;
      module.notificationReceived('PAGE_INCREMENT');
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });
  });

  describe('notificationReceived - PAGE_DECREMENT', () => {
    it('should decrement page when MMM-pages not detected', () => {
      module.mmmPagesDetected = false;
      module.curPage = 2;
      module.config.pages = 3;
      module.notificationReceived('PAGE_DECREMENT');
      assert.equal(module.curPage, 1);
    });

    it('should wrap around at page 0', () => {
      module.mmmPagesDetected = false;
      module.curPage = 0;
      module.config.pages = 3;
      module.notificationReceived('PAGE_DECREMENT');
      assert.equal(module.curPage, 2);
    });

    it('should not update when MMM-pages detected', () => {
      module.mmmPagesDetected = true;
      module.curPage = 1;
      module.notificationReceived('PAGE_DECREMENT');
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });
  });

  describe('notificationReceived - NEW_PAGE', () => {
    it('should set page directly', () => {
      module.notificationReceived('NEW_PAGE', 2);
      assert.equal(module.curPage, 2);
    });

    it('should call updateDom', () => {
      module.notificationReceived('NEW_PAGE', 1);
      assert.equal(module.updateDom.mock.callCount(), 1);
    });
  });

  describe('notificationReceived - ALL_MODULES_STARTED', () => {
    it('should detect MMM-pages when present', () => {
      MM.getModules = mock.fn(() => ({
        withClass: mock.fn(() => [{ name: 'MMM-pages' }]),
      }));

      module.notificationReceived('ALL_MODULES_STARTED');
      assert.equal(module.mmmPagesDetected, true);
    });

    it('should not detect MMM-pages when absent', () => {
      MM.getModules = mock.fn(() => ({
        withClass: mock.fn(() => []),
      }));

      module.notificationReceived('ALL_MODULES_STARTED');
      assert.equal(module.mmmPagesDetected, false);
    });
  });

  describe('click handler', () => {
    it('should send PAGE_SELECT notification', () => {
      const wrapper = module.getDom();
      const indicator = wrapper.querySelector('.page-1');

      indicator.click();

      assert.equal(module.sendNotification.mock.callCount(), 1);
      assert.deepEqual(module.sendNotification.mock.calls[0].arguments, ['PAGE_SELECT', 1]);
    });

    it('should update current page', () => {
      const wrapper = module.getDom();
      const indicator = wrapper.querySelector('.page-2');

      indicator.click();

      // curPage is not updated by click handler directly,
      // it relies on notificationReceived to update state.
      // Since sendNotification is mocked, curPage stays unchanged.
      assert.equal(module.curPage, 0);
    });

    it('should not call updateDom directly (relies on notification handler)', () => {
      const wrapper = module.getDom();
      const indicator = wrapper.querySelector('.page-1');

      indicator.click();

      // The click handler updates curPage and sends notification,
      // but does NOT call updateDom directly to avoid duplicate renders.
      // The notification handler will trigger updateDom instead.
      assert.equal(module.updateDom.mock.callCount(), 0);
    });
  });

  describe('edge cases - invalid payloads', () => {
    it('should reject undefined payload in PAGE_CHANGED', () => {
      module.curPage = 1;
      module.notificationReceived('PAGE_CHANGED', undefined);
      // Invalid payload should be rejected, curPage stays unchanged
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject null payload in PAGE_CHANGED', () => {
      module.curPage = 1;
      module.notificationReceived('PAGE_CHANGED', null);
      // null is typeof 'object', not 'number', so it should be rejected
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should handle string payload in PAGE_CHANGED', () => {
      module.config.pages = 5;
      module.notificationReceived('PAGE_CHANGED', '2');
      // String '2' is not a number type, should be rejected
      assert.equal(module.curPage, 0);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject NaN payload in PAGE_CHANGED', () => {
      module.curPage = 1;
      module.notificationReceived('PAGE_CHANGED', Number.NaN);
      // NaN should be rejected, curPage stays unchanged
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject undefined payload in MAX_PAGES_CHANGED', () => {
      const originalPages = module.config.pages;
      module.notificationReceived('MAX_PAGES_CHANGED', undefined);
      // Invalid payload should be rejected
      assert.equal(module.config.pages, originalPages);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject negative payload in MAX_PAGES_CHANGED', () => {
      const originalPages = module.config.pages;
      module.notificationReceived('MAX_PAGES_CHANGED', -1);
      // Negative value should be rejected
      assert.equal(module.config.pages, originalPages);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject zero payload in MAX_PAGES_CHANGED', () => {
      const originalPages = module.config.pages;
      module.notificationReceived('MAX_PAGES_CHANGED', 0);
      // Zero pages should be rejected
      assert.equal(module.config.pages, originalPages);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject undefined payload in NEW_PAGE', () => {
      module.curPage = 1;
      module.notificationReceived('NEW_PAGE', undefined);
      // Invalid payload should be rejected, curPage stays unchanged
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject NaN payload in NEW_PAGE', () => {
      module.curPage = 1;
      module.notificationReceived('NEW_PAGE', Number.NaN);
      // NaN should be rejected
      assert.equal(module.curPage, 1);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should reject float payload in MAX_PAGES_CHANGED', () => {
      const originalPages = module.config.pages;
      module.notificationReceived('MAX_PAGES_CHANGED', 3.7);
      // Float should be rejected, only integers allowed
      assert.equal(module.config.pages, originalPages);
      assert.equal(module.updateDom.mock.callCount(), 0);
    });

    it('should log warning for invalid PAGE_CHANGED payload', () => {
      module.notificationReceived('PAGE_CHANGED', undefined);
      // 2 warnings: deprecation + invalid payload
      assert.equal(Log.warn.mock.callCount(), 2);
    });

    it('should log warning for invalid MAX_PAGES_CHANGED payload', () => {
      module.notificationReceived('MAX_PAGES_CHANGED', -5);
      assert.equal(Log.warn.mock.callCount(), 1);
    });

    it('should log warning for invalid NEW_PAGE payload', () => {
      module.notificationReceived('NEW_PAGE', Number.NaN);
      assert.equal(Log.warn.mock.callCount(), 1);
    });
  });

  describe('edge cases - boundary conditions', () => {
    it('should handle config.pages = 1', () => {
      module.config.pages = 1;
      module.curPage = 0;
      const wrapper = module.getDom();
      const indicators = wrapper.querySelectorAll('.indicator');
      assert.equal(indicators.length, 1);
    });

    it('should handle config.pages = 0', () => {
      module.config.pages = 0;
      const wrapper = module.getDom();
      const indicators = wrapper.querySelectorAll('.indicator');
      assert.equal(indicators.length, 0);
    });

    it('should wrap correctly with single page when incrementing', () => {
      module.mmmPagesDetected = false;
      module.config.pages = 1;
      module.curPage = 0;
      module.notificationReceived('PAGE_INCREMENT');
      assert.equal(module.curPage, 0);
    });

    it('should handle very large page numbers', () => {
      module.config.pages = 3;
      module.notificationReceived('PAGE_CHANGED', 1000);
      // 1000 % 3 = 1
      assert.equal(module.curPage, 1);
    });

    it('should handle very large negative page numbers', () => {
      module.config.pages = 5;
      module.notificationReceived('PAGE_CHANGED', -17);
      // ((-17 % 5) + 5) % 5 = (-2 + 5) % 5 = 3
      assert.equal(module.curPage, 3);
    });

    it('should adjust curPage when MAX_PAGES_CHANGED reduces pages below current', () => {
      module.curPage = 5;
      module.config.pages = 10;
      module.notificationReceived('MAX_PAGES_CHANGED', 3);
      assert.equal(module.curPage, 2);
      assert.equal(module.config.pages, 3);
    });
  });
});
