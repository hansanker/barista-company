import { BaristaCompanyPage } from './app.po';

describe('barista-company App', function() {
  let page: BaristaCompanyPage;

  beforeEach(() => {
    page = new BaristaCompanyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
