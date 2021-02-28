import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <div style = {{width:'100px', border: '2px solid black' }}>
          <h1> Layout</h1>
        </div>
      </Layout>
    </div>
  );
}

export default App;
