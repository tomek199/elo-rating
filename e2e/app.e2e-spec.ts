import { EloRatingPage } from './app.po';

describe('elo-rating App', function() {
  let page: EloRatingPage;

  beforeEach(() => {
    page = new EloRatingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
