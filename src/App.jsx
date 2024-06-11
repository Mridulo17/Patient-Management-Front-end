import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import PatientDetail from './components/PatientDetail';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";


function App() {
  const queryClient = new QueryClient();
  return (<Router>
    {/* <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic Crud App
        </Link>
      </Container>
    </Navbar> */}

    <div className="container">
      <Row>
        <Col md={12}>
          <Routes>
          <Route exact path='/' element={<LoginForm />} />
          
            <Route path="/patients" element={<QueryClientProvider client={queryClient}><PatientList /></QueryClientProvider>} />
            <Route path="/patients/new" element={<QueryClientProvider client={queryClient}><PatientForm /></QueryClientProvider>} />
            <Route path="/patients/:id" element={<QueryClientProvider client={queryClient}><PatientDetail /></QueryClientProvider>} />
            {/* <Route path="/patients/:id" element={<QueryClientProvider client={queryClient}><PatientDetail /></QueryClientProvider>} /> */}
          
            <Route exact path='/register' element={<RegisterForm />} />
          </Routes>
        </Col>
      </Row>
    </div>
  </Router>);
}

export default App;


// import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
// import PatientList from './components/PatientList';
// import PatientForm from './components/PatientForm';
// import PatientDetail from './components/PatientDetail';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';

// function App() {
//   return (
    
//     <Router>
//       <Routes>
//         <Route path="/patients" exact component={PatientList} />
//         <Route path="/patients/new" component={PatientForm} />
//         <Route path="/patients/:id" component={PatientDetail} />
//         <Route path="/login" component={LoginForm} />
//         <Route path="/register" component={RegisterForm} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
