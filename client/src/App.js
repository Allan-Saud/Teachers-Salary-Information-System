
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
// import NavBar from './components/NavFolder/Navbar.js';
// import AdminForm from './components/AdminFolder/Admin.js';
// import User from './components/UserFolder/User.js';
// import Home from './components/HomeFolder/Home.js';
// import Register from './components/RegisterFolder/Register.js';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Operation from './components/OperationFolder/Operation.js';
// import Adminpage from './components/AdminPageFolder/Adminpage.js';
// import View from './components/ViewFolder/View.js';
// import Edit from './components/EditFolder/Edit.js';
// import Salary from './components/SalaryFolder/Salary.js'
// import OperationDetails from './components/OperationDetail/OperationDetails.js'
// import ViewInd from './components/ViewIndividual/ViewInd.js'
// import Detail from './components/DetailFolder/Detail.js';
// import UserSalary from "./components/UserSalaryOverview/UserSalary.js";
// import LogOut from "./components/RedirectHome/LogOut.js";
// import UserSalaryEdit from "./components/UserSalaryOverview/UserSalaryEdit.js";
// import EmailSender from "./components/Email/EmailSender.js";
// import EmailSender2 from "./components/Email/EmailSender2.js";
// import Range from "./components/RangeFolder/Range.js";
// import Layout from "./components/AuthenticateFolder/Layout.js";

// import Epay from "./components/Payment Folder/Epay.js";
// import Failure from "./components/Payment Folder/failure.js";
// import Success from "./components/Payment Folder/success.js";







// function App() {
//   return (


//     <Router>

//       <NavBar />

//       <Routes>

//             <Route  exact path="/" Component={Home}/>

//             <Route  path="/Admin" Component={AdminForm}/>

//             <Route  path="/User" Component={User}/>

//             <Route  path="/Register" Component={Register}/>

//             <Route  path="/Adminpage" Component={Adminpage}/>

//             <Route path="/Operation/:username/:name" Component={Operation} />

//             <Route  path="/View" Component={View}/>

//             <Route path="/Edit/:username/:name/:objectId" Component={Edit} />

//             <Route path="/Salary" Component={Salary} />

//             <Route path="/OperationDetails" Component={OperationDetails} />

//             <Route path="/ViewInd/:username" Component={ViewInd} />

//             <Route path="/Detail/:username" Component={Detail} />

//             <Route path="/UserSalary/:username" Component={UserSalary} />

//             <Route path="/UserSalaryEdit/:username" Component={UserSalaryEdit}/>

//             <Route path="/EmailSender/:username" Component={EmailSender}/>

//             <Route path="/EmailSender2/:username/:name" Component={EmailSender2}/>

//             <Route path="/Range" Component={Range}/>

//             <Route path="/Layout" Component={Layout}/>



//             {/* <Route path="/Epay" Component={Epay}/>

//             <Route path="/success" Component={Success}/>
//             <Route path="/failure" Component={Failure}/> */}



//             <Route path="/" Component={LogOut} />














//           </Routes>

//   </Router>

//   );
// }

// export default App;


import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavFolder/Navbar.js';
import AdminForm from './components/AdminFolder/Admin.js';
import User from './components/UserFolder/User.js';
import Home from './components/HomeFolder/Home.js';
import Register from './components/RegisterFolder/Register.js';
import Operation from './components/OperationFolder/Operation.js';
import Adminpage from './components/AdminPageFolder/Adminpage.js';
import View from './components/ViewFolder/View.js';
import Edit from './components/EditFolder/Edit.js';
import Salary from './components/SalaryFolder/Salary.js';
import OperationDetails from './components/OperationDetail/OperationDetails.js';
import ViewInd from './components/ViewIndividual/ViewInd.js';
import Detail from './components/DetailFolder/Detail.js';
import UserSalary from './components/UserSalaryOverview/UserSalary.js';
import LogOut from './components/RedirectHome/LogOut.js';
import UserSalaryEdit from './components/UserSalaryOverview/UserSalaryEdit.js';
import EmailSender from './components/Email/EmailSender.js';
import EmailSender2 from './components/Email/EmailSender2.js';
import Range from './components/RangeFolder/Range.js';
import Layout from './components/AuthenticateFolder/Layout.js';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminForm />} />
          <Route path="/User" element={<User />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Adminpage" element={<Adminpage />} />
          <Route path="/Operation/:username/:name" element={<Operation />} />
          <Route path="/View" element={<View />} />
          <Route path="/Edit/:username/:name/:objectId" element={<Edit />} />
          <Route path="/Salary" element={<Salary />} />
          <Route path="/OperationDetails" element={<OperationDetails />} />
          <Route path="/ViewInd/:username" element={<ViewInd />} />
          <Route path="/Detail/:username" element={<Detail />} />
          <Route path="/UserSalary/:username" element={<UserSalary />} />
          <Route path="/UserSalaryEdit/:username" element={<UserSalaryEdit />} />
          <Route path="/EmailSender/:username" element={<EmailSender />} />
          <Route path="/EmailSender2/:username/:name" element={<EmailSender2 />} />
          <Route path="/Range" element={<Range />} />
          <Route path="/Layout" element={<Layout />} />
          <Route path="/" element={<LogOut />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

