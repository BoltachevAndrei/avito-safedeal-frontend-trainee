import React from 'react';
import PageTitle from '../page-title/page-title.js';
import Pictures from '../pictures/pictures.js';
import PageFooter from '../page-footer/page-footer.js';

const App = () => {
  return (
    <div className="pictures-container">
      <PageTitle />
      <Pictures />
      <PageFooter />
    </div>
  );
}

export default App;
