import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center alert alert-danger">
          <h4>Une erreur s’est produite</h4>
          <p>{this.state.errorMessage}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;