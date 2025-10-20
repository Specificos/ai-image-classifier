import './App.css';

function App() {
  return (
    <div className="page">
      <header className="hero">
        <h1>My AWS Deployed App </h1>
        <p className="subtitle">React + Vite • Hosted on AWS Amplify</p>
      </header>

      <section className="content">
        <h2>Project Overview</h2>
        <p>
          This site demonstrates a simple React application deployed to AWS Amplify with
          Git-based CI/CD. Changes pushed to GitHub auto-trigger Amplify builds and updates.
        </p>

        <div className="features">
          <div className="feature">
            <h3>Local Dev</h3>
            <p>Run locally with <code>npm run dev</code>.</p>
          </div>
          <div className="feature">
            <h3>Source Control</h3>
            <p>Code is stored on GitHub and pushed to the repository.</p>
          </div>
          <div className="feature">
            <h3>Hosting</h3>
            <p>AWS Amplify builds and hosts the app globally.</p>
          </div>
        </div>

        <div className="action">
          <a className="cta" href="https://github.com/Specificos/myncsapp" target="_blank" rel="noreferrer">
            View Source on GitHub
          </a>
        </div>
      </section>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Your Name • Deployed with AWS Amplify</small>
      </footer>
    </div>
  );
}

export default App;
