import React from 'react';
import './UserNotFound.scss';

interface UserNotFoundProps {
  onRetry?: () => void;
  onGoHome?: () => void;
}

const UserNotFound: React.FC<UserNotFoundProps> = ({ onRetry, onGoHome }) => {
  return (
    <div className="user-not-found">
      <div className="container">
        <div className="content">
          <div className="icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <h1 className="title">User Not Found</h1>
          <p className="message">
            The user you're looking for doesn't exist or may have been removed.
          </p>

          <div className="actions">
            {onRetry && (
              <button className="btn btn-primary" onClick={onRetry}>
                Try Again
              </button>
            )}
            {onGoHome && (
              <button className="btn btn-secondary" onClick={onGoHome}>
                Go Home
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
