import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3001/health")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return <div>Check console for backend response</div>;
}

export default App;
