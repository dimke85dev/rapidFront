import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getComments } from '../../utils/firebase-api';
import Loader from '../UI/Loader';

import styles from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const param = useParams();
  const { jokeId } = param;
  const {
    sendHttpRequest,
    status,
    data: loadedComments,
  } = useHttp(getComments);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [jokeId, sendHttpRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const commenAddedHandler = useCallback(() => {
    sendHttpRequest(jokeId);
  }, [jokeId, sendHttpRequest]);
  let comments;

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (status === 'completed' && (loadedComments || loadedComments.length)) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">This joke does't have comments yet</p>;
  }

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          jokeId={param.jokeId}
          onCommentAdded={commenAddedHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
