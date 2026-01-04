import "../about.css";

function About() {
  return (
    <div className="min-h-screen flex justify-center items-center overflow-y-hidden bg-lightblue-400">
      <div className="">
        <div className="bg-blue-400 rounded-lg p-5">
          <h1 className="text-white text-center text-bold">About</h1>
          <p className="about-text">
            This website allows the user to keep track of their tasks
          </p>
          <p className="text-white text-center">
            This website was made using{" "}
            <span className="text-bold text-red-400">Flask</span> and{" "}
            <span className="text-bold text-green-400">React</span>
          </p>
          <p className="about-text">TODO List website made by Mayur Satish</p>
        </div>
      </div>
    </div>
  );
}

export default About;
