import React from 'react';

//// Components
import IssueSearch from './IssueSearch';
import IssueFilter from './IssueFilter';
import IssueOrderBy from './IssueOrderBy';
import IssueItem from './IssueItem';

function IssueList() {
  return (
    <div className=''>
      <IssueSearch />

      <IssueFilter />

      <IssueOrderBy />

      <IssueItem />
    </div>
  );
}

export default IssueList;
