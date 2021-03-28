import React from 'react';
import categoriesList from '../../../utils/categories';
import VideoCategoriesContainer from '../../../styled/Video/VideoCategoriesContainer';

function SetVideoCategories({ category, setCategory }) {
  // const [desc, setDesc] = useState("")
  // const [nr, setNr] = useState(0)
  return (
    <VideoCategoriesContainer>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="film_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#film"
                aria-expanded="true"
                aria-controls="film"
              >
                Film <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="film"
            className="collapse"
            aria-labelledby="film_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.film.map(f => (
                <li
                  onClick={() => setCategory(`Film - ${f.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={f.id}
                >
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="animation_header">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#animation"
                aria-expanded="false"
                aria-controls="animation"
              >
                Animation <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="animation"
            className="collapse"
            aria-labelledby="animation_header"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.animation.map(a => (
                <li
                  onClick={() => setCategory(`Animation - ${a.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={a.id}
                >
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="vehicles_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#vehicles"
                aria-expanded="false"
                aria-controls="vehicles"
              >
                Vehicles <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="vehicles"
            className="collapse"
            aria-labelledby="vehicles_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.vehicles.map(v => (
                <li
                  onClick={() => setCategory(`Vehicles - ${v.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={v.id}
                >
                  {v.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="music_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#music"
                aria-expanded="false"
                aria-controls="music"
              >
                Music <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="music"
            className="collapse"
            aria-labelledby="music_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.music.map(m => (
                <li
                  onClick={() => setCategory(`Music - ${m.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={m.id}
                >
                  {m.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="sports_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#sports"
                aria-expanded="false"
                aria-controls="sports"
              >
                Sports <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="sports"
            className="collapse"
            aria-labelledby="sports_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.sports.map(s => (
                <li
                  onClick={() => setCategory(`Sports - ${s.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={s.id}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="esports_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#esports"
                aria-expanded="false"
                aria-controls="esports"
              >
                E-Sports <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="esports"
            className="collapse"
            aria-labelledby="esports_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.esports.map(s => (
                <li
                  onClick={() => setCategory(`E-Sports - ${s.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={s.id}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Vlog")} className="btn btn-link btn-block" type="button">
                Vlog
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="comedy_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#comedy"
                aria-expanded="false"
                aria-controls="comedy"
              >
                Comedy <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="comedy"
            className="collapse"
            aria-labelledby="comedy_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.comedy.map(c => (
                <li
                  onClick={() => setCategory(`Comedy - ${c.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={c.id}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("News")} className="btn btn-link btn-block" type="button">
                News
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Politics")} className="btn btn-link btn-block" type="button">
                Politics
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Education")} className="btn btn-link btn-block" type="button">
                Education
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Science")} className="btn btn-link btn-block" type="button">
                Science
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Technology")} className="btn btn-link btn-block" type="button">
                Technology
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("DIY")} className="btn btn-link btn-block" type="button">
                DIY
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Activism")} className="btn btn-link btn-block" type="button">
                Activism
              </button>
            </h2>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="nonprofits_heading">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#nonprofits"
                aria-expanded="false"
                aria-controls="nonprofits"
              >
                Non-profits <i className="fas fa-chevron-down pl-3" />
              </button>
            </h2>
          </div>
          <div
            id="nonprofits"
            className="collapse"
            aria-labelledby="nonprofits_heading"
            data-parent="#accordionExample"
          >
            <ul className="list-group">
              {categoriesList.nonprofits.map(np => (
                <li
                  onClick={() => setCategory(`Non-profits - ${np.name}`)}
                  className="list-group-item pl-5 pointer"
                  style={{ color: "#111" }}
                  key={np.id}
                >
                  {np.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button onClick={() => setCategory("Other")} className="btn btn-link btn-block" type="button">
                Other
              </button>
            </h2>
          </div>
        </div>
      </div>
    </VideoCategoriesContainer>
  )
}

export default SetVideoCategories;
