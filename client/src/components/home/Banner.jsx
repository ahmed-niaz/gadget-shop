

const Banner = () => {
  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(https://img.freepik.com/free-photo/top-view-smartphone-with-keyboard-charger_23-2149404179.jpg?t=st=1731524135~exp=1731527735~hmac=ce50b482c7b3762a75ff0835bc7784abc8dadf4cbf4188043d4ca2e864f6ce5d&w=740)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Welcome to gadget shop</h1>
        <p className="mb-5">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  )
}

export default Banner