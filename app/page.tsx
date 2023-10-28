import Button from "./components/Button";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Leads CRM</h1>
          <p className="py-6">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt ame
            fugiat veniam occaecat fugiat aliqua.</p>
          <Button link="/leads" className="btn-xs">See All Lead</Button>
        </div>
      </div>
    </div>
  )
}

export default Home;