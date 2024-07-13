import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ManagerCompanyInformation from "../views/ui/ManageCI.js";
import LayoutUser from "../layouts/user/LayoutUser.js";
import EmployeePayroll from "../layouts/user/EmployeePayroll.js";
import SalaryTable from "../layouts/user/SalaryTable.js";
import Blog from "../layouts/user/Blog.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages *****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const ManageDepartment = lazy(() => import("../views/ui/ManageDepartment.js"));
const PayrollManagement = lazy(() =>
  import("../views/ui/PayrollManagement.js")
);
const NewsManagement = lazy(() => import("../views/ui/NewsManager.js"));
const CreateAccountunt = lazy(() => import("../views/ui/CreateAccount.js"));
const ListAccounts = lazy(() => import("../views/ui/ListAccount.js"));
const Profile = lazy(() => import("../views/Profile.js"));
const Login = lazy(() => import("../components/Auth/Login.js"));
const ForgotPassword = lazy(() => import("../components/Auth/Forgotpass.js"));

/*****Routes******/

const ThemeRoutes = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  { path: "/forgotpass", element: <ForgotPassword /> },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "admin", exact: true, element: <Starter /> },
      {
        path: "companyinfor",
        exact: true,
        element: <ManagerCompanyInformation />,
      },
      { path: "about", exact: true, element: <About /> },
      { path: "departments", exact: true, element: <ManageDepartment /> },
      { path: "payroll", exact: true, element: <PayrollManagement /> },
      { path: "news", exact: true, element: <NewsManagement /> },
      { path: "createaccount", exact: true, element: <CreateAccountunt /> },
      { path: "listAcc", exact: true, element: <ListAccounts /> },
      { path: "profile", exact: true, element: <Profile /> },
    ],
  },
  {
    path: "/user",
    element: (
      <LayoutUser>
        <EmployeePayroll />
      </LayoutUser>
    ),
    children: [
      { path: "profile", exact: true, element: <Profile /> },
      { path: "payrolluser", exact: true, element: <EmployeePayroll /> },
      { path: "salarytable", exact: true, element: <SalaryTable /> },
      { path: "blog", exact: true, element: <Blog /> },
    ],
  },
];

export default ThemeRoutes;
