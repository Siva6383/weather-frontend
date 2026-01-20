import Login from "./Login";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-0 m-0">
        <div
          className="container-fluid py-3"
          style={{ backgroundColor: "red" }}
        >
          <a className="navbar-brand text-white" href="#">
            Kishore
          </a>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active text-white" href="#">
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled text-white" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
