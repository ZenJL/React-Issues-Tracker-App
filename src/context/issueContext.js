import { createContext, useContext, useEffect, useState } from 'react';

// services
import httpRequest from 'services/httpRequest';

const IssuesContext = createContext();

const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [issuesFiltered, setIssuesFiltered] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(7);
  const [successAdding, setSuccessAdding] = useState(null);
  const [successDeleting, setSuccessDeleting] = useState(null);
  const [limitIssue, setLimitIssue] = useState(4);

  // fetch issues
  const fetchData = async (_page, limit = 4) => {
    if (issues.length === totalCount) {
      setIsLoading(false);
      return;
    }

    const res = await httpRequest.get(
      `https://tony-json-server.herokuapp.com/api/todos?_page=${_page}&_limit=${limit}`
    );
    // console.log(res)
    const data = res.data.data;
    setIssues((prevState) => [...prevState, ...data]);
    setTotalCount(res.data.pagination.totalCount);
  };

  // console.log(totalCount);

  useEffect(() => {
    try {
      fetchData(page);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // filter & search
  useEffect(() => {
    if (issues.length === 0) return;

    let newIssues = issues.length > 0 ? issues : [];

    if (filterBy === 'open') {
      newIssues = newIssues.filter((issue) => issue.status === filterBy);
    }
    if (filterBy === 'close') {
      newIssues = newIssues.filter((issue) => issue.status === filterBy);
    }

    if (orderBy === 'asc') {
      newIssues = newIssues.sort((a, b) => {
        if (a.description < b.description) return -1;
      });
    }

    if (orderBy === 'desc') {
      newIssues = newIssues.sort((a, b) => {
        if (a.description > b.description) return -1;
      });
    }

    newIssues = newIssues.filter((issue) =>
      issue.description.toLowerCase().includes(textSearch.toLowerCase())
    );

    setIssuesFiltered(newIssues);
  }, [issues, textSearch, orderBy, filterBy]);

  // add issues
  async function addIssue(issue) {
    try {
      const res = await httpRequest.post(
        'https://tony-json-server.herokuapp.com/api/todos',
        issue
      );
      const data = res.data.data;
      setIssues((prevState) => [data, ...prevState]);
      setSuccessAdding(true);

      setTimeout(() => {
        setSuccessAdding(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  // update issue
  async function updateIssue(issueId, issue, newStatus) {
    try {
      const res = await httpRequest.patch(
        `https://tony-json-server.herokuapp.com/api/todos/${issueId}`,
        {
          ...issue,
          status: newStatus,
        }
      );
      const data = res.data.data;
      const newIssues = [...issues];
      const issueIndex = newIssues.findIndex((issue) => issue.id === issueId);
      newIssues.splice(issueIndex, 1, data);
      // console.log('day la data moi: ', data);
      setIssues(newIssues);
    } catch (error) {
      console.error(error);
    }
  }

  // delete issues
  async function deleteIssue(issueId) {
    try {
      await httpRequest.delete(
        `https://tony-json-server.herokuapp.com/api/todos/${issueId}`
      );
      const newIssues = [...issues];
      const issueIndex = newIssues.findIndex((issue) => issue.id === issueId);
      newIssues.splice(issueIndex, 1);
      setIssues(newIssues);
      setSuccessDeleting(true);

      setTimeout(() => {
        setSuccessDeleting(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  // create debounce for search field
  const useDebounce = (text, delay = 700) => {
    const [debounced, setDebounced] = useState(text);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounced(text);
      }, delay);

      // clean effect
      return () => {
        clearTimeout(handler);
      };
    }, [text, delay]);

    return debounced;
  };

  return (
    <IssuesContext.Provider
      value={{
        issues,
        issuesFiltered,
        textSearch,
        orderBy,
        setPage,
        isLoading,
        successDeleting,
        addIssue,
        deleteIssue,
        setTextSearch,
        setOrderBy,
        setFilterBy,
        updateIssue,
        useDebounce,
        successAdding,
        limitIssue,
        setLimitIssue,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
};

const useIssueContext = () => useContext(IssuesContext);

export { IssueProvider, useIssueContext };
