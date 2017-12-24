// @flow

import EventEmitter from 'events';

export default class NewSearchResultReceivedEvent extends EventEmitter {
  static newSearchResultReceivedEventName = 'newSearchResultReceived';

  raise = (searchResult) => {
    this.emit(NewSearchResultReceivedEvent.newSearchResultReceivedEventName, searchResult);
  };

  subscribe = (callback) => {
    this.on(NewSearchResultReceivedEvent.newSearchResultReceivedEventName, callback);
  };

  unsubscribe = (callback) => {
    this.removeListener(NewSearchResultReceivedEvent.newSearchResultReceivedEventName, callback);
  };

  unsubscribeAll = () => {
    this.removeAllListeners(NewSearchResultReceivedEvent.newSearchResultReceivedEventName);
  };
}
