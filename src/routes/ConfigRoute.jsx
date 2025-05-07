import BranchTable from "../component/branches/BranchTable";
import UserTable from "../component/users/UserTable";
import Dashboard from "../layout/Dashboard";
import DefaultLayout from "../layout/DefaultLayout";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Users from "../component/users/UserTable";
import Login from "../login/Login";
import Staticlayout from "../routes/Staticlayout";
import UserStaticlayout from "../routes/Userstaticlayout";
import AgentTable from "../component/agents/AgentTable";
import PolicyTable from "../component/policies/Policiestable";
import CompanyTable from "../component/company/CompanyTable";
import CustomerTable from "../component/customers/Customertable";
import Forgotpassword from "../login/Forgotpassword";
import TaxTable from "../component/tax/Taxtable";
import CategoryTable from "../component/policyCategory/CategoryTable";
import PolicyTypeTable from "../component/policyType/PolicyTypeTable";
import UserDashboard from "../usercomponent/userlayout/UserDashboard";
import UserHeader from "../usercomponent/userlayout/UserHeader";
import UserSidebar from "../usercomponent/userlayout/UserSidebar";
import Usercustomer from "../usercomponent/customer/Customertable";
import Customerprofile from "../branchManager/customers/Viewmanagercustomer";
import Notification from "../component/notification/notification";
import Reports from "../component/reports/Reportstable";
import ManagerStaticlayout from "./ManagerStaticlayout";
import ManagerUsers from "../branchManager/users/ManagerUsers";
import DashboardManager from "../branchManager/dashboard/ManagerDashboard";
import ManagerCustomerTable from "../branchManager/customers/ManagerCustomerTable";
import ManagerAgentTable from "../branchManager/agents/ManagerAgentTable";
import ManagerPolicyTable from "../branchManager/policies/ManagerPolicyTable";
import ManagerReport from "../branchManager/reports/ManagerReport";
import ManagerSettings from "../branchManager/settings/ManagerSettings";
import ManagerPayment from "../branchManager/payment/Paymenttable";
import BasicTabs from "../component/agents/AgentTable";
import ManagerCustomerdetails from "../branchManager/customerdetails/Customerdetailstable";
import ManagerAgentTabs from "../branchManager/agents/ManagerAgentTable";
import UserCustomerdetails from "../usercomponent/usercustomerdetails/Usercustomerdetails";
import Userpayment from "../usercomponent/Userpayment/Paymenttable";
import Userreport from "../usercomponent/reports/Reports";
import Usernotification from "../usercomponent/notification/Usernotification";
import Managernotification from "../branchManager/notification/Managernotification";
import Adminsettings from "../component/settings/Accountsetting";
import Companycounttable from "../component/reports/Companycounttable";
import Categorycounttable from "../component/reports/Categorycounttable";
import Branchcounttable from "../component/reports/Branchcounttable";

import Customercountable from "../component/reports/customercountable";
import UserCountTable from "../component/reports/UserCountTable";
import AgentCountTable from "../component/reports/AgentCountTable";
import UserPolicyTable from "../usercomponent/policy/PolicyTable";
import HospicashTable from "../component/reports/HospicashTable";
import ManagerHospicashTable from "../branchManager/reports/ManagerHospicash";
import UserHospicashTable from "../usercomponent/reports/UserHospicash";


const routeConfig = [
  { path: "/", element: <DefaultLayout /> },
  { path: "/sidebar", element: <Sidebar /> },
  { path: "/forgot-password", element: <Forgotpassword /> },
  { path: "/usersidebar", element: <UserSidebar /> },
  { path: "/customerprofile", element: <Customerprofile /> },

  // { path: "/userstaticlayout", element: <UserStaticlayout /> },

  // { path: '/login', element: <Login/> },
  // { path: '/branch', element: <BranchTable/>},
  // { path: '/users', element: <UserTable/>},
  // { path: "/dashboard", element: <Dashboard /> },
  {
    path: "/dashboard",
    element: (
      <Staticlayout>
        <Dashboard />
      </Staticlayout>
    ),
  },
  // {path:'/users',element:<Users/>}
  {
    path: "/branch",
    element: (
      <Staticlayout>
        <BranchTable />
      </Staticlayout>
    ),
  },

  {
    path: "/users",
    element: (
      <Staticlayout>
        <Users />
      </Staticlayout>
    ),
  },

  {
    path: "/customer",
    element: (
      <Staticlayout>
        <CustomerTable />
      </Staticlayout>
    ),
  },

  {
    path: "/hospicash-customer",
    element: (
      <Staticlayout>
        <HospicashTable />
      </Staticlayout>
    ),
  },

  // {
  //   path: "/agents",
  //   element: (
  //     <Staticlayout>
  //       <AgentTable />
  //     </Staticlayout>
  //   ),
  // },
  {
    path: "/policies",
    element: (
      <Staticlayout>
        <PolicyTable />
      </Staticlayout>
    ),
  },
  {
    path: "/policy-category",
    element: (
      <Staticlayout>
        <CategoryTable />
      </Staticlayout>
    ),
  },
  {
    path: "/policy-type",
    element: (
      <Staticlayout>
        <PolicyTypeTable />
      </Staticlayout>
    ),
  },
  {
    path: "/company",
    element: (
      <Staticlayout>
        <CompanyTable />
      </Staticlayout>
    ),
  },

  {
    path: "/customercount",
    element: (
      <Staticlayout>
        <Customercountable />
      </Staticlayout>
    ),
  },
  {
    path: "/usercount",
    element: (
      <Staticlayout>
        <UserCountTable />
      </Staticlayout>
    ),
  },

  {
    path: "/agentcount",
    element: (
      <Staticlayout>
        <AgentCountTable />
      </Staticlayout>
    ),
  },

  {
    path: "/companycustomer",
    element: (
      <Staticlayout>
        <Companycounttable />
      </Staticlayout>
    ),
  },

  {
    path: "/categorycustomer",
    element: (
      <Staticlayout>
        <Categorycounttable />
      </Staticlayout>
    ),
  },

  {
    path: "/branchcustomer",
    element: (
      <Staticlayout>
        <Branchcounttable />
      </Staticlayout>
    ),
  },
  {
    path: "/tax",
    element: (
      <Staticlayout>
        <TaxTable />
      </Staticlayout>
    ),
  },

  {
    path: "/notification",
    element: (
      <Staticlayout>
        <Notification />
      </Staticlayout>
    ),
  },

  {
    path: "/reports",
    element: (
      <Staticlayout>
        <Reports />
      </Staticlayout>
    ),
  },

  {
    path: "/settings",
    element: (
      <Staticlayout>
        <Adminsettings />
      </Staticlayout>
    ),
  },

  {
    path: "/agents",
    element: (
      <Staticlayout>
        <BasicTabs />
      </Staticlayout>
    ),
  },
  {
    path: "/userdashboard",
    element: (
      <UserStaticlayout>
        <UserDashboard />
       </UserStaticlayout>

    ),
  },

  {
    path: "/usercustomer",
    element: (
      <UserStaticlayout>
        <Usercustomer />
       </UserStaticlayout>

    ),
  },

  {
    path: "/userpolicy",
    element: (
      <UserStaticlayout>
        <UserPolicyTable />
       </UserStaticlayout>

    ),
  },

  {
    path: "/manager-dashboard",
    element: (
      <ManagerStaticlayout>
        <DashboardManager />
       </ManagerStaticlayout>

    ),
  },

  {
    path: "/manager-users",
    element: (
      <ManagerStaticlayout>
        <ManagerUsers />
       </ManagerStaticlayout>
    ),
  },
  {
    path: "/manager-customer",
    element: (
      <ManagerStaticlayout>
        <ManagerCustomerTable />
       </ManagerStaticlayout>

    ),
  },

  {
    path: "/manager-customerdetails",
    element: (
      <ManagerStaticlayout>
        <ManagerCustomerdetails />
       </ManagerStaticlayout>

    ),
  },
  {
    path: "/manager-payments",
    element: (
      <ManagerStaticlayout>
        <ManagerPayment />
       </ManagerStaticlayout>

    ),
  },
  {
    path: "/manager-agent",
    element: (
      <ManagerStaticlayout>
        <ManagerAgentTabs />
       </ManagerStaticlayout>

    ),
  },
  {
    path: "/manager-policies",
    element: (
      <ManagerStaticlayout>
        <ManagerPolicyTable />
       </ManagerStaticlayout>

    ),
  },
  {
    path: "/manager-report",
    element: (
      <ManagerStaticlayout>
        <ManagerReport />
       </ManagerStaticlayout>

    ),
  },

  {
    path: "/manager-hospicash",
    element: (
      <ManagerStaticlayout>
        <ManagerHospicashTable/>
       </ManagerStaticlayout>

    ),
  },

  {
    path: "/manager-notification",
    element: (
      <ManagerStaticlayout>
        <Managernotification />
       </ManagerStaticlayout>

    ),
  },
  {
    path: "/manager-settings",
    element: (
      <ManagerStaticlayout>
        <ManagerSettings />
       </ManagerStaticlayout>

    ),
  },

  {
    path: "/user-customerdetails",
    element: (
      <UserStaticlayout>
        <UserCustomerdetails />
       </UserStaticlayout>

    ),
  },

  {
    path: "/user-payment",
    element: (
      <UserStaticlayout>
        <Userpayment />
       </UserStaticlayout>

    ),
  },

  {
    path: "/user-notification",
    element: (
      <UserStaticlayout>
        <Usernotification />
       </UserStaticlayout>

    ),
  },

  {
    path: "/user-report",
    element: (
      <UserStaticlayout>
        <Userreport />
       </UserStaticlayout>

    ),
  },
  {
    path: "/user-hospicash",
    element: (
      <UserStaticlayout>
        <UserHospicashTable/>
       </UserStaticlayout>

    ),
  },

];

export default routeConfig;
