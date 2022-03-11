import { useRef, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

//// Context
import { useIssueContext } from 'context/issueContext';

//// Components
import IssueForm from 'features/Issue/components/IssueForm';
import IssueList from 'features/Issue/components/IssueList';

function Issue() {
  const spinnerRef = useRef();

  const { isLoading, setPage } = useIssueContext();

  useEffect(() => {
    if (!spinnerRef.current) return;

    let observerRefValue = null;

    const options = {
      root: null,
      rootMargin: '10px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      setPage((prev) => prev + 1);
    }, options);

    let refValue = spinnerRef.current;

    observer.observe(refValue);
    observerRefValue = refValue;

    return () => {
      if (observerRefValue) {
        observer.unobserve(refValue);
      }
    };
  }, [setPage]);

  return (
    <>
      <IssueForm />

      <IssueList />

      <div ref={spinnerRef} className='text-center mb-5'>
        {isLoading && (
          <>
            <Spinner animation='border' variant='success' />
          </>
        )}
      </div>
    </>
  );
}

export default Issue;
