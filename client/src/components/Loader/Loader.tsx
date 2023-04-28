import "./loader.css";

export default function Loader() {
  return (
    <section>
      <div className="circ">
        <div className="load">Loading . . . </div>
        <div className="hands"></div>
        <div className="body"></div>
        <div className="head">
          <div className="eye"></div>
        </div>
      </div>
    </section>
  );
}
