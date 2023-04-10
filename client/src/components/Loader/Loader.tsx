import "./loader.css";

export default function Loader() {
  return (
    <section className="min-h-screen flex justify-center items-center flex-col">
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
