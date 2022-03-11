import { Card, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

//// Context
import { useIssueContext } from 'context/issueContext';

// Cpns
import IssueToast from './IssueToast';

function IssueItem() {
  const { deleteIssue, successDeleting, updateIssue, issuesFiltered } =
    useIssueContext();

  const changeToNewStatus = (issue) => {
    let newStatus = '';
    if (issue.status === 'new') {
      newStatus = 'open';
    }
    if (issue.status === 'open') {
      newStatus = 'close';
    }
    if (issue.status === 'close') {
      newStatus = 'open';
    }
    return newStatus;
  };

  const handleDelete = (id) => () => {
    deleteIssue(id);
  };

  const handleChangeStatus = (issueId, issue, newStatus) => () => {
    updateIssue(issueId, issue, newStatus);
  };

  //// loading or without issues
  if (issuesFiltered.length === 0) {
    return (
      <Card className='w-100 mb-3 text-center'>
        <Card.Header>
          <span className='fs-3 text-primary'>No Issues Yet</span>
        </Card.Header>
      </Card>
    );
  }

  return (
    <>
      {successDeleting && (
        <IssueToast
          title='DELETE SUCCESS!'
          description='Issue deleted successfully.'
        />
      )}

      {issuesFiltered.length > 0 &&
        issuesFiltered.map((issue) => (
          <Card className='w-100 mb-3' key={issue.id}>
            <Card.Header>
              <span className='me-3'>{issue.id}</span>
              <Badge
                pill
                bg={
                  issue.status === 'new'
                    ? 'primary'
                    : issue.status === 'open'
                    ? 'success'
                    : 'secondary'
                }
              >
                {issue.status}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Card.Title className='fs-4'>{issue.description}</Card.Title>
              <Card.Text>
                <Badge
                  pill
                  bg={
                    issue.severity === 'high'
                      ? 'danger'
                      : issue.severity === 'medium'
                      ? 'warning'
                      : 'info'
                  }
                >
                  {issue.severity}
                </Badge>
              </Card.Text>
              <div className='d-flex justify-content-end'>
                <Button
                  className='me-3'
                  variant='primary'
                  onClick={handleChangeStatus(
                    issue.id,
                    issue,
                    changeToNewStatus(issue)
                  )}
                >
                  {issue.status === 'new'
                    ? 'Open'
                    : issue.status === 'open'
                    ? 'Close'
                    : 'Open'}
                </Button>
                <Button variant='danger' onClick={handleDelete(issue.id)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </>
  );
}

export default IssueItem;
